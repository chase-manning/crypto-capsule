// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

import "./utils/EnumerableSet.sol";
import "./utils/Ownable.sol";

import "./interfaces/IERC20.sol";
import "./extensions/IERC20Metadata.sol";
import "@chainlink/contracts/src/v0.6/interfaces/AggregatorV3Interface.sol";

contract CryptoCapsule is Ownable{
    using EnumerableSet for EnumerableSet.UintSet;


    // Capsule Data
    struct Capsule {
        uint256 id;
        address grantor;
        address payable beneficiary;
        uint256 distributionDate;
        uint256 periodSize;
        uint256 periodCount;
        uint256 claimedPeriods;
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


    // Constructor 
    constructor(address[] memory _tokens, address[] memory _oracles, address _ethOracle) Ownable() {
        ethOracle = AggregatorV3Interface(_ethOracle);
        for (uint256 i = 0; i < _tokens.length; i++) {
            oracles[_tokens[i]] = AggregatorV3Interface(_oracles[i]);
        }
    }


    // Functions
    function createCapsule(address payable _beneficiary, uint256 _distributionDate, uint256 _periodSize, uint256 _periodCount,  address[] calldata _tokens, uint256[] calldata _values) public payable returns(Capsule memory){
        require(_distributionDate > block.timestamp, "Distribution Date must be in future");
        require(_tokens.length == _values.length, "Tokens and Values must be same length");
        require(_periodSize >= 1, "Period Size must greater than or equal to 1");
        require(_periodCount >= 1, "Period Count must greater than or equal to 1");

        for (uint256 i = 0; i < _tokens.length; i++) {
            require(_values[i] > 0, "Token value must be greater than 0");
            IERC20 erc20Token = IERC20(_tokens[i]);
            erc20Token.transferFrom(msg.sender, address(this), _values[i]);
        }

        uint256 capsuleId = capsules.length;
        capsules.push(
            Capsule(
                capsuleId,
                msg.sender,
                _beneficiary,
                _distributionDate,
                _periodSize,
                _periodCount,
                0,
                block.timestamp,
                false,
                msg.value,
                _tokens,
                _values
            )
        );

        sent[msg.sender].add(capsuleId);
        received[_beneficiary].add(capsuleId);
        emit CapsuleCreated(capsuleId);
        return getCapsule(capsuleId);
    }

    function openCapsule(uint256 capsuleId) public {
        require(capsules.length > capsuleId, "Capsule does not exist");
        Capsule memory capsule = capsules[capsuleId];
        require(msg.sender == capsule.beneficiary, "You are not the beneficiary of this Capsule");
        require(!capsule.opened, "Capsule has already been opened");
        require(block.timestamp >= capsule.distributionDate, "Capsule has not matured yet");
        uint256 nextClaimDate = capsule.distributionDate + capsule.claimedPeriods * capsule.periodSize;
        require(block.timestamp >= nextClaimDate, "No periods available to claim"); 

        uint256 claimablePeriods = (block.timestamp - nextClaimDate) / capsule.periodSize + 1;
        uint256 unclaimedPeriods = capsule.periodCount - capsule.claimedPeriods;
        claimablePeriods = claimablePeriods > unclaimedPeriods ? unclaimedPeriods : claimablePeriods;

        if (capsule.value > 0) capsule.beneficiary.transfer(capsule.value * claimablePeriods / capsule.periodCount);
        for (uint256 i = 0; i < capsule.tokens.length; i++) {
            IERC20 erc20Token = IERC20(capsule.tokens[i]);
            erc20Token.transfer(capsule.beneficiary, capsule.amounts[i] * claimablePeriods / capsule.periodCount);
        }

        capsules[capsuleId].claimedPeriods = capsule.claimedPeriods + claimablePeriods;
        capsules[capsuleId].opened = capsule.claimedPeriods + claimablePeriods == capsule.periodCount;
        emit CapsuleOpened(capsuleId);
    }


    // Views
    function getCapsuleCount() public view returns(uint256) {
        return capsules.length;
    }
    
    function getCapsule(uint256 capsuleId) public view returns(Capsule memory) {
        require(capsules.length > capsuleId, "Capsule does not exist");
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
        require(capsules.length > capsuleId, "Capsule does not exist");

        Capsule memory capsule = capsules[capsuleId];

        uint256 usd = 0;
        for (uint256 i = 0; i < capsule.tokens.length; i++) {
            if (address(oracles[capsule.tokens[i]]) != address(0)) {
                usd += _getAssetInUsd(capsule.tokens[i], capsule.amounts[i]);
            }
        }

        if (address(ethOracle) != address(0)) {
            usd += _getEthInUsd(capsule.value);
        }

        return usd;
    }

    function getUsdValues(uint256[] memory capsuleIds) public view returns(uint256[] memory) { //Test
        require(capsuleIds.length > 0, "Must provide at least one capsule id");

        uint256[] memory usds = new uint256[](capsuleIds.length); 
        for (uint256 i = 0; i < capsuleIds.length; i++) {
            usds[i] = getUsdValue(capsuleIds[i]);
        }
        return usds;
    }


    // Admin
    function setOracle(address token, address oracle) public onlyOwner() {
        oracles[token] = AggregatorV3Interface(oracle);
        emit OracleSet(token, oracle);
    }

    function setEthOracle(address oracle) public onlyOwner() {
        ethOracle = AggregatorV3Interface(oracle);
        emit EthOracleSet(oracle);
    }

    function removeOracle(address token) public onlyOwner() {
        oracles[token] = AggregatorV3Interface(address(0));
        emit OracleRemoved(token);
    }

    function removeEthOracle() public onlyOwner() {
        ethOracle = AggregatorV3Interface(address(0));
        emit EthOracleRemoved();
    }


    // Internals
    function _getAssetInUsd(address token, uint256 amount) private view returns(uint256) {
        uint256 tokenDecimals = IERC20Metadata(token).decimals();
        return _getUsd(oracles[token], tokenDecimals, amount);
    }

    function _getEthInUsd(uint256 eth) private view returns(uint256) {
        return _getUsd(ethOracle, 18, eth);
    }

    function _getUsd(AggregatorV3Interface oracle, uint256 tokenDecimals, uint256 amount) private view returns(uint256) {
        uint256 price = _getOraclePrice(oracle);
        uint256 oracleDecimals = oracle.decimals();
        return (price / 10 ** oracleDecimals) * (amount / 10 ** tokenDecimals);
    }

    function _getOraclePrice(AggregatorV3Interface oracle) private view returns(uint256) {
        (
            uint80 roundID, 
            int price,
            uint startedAt,
            uint timeStamp,
            uint80 answeredInRound
        ) = oracle.latestRoundData();
        return uint256(price);
    }


    // Events
    event CapsuleOpened(uint256 capsuleId);
    event CapsuleCreated(uint256 capsuleId);
    event OracleSet(address token, address oracle);
    event EthOracleSet(address oracle);
    event OracleRemoved(address token);
    event EthOracleRemoved();
}
