// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./interfaces/IERC20.sol";

contract SharedCapsuleV1 {
    struct Asset {
        address token;
        uint256 value;
    }
    struct Capsule {
        address grantor;
        address beneficiary;
        uint256 distributionDate;
        uint256 createdDate;
        bool opened;
        uint256 value;
        address[] tokens;
        uint256[] values;
        // Asset[] assets;
    }
    uint256 capsuleCount = 0;
    // mapping(uint256 => Capsule) capsules;
    Capsule[] capsules;
    mapping(address => uint256[]) sent;
    mapping(address => uint256[]) received;

    function createCapsule(address _grantor, address _beneficiary, uint256 _distributionDate, address[] calldata _tokens, uint256[] calldata _values) public payable {
        // TODO Add Requires Here
        capsules.push(Capsule(_grantor, _beneficiary, _distributionDate, block.timestamp, false, msg.value, _tokens, _values));
        sent[msg.sender][sent[msg.sender].length] = capsuleCount;
        received[msg.sender][received[msg.sender].length] = capsuleCount;
        capsuleCount ++;
            // IERC20 token = IERC20(_capsule.tokens[i].contractAddress);
    }

    function openCapsule(uint256 capsuleId) public {
        Capsule memory _capsule = capsules[capsuleId];
        require(!_capsule.opened, "Capsule has already been opened");
        require(block.timestamp >= _capsule.distributionDate, "Capsule has not matured yet");
        require(msg.sender == _capsule.beneficiary, "You are not the beneficiary of this Capsule");

        for (uint256 i = 0; i < _capsule.tokens.length; i++) {
            IERC20 erc20Token = IERC20(_capsule.tokens[i]);
            erc20Token.transfer(_capsule.beneficiary, _capsule.values[i]);
            emit ClaimedAsset(_capsule.tokens[i], _capsule.values[i], capsuleId);
        }

        _capsule.opened = true;
        emit CapsuleOpened(capsuleId);
    }

    function getCapsule(uint256 capsuleId) public view returns(Capsule memory) {
        return capsules[capsuleId];
    }

    function getSentCapsules(address grantor) public view returns(Capsule[] memory) {
        uint[] memory ids = sent[grantor];
        Capsule[] memory _capsules = new Capsule[](ids.length);
        for (uint256 i = 0; i < ids.length; i++) {
            _capsules[i] = capsules[ids[i]];
        }
        return _capsules;
    }

    function getReceivedCapsules(address beneficiary) public view returns(Capsule[] memory) {
        uint[] memory ids = received[beneficiary];
        Capsule[] memory _capsules = new Capsule[](ids.length);
        for (uint256 i = 0; i < ids.length; i++) {
            _capsules[i] = capsules[ids[i]];
        }
        return _capsules;
    }

    event ClaimedAsset(address asset, uint256 value, uint256 capsuleId);
    event CapsuleOpened(uint256 capsuleId);
}
