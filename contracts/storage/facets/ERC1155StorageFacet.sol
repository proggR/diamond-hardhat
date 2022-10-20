// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { LibDiamond } from "../../libraries/LibDiamond.sol";
import "../structs/ERC1155FacetStorage.sol";

contract ERC1155StorageFacet {

  function erc1155Storage() internal pure returns (ERC1155FacetStorage storage ds) {
      bytes32 position =  keccak256("diamond.erc1155.diamond.storage");
      assembly {
          ds.slot := position
      }
  }
}
