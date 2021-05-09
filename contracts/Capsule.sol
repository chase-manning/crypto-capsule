// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./utils/EnumerableSet.sol";
import "./utils/Ownable.sol";

import "./interfaces/IERC20.sol";
import "@chainlink/contracts/src/v0.6/interfaces/AggregatorV3Interface.sol";

contract CryptoCapsule is Ownable{
    using EnumerableSet for EnumerableSet.UintSet;

    struct Capsule {
        uint256 id;
        address grantor;
        address payable beneficiary;
        uint256 distributionDate;
        uint256 createdDate;
        bool opened;
        uint256 value;
        address[] tokens;
        uint256[] amounts;
    }

    Capsule[] capsules;
    mapping (address => EnumerableSet.UintSet) private sent;
    mapping (address => EnumerableSet.UintSet) private received;
    mapping (address => AggregatorV3Interface) private oracles;
    AggregatorV3Interface private ethOracle;

    constructor(address[] memory _tokens, address[] memory _oracles, address _ethOracle) Ownable() {
        ethOracle = AggregatorV3Interface(_ethOracle);
        for (uint256 i = 0; i < _tokens.length; i++) {
            oracles[_tokens[i]] = AggregatorV3Interface(_oracles[i]);
        }
    }


    // Functions
    function createCapsule(address payable _beneficiary, uint256 _distributionDate, address[] calldata _tokens, uint256[] calldata _values) public payable {
        require(_distributionDate > block.timestamp, "Distribution Date must be in future");
        require(_tokens.length == _values.length, "Tokens and Values must be same length");

        for (uint256 i = 0; i < _tokens.length; i++) {
            IERC20 erc20Token = IERC20(_tokens[i]);
            erc20Token.transferFrom(msg.sender, address(this), _values[i]);
        }

        uint256 capsuleId = capsules.length;
        capsules.push(Capsule(capsuleId, msg.sender, _beneficiary, _distributionDate, block.timestamp, false, msg.value, _tokens, _values));
        sent[msg.sender].add(capsuleId);
        received[_beneficiary].add(capsuleId);
        emit CapsuleCreated(capsuleId);
    }

    function openCapsule(uint256 capsuleId) public {
        Capsule memory capsule = capsules[capsuleId];
        require(!capsule.opened, "Capsule has already been opened");
        require(block.timestamp >= capsule.distributionDate / 1000, "Capsule has not matured yet");
        require(msg.sender == capsule.beneficiary, "You are not the beneficiary of this Capsule");

        if (capsule.value > 0) capsule.beneficiary.transfer(capsule.value);
        for (uint256 i = 0; i < capsule.tokens.length; i++) {
            IERC20 erc20Token = IERC20(capsule.tokens[i]);
            erc20Token.transfer(capsule.beneficiary, capsule.amounts[i]);
        }

        capsules[capsuleId].opened = true;
        emit CapsuleOpened(capsuleId);
    }

    // Views
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

    function getUsdValue(uint256 capsuleId) public view returns(uint256) {
        Capsule memory capsule = capsules[capsuleId];

        uint256 usd = 0;
        for (uint256 i = 0; i < capsule.tokens.length; i++) {
            usd += _getAssetInUsd(capsule.tokens[i], capsule.amounts[i]);
        }
        usd += _getEthInUsd(capsule.value);
        return usd;
    }

    function getUsdValues(uint256[] memory capsuleIds) public view returns(uint256[] memory) {
        uint256[] memory usds = new uint256[](capsuleIds.length); 
        for (uint256 i = 0; i < capsuleIds.length; i++) {
            usds[i] = getUsdValue(capsuleIds[i]);
        }
        return usds;
    }


    // Admin
    function setOracle(address token, address oracle) public onlyOwner() {
        oracles[token] = AggregatorV3Interface(oracle);
    }

    // TODO: Add function to remove oracle


    // Internals
    function _getAssetInUsd(address token, uint256 amount) private view returns(uint256) {
        uint256 price = _getOraclePrice(oracles[token]);
        return price * amount;
    }

    function _getEthInUsd(uint256 eth) private view returns(uint256) {
        uint256 price = _getOraclePrice(ethOracle);
        return price * eth;
    }

    function _getOraclePrice(AggregatorV3Interface oracle) private view returns(uint256) {
        (
            uint80 roundID, 
            int price,
            uint startedAt,
            uint timeStamp,
            uint80 answeredInRound
        ) = oracle.latestRoundData();
        uint256 decimals = oracle.decimals();
        return uint256(price) / 10 ** decimals;
    }


    // Events
    event CapsuleOpened(uint256 capsuleId);
    event CapsuleCreated(uint256 capsuleId);
}
