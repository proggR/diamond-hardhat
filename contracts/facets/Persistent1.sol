// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;

import "../storage/AppStorage.sol";

contract Persistent1 is AppStorage {

    function setM1(string memory msg_) external {
      s.msg1 = msg_;
    }

    function setM2(string memory msg_) external {
      s.msg2 = msg_;
    }

    function loadM1() external view returns (string memory) {
      return s.msg1;
    }

    function loadM2() external view returns (string memory) {
      return s.msg2;
    }
}
