// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { LibDiamond } from "../libraries/LibDiamond.sol";
import "./AppStorageFacet.sol";
import "./DiamondStorageFacet.sol";

contract PersistentFacet2 is AppStorageFacet, DiamondStorageFacet {

    function setDS(string memory msg_) external {
      FacetTestStorage storage _ds = facetStorage();
      _ds.greeting = msg_;
    }

    function getDS() external view returns (string memory){
      FacetTestStorage storage _ds = facetStorage();
      return _ds.greeting;
    }

    function s1(string memory msg_) external {
      AppStorage storage _s = appStorage();
      _s.msg1 = msg_;
    }

    function s2(string memory msg_) external {
      AppStorage storage _s = appStorage();
      _s.msg2 = msg_;
    }

    function l1() external view returns (string memory) {
      AppStorage storage _s = appStorage();
      return _s.msg1;
    }

    function l2() external view returns (string memory) {
      AppStorage storage _s = appStorage();
      return _s.msg2;
    }
}
