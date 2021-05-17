// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Oracle {
    struct Data {
        uint80 roundID;
        int price;
        uint startedAt;
        uint timeStamp;
        uint80 answeredInRound;
    }

    uint256 public decimals = 8;

    function latestRoundData() public pure returns(Data memory) {
        Data memory data = Data(1,200000000,1,1,1);
        return data;
    }
}