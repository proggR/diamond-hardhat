// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { LibDiamond } from "../libraries/LibDiamond.sol";
import "./AppStorageFacet.sol";
/* import "./DiamondStorageFacet.sol"; */

contract PersistentFacet2 is AppStorageFacet {

    struct FacetTestData {
      string greeting;
    }

    function facetStorage() internal pure returns (FacetTestData storage ds) {
        bytes32 position =  keccak256("diamond.test.diamond.storage");
        assembly {
            ds.slot := position
        }
    }

    function setDS(string memory msg_) external {
      FacetTestData storage _ds = facetStorage();
      _ds.greeting = msg_;
    }

    function getDS() external view returns (string memory){
      FacetTestData storage _ds = facetStorage();
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
