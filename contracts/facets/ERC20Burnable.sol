// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;

import { LibDiamond } from "../libraries/LibDiamond.sol";
import "../storage/libraries/ERC20Storage.sol";
import "../interfaces/IERC20Burnable.sol";
import "./ERC20Base.sol";

contract ERC20Burnable is ERC20Base, IERC20Burnable {
    
    function burn(uint256 amount_) external returns (bool){
        _burn(msg.sender, amount_);
    }

    function _burn(address from_, uint256 amount_) private returns (bool){
      require(from_ != address(0), "ERC20: can't burn from 0 address");
      _requireFunds(from_, amount_);

      ERC20Storage.layout()._balances[from_] -= amount_;
      ERC20Storage.layout()._totalSupply -= amount_;

      emit Transfer(from_, address(0), amount_);
      return true;
    }
}