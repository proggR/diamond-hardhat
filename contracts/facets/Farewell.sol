// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;

contract Farewell {
    /* event Greeted(address to_, string greeting_); */

    function goodbye() external pure returns (string memory) {
      string memory _greeting = "adios";
      /* emit Greeted(msg.sender, _greeting); */
      return _greeting;
    }
}
