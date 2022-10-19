// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { LibDiamond } from "../../libraries/LibDiamond.sol";
import "../structs/FacetTestStorage.sol";

contract DiamondStorageFacet {

  function facetStorage() internal pure returns (FacetTestStorage storage ds) {
      bytes32 position =  keccak256("diamond.test.diamond.storage");
      assembly {
          ds.slot := position
      }
  }
}
