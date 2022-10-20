// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { LibDiamond } from "../../libraries/LibDiamond.sol";
import "../structs/ERC721FacetStorage.sol";

contract ERC721StorageFacet {

  function erc721Storage() internal pure returns (ERC721FacetStorage storage ds) {
      bytes32 position =  keccak256("diamond.erc721.diamond.storage");
      assembly {
          ds.slot := position
      }
  }
}
