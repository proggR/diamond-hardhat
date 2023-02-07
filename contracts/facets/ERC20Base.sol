// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;

import { LibDiamond } from "../libraries/LibDiamond.sol";
import "../storage/libraries/ERC20Storage.sol";
import "../interfaces/IERC20Events.sol";

contract ERC20Base is IERC20Events{

    // PRIVATE FUNCTIONS

    function _requireFunds(address from_, uint256 amount_) internal view {
      require(_sufficientFunds(from_, amount_), "ERC20: Insufficient Funds");
    }


    function _sufficientFunds(address from_, uint256 amount_) internal view returns (bool){
      return ERC20Storage.layout()._balances[from_] >= amount_;
    }


    function _transfer(address from_, address to_, uint256 amount_) internal returns (bool){
      _requireFunds(from_, amount_);

      ERC20Storage.layout()._balances[from_] -= amount_;
      ERC20Storage.layout()._balances[to_] += amount_;

      emit Transfer(from_, to_, amount_);
      return true;
    }
}
