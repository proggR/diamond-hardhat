// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

struct ERC721FacetStorage {
  string _name;
  string _symbol;
  uint256 _idx;
  mapping(uint256 => string) _tokenURIs;
  mapping(uint256 => address) _owners;
  mapping(address => uint256) _balances;
  mapping(uint256 => address) _tokenApprovals;
  mapping(address => mapping(address => bool)) _operatorApprovals;
}
