// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { LibDiamond } from "../libraries/LibDiamond.sol";
import "../storage/facets/AppStorageFacet.sol";
import "../storage/facets/ERC20StorageFacet.sol";
import "../interfaces/IERC20.sol";

contract MockERC20Facet is AppStorageFacet, ERC20StorageFacet, IERC20 {

    function construct() external returns (bool){
       ERC20FacetStorage storage _ds = erc20Storage();
        /* string memory name_, string memory symbol_ */
       _ds._name = "MockGem";
       _ds._symbol = "GEM";
       _ds._decimals = 18;
       _ds._totalSupply = 1000000 * 10**_ds._decimals;
       _ds._balances[msg.sender] = _ds._totalSupply;
       return true;
    }

    function symbol() public view virtual returns (string memory) {
        ERC20FacetStorage storage _ds = erc20Storage();
        return _ds._symbol;
    }

    function name() public view virtual returns (string memory) {
        ERC20FacetStorage storage _ds = erc20Storage();
        return _ds._name;
    }

    function decimals() public view virtual returns (uint8) {
        ERC20FacetStorage storage _ds = erc20Storage();
        return _ds._decimals;
    }

    // ERC20 INTERFACE FUNCTIONS

    function totalSupply() external view returns (uint256){
      ERC20FacetStorage storage _ds = erc20Storage();
      return _ds._totalSupply;
    }

    function balanceOf(address account_) external view returns (uint256){
      ERC20FacetStorage storage _ds = erc20Storage();
      return _ds._balances[account_];
    }

    function transfer(address to_, uint256 amount_) external returns (bool){
      return _transfer(msg.sender,to_,amount_);
    }

    function transferFrom(address from_, address to_, uint256 amount_) external returns (bool){
      _requireAllowance(from_, to_, amount_);
      return _transfer(from_,to_,amount_);
    }

    function allowance(address owner_, address spender_) public view returns (uint256){
      ERC20FacetStorage storage _ds = erc20Storage();
      return _ds._allowances[owner_][spender_];
    }

    function approve(address spender_, uint256 amount_) external returns (bool){
      return _approve(msg.sender,spender_,amount_);
    }

    // EXTENDED FUNCTIONS

    // PRIVATE FUNCTIONS

    function _requireFunds(address from_, uint256 amount_) private view {
      require(_sufficientFunds(from_, amount_), "ERC20: Insufficient Funds");
    }

    function _requireAllowance(address owner_, address spender_, uint256 amount_) private view {
      require(_sufficientAllowance(owner_,spender_, amount_), "ERC20: Insufficient Allowance");
    }

    function _sufficientFunds(address from_, uint256 amount_) private view returns (bool){
      ERC20FacetStorage storage _ds = erc20Storage();
      return _ds._balances[from_] >= amount_;
    }

    function _sufficientAllowance(address owner_, address spender_, uint256 amount_) private view returns (bool){
      ERC20FacetStorage storage _ds = erc20Storage();
      return _ds._allowances[owner_][spender_] >= amount_;
    }

    function _approve(address approver_, address spender_, uint256 amount_) private returns (bool){
      _requireFunds(approver_, amount_);

      ERC20FacetStorage storage _ds = erc20Storage();
      _ds._allowances[approver_][spender_] = amount_;

      emit Approval(approver_, spender_, amount_);
      return true;
    }

    function _transfer(address from_, address to_, uint256 amount_) private returns (bool){
      _requireFunds(from_, amount_);

      ERC20FacetStorage storage _ds = erc20Storage();
      _ds._balances[from_] -= amount_;
      _ds._balances[to_] += amount_;

      emit Transfer(from_, to_, amount_);
      return true;
    }

    function _mint(address to_, uint256 amount_) private returns (bool){
      require(to_ != address(0), "ERC20: can't mint to 0 address");
      ERC20FacetStorage storage _ds = erc20Storage();
      _ds._totalSupply += amount_;
      _ds._balances[to_] += amount_;

      emit Transfer(address(0), to_, amount_);
      return true;
    }

    function _burn(address from_, uint256 amount_) private returns (bool){
      require(from_ != address(0), "ERC20: can't burn from 0 address");
      _requireFunds(from_, amount_);

      ERC20FacetStorage storage _ds = erc20Storage();
      _ds._balances[from_] -= amount_;
      _ds._totalSupply -= amount_;

      emit Transfer(from_, address(0), amount_);
      return true;
    }
}
