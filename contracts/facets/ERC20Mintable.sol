// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;

import { LibDiamond } from "../libraries/LibDiamond.sol";
import "../storage/libraries/ERC20Storage.sol";
import "../interfaces/IERC20Mintable.sol";
import "./ERC20Base.sol";

contract ERC20Mintable is ERC20Base, IERC20Mintable {
    modifier onlyMinter {
        //implement minter control logic
        _;
    }

    function mint(address to_, uint256 amount_) external onlyMinter returns (bool){
        _mint(to_, amount_);
    }

    function _mint(address to_, uint256 amount_) private returns (bool){
      require(to_ != address(0), "ERC20: can't mint to 0 address");

      ERC20Storage.layout()._totalSupply += amount_;
      ERC20Storage.layout()._balances[to_] += amount_;

      emit Transfer(address(0), to_, amount_);
      return true;
    }
}