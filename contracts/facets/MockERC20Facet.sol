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
         _ds._totalSupply = 1000000 * 10**18;
         _ds._balances[msg.sender] = _ds._totalSupply;
         return true;
     }

    function totalSupply() external view returns (uint256){
      ERC20FacetStorage storage _ds = erc20Storage();
      return _ds._totalSupply;
    }

    function balanceOf(address account_) external view returns (uint256){
      ERC20FacetStorage storage _ds = erc20Storage();
      return _ds._balances[account_];
    }

    function transfer(address to_, uint256 amount_) external returns (bool){
      ERC20FacetStorage storage _ds = erc20Storage();
      require(_ds._balances[msg.sender] >= amount_, "Insufficient funds");
      _transfer(to_,amount_);
      return true;
    }

    function transferFrom(address from_, address to_, uint256 amount_) external returns (bool){
      //implement approve/allowance then circle back
      return false;
    }

    function allowance(address owner_, address spender_) external view returns (uint256){
      return 0;
    }

    function approve(address spender_, uint256 amount_) external returns (bool){
      return false;
    }

    function _transfer(address to_, uint256 amount_) private returns (bool){
      ERC20FacetStorage storage _ds = erc20Storage();
      _ds._balances[msg.sender] = _ds._balances[msg.sender]-amount_;
      _ds._balances[to_] = _ds._balances[to_]+amount_;
      emit Transfer(msg.sender, to_, amount_);
    }
}
