// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;

import { LibDiamond } from "../libraries/LibDiamond.sol";

abstract contract AppStorage {
    Layout internal s;

    struct Layout {
      string msg1;
      string msg2;
    }
}
