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
        Asset[] assets;
    }
    Capsule[] capsules;
    mapping(address => uint256[]) sent;
    mapping(address => uint256[]) received;

    function createCapsule(address _grantor, address _beneficiary, uint256 _distributionDate, address[] calldata _tokens, uint256[] calldata _values) public payable {
        // TODO Add Requires Here
        uint256 assetCount = _tokens.length;
        Asset[] memory assets = new Asset[](assetCount);
        for (uint256 i = 0; i < assetCount; i++) {
            assets[i] = Asset(_tokens[i], _values[i]);
        }
       uint256 capsuleId = capsules.length;
       capsules[capsuleId] = Capsule(_grantor, _beneficiary, _distributionDate, block.timestamp, false, msg.value, assets);
       sent[msg.sender][sent[msg.sender].length] = capsuleId;
       received[msg.sender][received[msg.sender].length] = capsuleId;

    //    Capsule memory _capsule;
    //    _capsule.grantor = _grantor;
    //    _capsule.beneficiary = _beneficiary;
    //    _capsule.distributionDate = _distributionDate;
    //    _capsule.createdDate = block.timestamp;
    //    _capsule.opened = false;
    //    _capsule.value = msg.value;
    //    _capsule.assets = _assets;
    //    Asset[] memory _assets = new Asset[](2);
    //    _assets[0] = Asset()
    //    _capsule.assets = _assets;
            // IERC20 token = IERC20(_capsule.tokens[i].contractAddress);
    }

    function openCapsule(uint256 capsuleId) public {
        Capsule memory _capsule = capsules[capsuleId];
        require(!_capsule.opened, "Capsule has already been opened");
        require(block.timestamp >= _capsule.distributionDate, "Capsule has not matured yet");
        require(msg.sender == _capsule.beneficiary, "You are not the beneficiary of this Capsule");

        for (uint256 i = 0; i < _capsule.assets.length; i++) {
            Asset memory asset  = _capsule.assets[i];
            IERC20 erc20Token = IERC20(asset.token);
            erc20Token.transfer(_capsule.beneficiary, asset.value);
            emit ClaimedAsset(asset, capsuleId);
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

    event ClaimedAsset(Asset asset, uint256 capsuleId);
    event CapsuleOpened(uint256 capsuleId);
}
