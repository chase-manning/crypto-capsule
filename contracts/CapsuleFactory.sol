// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Capsule.sol";

contract CapsuleFactory {
    mapping(address => Capsule[]) sentCapsules;
    mapping(address => Capsule[]) receivedCapsules;

    function getSentCapsules(address _grantor) public view returns(Capsule[] memory) {
        return sentCapsules[_grantor];
    }

    function getReceivedCapsules(address _beneficiary) public view returns(Capsule[] memory) {
        return receivedCapsules[_beneficiary];
    }

    function newCapsule(address _beneficiary, uint256 _distributionDate) payable public returns(Capsule capsule) {
        capsule = new Capsule(msg.sender, _beneficiary, _distributionDate);
        sentCapsules[msg.sender].push(capsule);
        receivedCapsules[_beneficiary].push(capsule);
        address(capsule).transfer(msg.value);
        emit Created(capsule, msg.sender, _beneficiary, block.timestamp, _distributionDate, msg.value);
    }

    fallback () external {
        revert();
    }

    event Created(Capsule capsule, address grantor, address beneficiary, uint256 createdDate, uint256 distributionDate, uint256 amount);
}