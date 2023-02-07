// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;

import { LibDiamond } from "../../libraries/LibDiamond.sol";

library ERC721Storage {

  struct Layout {
    string _name;
    string _symbol;
    uint256 _idx;
    mapping(uint256 => string) _tokenURIs;
    mapping(uint256 => address) _owners;
    mapping(address => uint256) _balances;
    mapping(uint256 => address) _tokenApprovals;
    mapping(address => mapping(address => bool)) _operatorApprovals;
  }

  function layout() internal pure returns (Layout storage ds) {
      bytes32 position =  keccak256("diamond-hardhat.erc721.diamond.storage");
      assembly {
          ds.slot := position
      }
  }
}
