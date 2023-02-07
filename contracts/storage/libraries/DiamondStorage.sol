// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;

import { LibDiamond } from "../../libraries/LibDiamond.sol";

library DiamondStorage {

  struct Layout {
    string greeting;
  }

  function layout() internal pure returns (Layout storage ds) {
      bytes32 position =  keccak256("diamond-hardhat.basic.diamond.storage");
      assembly {
          ds.slot := position
      }
  }
}
