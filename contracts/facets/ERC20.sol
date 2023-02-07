// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;

import { LibDiamond } from "../libraries/LibDiamond.sol";
import "../storage/libraries/ERC20Storage.sol";
import "../interfaces/IERC20.sol";
import "./ERC20Base.sol";

contract ERC20 is ERC20Base, IERC20 {

    function construct(string memory name_, string memory symbol_, uint8 decimals_, uint256 total_, address mintTo_) external returns (bool){
       ERC20Storage.Layout storage _ds = ERC20Storage.layout();
        /* string memory name_, string memory symbol_ */
       _ds._name = name_;
       _ds._symbol = symbol_;
       _ds._decimals = decimals_;
       _ds._totalSupply = total_ * 10**_ds._decimals;
       _ds._balances[mintTo_] = _ds._totalSupply;
       return true;
    }

    function symbol() public view virtual returns (string memory) {
        return ERC20Storage.layout()._symbol;
    }

    function name() public view virtual returns (string memory) {
        return ERC20Storage.layout()._name;
    }

    function decimals() public view virtual returns (uint8) {
        return ERC20Storage.layout()._decimals;
    }

    // ERC20 INTERFACE FUNCTIONS

    function totalSupply() external view returns (uint256){
      return ERC20Storage.layout()._totalSupply;
    }

    function balanceOf(address account_) external view returns (uint256){
      return ERC20Storage.layout()._balances[account_];
    }

    function transfer(address to_, uint256 amount_) external returns (bool){
      return _transfer(msg.sender,to_,amount_);
    }

    function transferFrom(address from_, address to_, uint256 amount_) external returns (bool){
      _requireAllowance(from_, to_, amount_);
      return _transfer(from_,to_,amount_);
    }

    function allowance(address owner_, address spender_) public view returns (uint256){
      return ERC20Storage.layout()._allowances[owner_][spender_];
    }

    function approve(address spender_, uint256 amount_) external returns (bool){
      return _approve(msg.sender,spender_,amount_);
    }

    // EXTENDED FUNCTIONS

    // PRIVATE FUNCTIONS

    function _requireAllowance(address owner_, address spender_, uint256 amount_) private view {
      require(_sufficientAllowance(owner_,spender_, amount_), "ERC20: Insufficient Allowance");
    }

    function _sufficientAllowance(address owner_, address spender_, uint256 amount_) private view returns (bool){
      return ERC20Storage.layout()._allowances[owner_][spender_] >= amount_;
    }

    function _approve(address approver_, address spender_, uint256 amount_) private returns (bool){
      _requireFunds(approver_, amount_);

      ERC20Storage.layout()._allowances[approver_][spender_] = amount_;

      emit Approval(approver_, spender_, amount_);
      return true;
    }
}
