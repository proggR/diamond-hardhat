// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { LibDiamond } from "../../libraries/LibDiamond.sol";
import "../structs/ERC20FacetStorage.sol";

contract ERC20StorageFacet {

  function erc20Storage() internal pure returns (ERC20FacetStorage storage ds) {
      bytes32 position =  keccak256("diamond.erc20.diamond.storage");
      assembly {
          ds.slot := position
      }
  }
}
