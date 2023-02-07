// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;

import { LibDiamond } from "../../libraries/LibDiamond.sol";

library ERC20Storage {

  struct Layout {
    mapping(address => uint256) _balances;
    mapping(address => mapping(address => uint256)) _allowances;
    uint8 _decimals;
    uint256 _totalSupply;
    string _name;
    string _symbol;
  }

  function layout() internal pure returns (Layout storage ds) {
      bytes32 position =  keccak256("diamond-hardhat.erc20.diamond.storage");
      assembly {
          ds.slot := position
      }
  }
}
