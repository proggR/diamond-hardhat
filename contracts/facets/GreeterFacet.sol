// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract GreeterFacet {
    /* event Greeted(address to_, string greeting_); */

    function hello() external view returns (string memory) {
      string memory _greeting = "hola";
      /* emit Greeted(msg.sender, _greeting); */
      return _greeting;
    }
}
