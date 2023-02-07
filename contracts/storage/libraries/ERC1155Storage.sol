// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;

import { LibDiamond } from "../../libraries/LibDiamond.sol";

library ERC1155Storage {

  struct Layout {
    mapping(uint256 => mapping(address => uint256)) _balances;
    mapping(address => mapping(address => bool)) _operatorApprovals;
    mapping(uint256 => uint256) _totalSupply;
    mapping(string => uint256) _uriID;
    string _baseURI;
    mapping(uint256 => string) _tokenURIs;
    uint256 _idx;
  }


  function layout() internal pure returns (Layout storage ds) {
      bytes32 position =  keccak256("diamond-hardhat.erc1155.diamond.storage");
      assembly {
          ds.slot := position
      }
  }
}
