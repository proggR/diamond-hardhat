// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { LibDiamond } from "../libraries/LibDiamond.sol";
import "./AppStorageFacet.sol";

contract PersistentFacet1 is AppStorageFacet {

    function setM1(string memory msg_) external {
      AppStorage storage _s = appStorage();
      _s.msg1 = msg_;
    }

    function setM2(string memory msg_) external {
      AppStorage storage _s = appStorage();
      _s.msg2 = msg_;
    }

    function loadM1() external view returns (string memory) {
      AppStorage storage _s = appStorage();
      return _s.msg1;
    }

    function loadM2() external view returns (string memory) {
      AppStorage storage _s = appStorage();
      return _s.msg2;
    }
}
