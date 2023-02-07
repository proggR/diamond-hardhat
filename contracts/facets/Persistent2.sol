// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;

import "../storage/AppStorage.sol";
import "../storage/libraries/DiamondStorage.sol";

contract Persistent2 is AppStorage {

    function setDS(string memory msg_) external {
      DiamondStorage.layout().greeting = msg_;
    }

    function getDS() external view returns (string memory){
      return DiamondStorage.layout().greeting;
    }

    function s1(string memory msg_) external {
      s.msg1 = msg_;
    }

    function s2(string memory msg_) external {
      s.msg2 = msg_;      
    }

    function l1() external view returns (string memory) {
      return s.msg1;
    }

    function l2() external view returns (string memory) {
      return s.msg2;
    }
}
