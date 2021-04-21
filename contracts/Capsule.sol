// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./interfaces/IERC20.sol";
import "./utils/EnumerableSet.sol";

contract CryptoCapsule {
    using EnumerableSet for EnumerableSet.UintSet;

    struct Capsule {
        uint256 id;
        address grantor;
        address beneficiary;
        uint256 distributionDate;
        uint256 createdDate;
        bool opened;
        uint256 value;
        address[] tokens;
        uint256[] values;
    }
    Capsule[] capsules;
    mapping (address => EnumerableSet.UintSet) private sent;
    mapping (address => EnumerableSet.UintSet) private received;

    function createCapsule(address _beneficiary, uint256 _distributionDate, address[] calldata _tokens, uint256[] calldata _values) public payable {
        require(_distributionDate > block.timestamp, "Distribution Date must be in future");
        require(_tokens.length == _values.length, "Tokens and Values must be same length");

        uint256 capsuleId = capsules.length;
        capsules.push(Capsule(capsuleId, msg.sender, _beneficiary, _distributionDate, block.timestamp, false, msg.value, _tokens, _values));
        sent[msg.sender].add(capsuleId);
        received[_beneficiary].add(capsuleId);
    }

    function openCapsule(uint256 capsuleId) public {
        Capsule memory _capsule = capsules[capsuleId];
        require(!_capsule.opened, "Capsule has already been opened");
        require(block.timestamp >= _capsule.distributionDate / 1000, "Capsule has not matured yet");
        require(msg.sender == _capsule.beneficiary, "You are not the beneficiary of this Capsule");

        for (uint256 i = 0; i < _capsule.tokens.length; i++) {
            IERC20 erc20Token = IERC20(_capsule.tokens[i]);
            erc20Token.transfer(_capsule.beneficiary, _capsule.values[i]);
            emit ClaimedAsset(_capsule.tokens[i], _capsule.values[i], capsuleId);
        }

        capsules[capsuleId].opened = true;
        emit CapsuleOpened(capsuleId);
    }

    function getCapsule(uint256 capsuleId) public view returns(Capsule memory) {
        return capsules[capsuleId];
    }

    function getSentCapsules(address grantor) public view returns(Capsule[] memory) {
        uint256 count = sent[grantor].length();
        Capsule[] memory _capsules = new Capsule[](count);
        for (uint256 i = 0; i < count; i++) {
            _capsules[i] = capsules[sent[grantor].at(i)];
        }
        return _capsules;
    }

    function getReceivedCapsules(address beneficiary) public view returns(Capsule[] memory) {
        uint256 count = received[beneficiary].length();
        Capsule[] memory _capsules = new Capsule[](count);
        for (uint256 i = 0; i < count; i++) {
            _capsules[i] = capsules[received[beneficiary].at(i)];
        }
        return _capsules;
    }

    event ClaimedAsset(address asset, uint256 value, uint256 capsuleId);
    event CapsuleOpened(uint256 capsuleId);
}
