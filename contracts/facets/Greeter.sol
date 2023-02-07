// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;

contract Greeter {
    /* event Greeted(address to_, string greeting_); */

    function hello() external pure returns (string memory) {
      string memory _greeting = "hola amigo";
      /* emit Greeted(msg.sender, _greeting); */
      return _greeting;
    }
}
