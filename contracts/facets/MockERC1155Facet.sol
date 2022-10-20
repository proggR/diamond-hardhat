// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { LibDiamond } from "../libraries/LibDiamond.sol";
import "../storage/facets/AppStorageFacet.sol";
import "../storage/facets/ERC1155StorageFacet.sol";
import "../interfaces/IERC1155.sol";
import "../interfaces/IERC1155Receiver.sol";

contract MockERC1155Facet is AppStorageFacet, ERC1155StorageFacet, IERC1155 {

  function construct() external returns (bool){
     ERC1155FacetStorage storage _ds = erc1155Storage();
     _ds._baseURI = "https://ipfs.io/ipfs/";
     _mint(msg.sender, "Qme7ss3ARVgxv6rXqVPiikMJ8u2NLgmgszg13pYrDKEoiu",1);
     return true;
  }

  function uri(uint256 tokenID_) public view virtual returns (string memory) {
      ERC1155FacetStorage storage _ds = erc1155Storage();

      string memory _tokenURI = _ds._tokenURIs[tokenID_];
      string memory _base = _ds._baseURI;

      if (bytes(_base).length == 0) {
          return _tokenURI;
      } else if (bytes(_tokenURI).length > 0) {
          return string(abi.encodePacked(_base, _tokenURI));
      }

      return "";
  }

  function totalSupply(uint256 id_) public view virtual returns (uint256) {
      ERC1155FacetStorage storage _ds = erc1155Storage();
      return _ds._totalSupply[id_];
  }

  function exists(uint256 id_) public view virtual returns (bool) {
      return totalSupply(id_) > 0;
  }

  function balanceOf(address account_, uint256 id_) public view returns (uint256) {
    _requireNonZero(account_);
    ERC1155FacetStorage storage _ds = erc1155Storage();
    return _ds._balances[id_][account_];
  }

  function balanceOfBatch(address[] calldata accounts_, uint256[] calldata ids_) external view returns (uint256[] memory) {
    require(accounts_.length == ids_.length, "ERC1155: accounts and ids length mismatch");
    ERC1155FacetStorage storage _ds = erc1155Storage();
    uint256[] memory batchBalances = new uint256[](accounts_.length);

    for (uint256 i = 0; i < accounts_.length; ++i) {
        batchBalances[i] = balanceOf(accounts_[i], ids_[i]);
    }

    return batchBalances;
  }

  function setApprovalForAll(address operator_, bool approved_) external {
    _setApprovalForAll(msg.sender, operator_, approved_);
  }

  function isApprovedForAll(address account_, address operator_) public view returns (bool) {
    ERC1155FacetStorage storage _ds = erc1155Storage();
    return _ds._operatorApprovals[account_][operator_];
  }


  function safeTransferFrom(address from_, address to_, uint256 id_, uint256 amount_, bytes calldata data_) external {
    _requireAuth(from_);
    _safeTransferFrom(from_, to_, id_, amount_, data_);
  }

  function safeBatchTransferFrom(address from_, address to_, uint256[] calldata ids_, uint256[] calldata amounts_, bytes calldata data_) external {
    _requireAuth(from_);
    _safeBatchTransferFrom(from_, to_, ids_, amounts_, data_);
  }

  function _setApprovalForAll(address owner_, address operator_, bool approved_) private {
    require(owner_ != operator_, "ERC1155: Cannot set approval status for self");
    ERC1155FacetStorage storage _ds = erc1155Storage();
    _ds._operatorApprovals[owner_][operator_] = approved_;

    emit ApprovalForAll(owner_, operator_, approved_);
  }

  function _safeTransferFrom(address from_, address to_, uint256 id_, uint256 amount_, bytes memory data_) private {
    _transfer(from_, to_, id_, amount_);

    emit TransferSingle(msg.sender, from_, to_, id_, amount_);
    _requireReciever(from_,to_,id_,amount_, data_);
  }

  function _safeBatchTransferFrom(address from_, address to_, uint256[] memory ids_, uint256[] memory amounts_, bytes memory data_) private {
    require(amounts_.length == ids_.length, "ERC1155: accounts and ids length mismatch");

    uint256[] memory batchBalances = new uint256[](amounts_.length);

    for (uint256 _i = 0; _i < amounts_.length; ++_i) {
        _transfer(from_,to_, ids_[_i], amounts_[_i]);
    }

    emit TransferBatch(msg.sender, from_, to_, ids_, amounts_);
    _requireBatchReciever(from_,to_,ids_,amounts_, data_);
  }


  function _transfer(address from_, address to_, uint256 id_, uint256 amount_) private {
    _requireNonZero(to_);
    _requireBalance(from_,id_,amount_);
    ERC1155FacetStorage storage _ds = erc1155Storage();
    _ds._balances[id_][from_] -= amount_;
    _ds._balances[id_][to_] += amount_;
  }

  function _mint(address to_, string memory uri_, uint256 amount_) internal virtual {
    _mint(to_, uri_, amount_, "");
  }

  function _mint(address to_, string memory uri_, uint256 amount_, bytes memory data_) internal virtual {
    _requireNonZero(to_);

    ERC1155FacetStorage storage _ds = erc1155Storage();
    uint256 _id = _ds._uriID[uri_];
    if(_id == 0){
      _ds._idx++;
      _id = _ds._idx;
      _ds._tokenURIs[_id] = uri_;
      _ds._uriID[uri_] = _id;
    }

    _ds._totalSupply[_id] += amount_;
    _ds._balances[_id][to_] += amount_;

    emit TransferSingle(msg.sender, address(0), to_, _id, amount_);

    _requireReciever(address(0), to_, _id, amount_, data_);
  }

  function _requireAuth(address account_) private view {
    require(account_ == msg.sender || isApprovedForAll(account_, msg.sender),"ERC1155: caller is not token owner or approved");
  }

  function _requireNonZero(address account_) private view {
    require(account_ != address(0), "ERC1155: address zero is not a valid owner");
  }

  function _requireBalance(address account_, uint256 id_, uint256 amount_) private view {
    ERC1155FacetStorage storage _ds = erc1155Storage();
    require(_ds._balances[id_][account_] >= amount_, "ERC1155: Insufficient balance");
  }

  function _requireReciever(address from_, address to_, uint256 tokenID_, uint256 amount_, bytes memory data_) private {
    require(_checkOnERC1155Received(from_, to_, tokenID_, amount_, data_), "ERC1155: transfer to non ERC1155Receiver implementer");
  }

  function _requireBatchReciever(address from_, address to_, uint256[] memory tokenIDs_, uint256[] memory amounts_, bytes memory data_) private {
    require(_checkOnERC1155BactchReceived(from_, to_, tokenIDs_, amounts_, data_), "ERC1155: transfer to non ERC1155Receiver implementer");
  }

  function _hasContract(address account_) private view returns (bool){
    return account_.code.length > 0;
  }

  function _checkOnERC1155Received(address from_, address to_, uint256 tokenID_, uint256 amount_, bytes memory data_) private returns (bool) {
    if (_hasContract(to_)) {
        try IERC1155Receiver(to_).onERC1155Received(msg.sender, from_, tokenID_, amount_, data_) returns (bytes4 retval) {
            return retval == IERC1155Receiver.onERC1155Received.selector;
        } catch (bytes memory reason) {
            if (reason.length == 0) {
                revert("ERC1155: transfer to non ERC1155Receiver implementer");
            } else {
                /// @solidity memory-safe-assembly
                assembly {
                    revert(add(32, reason), mload(reason))
                }
            }
        }
    } else {
        return true;
    }
  }

  function _checkOnERC1155BactchReceived(address from_, address to_, uint256[] memory tokenIDs_, uint256[] memory amounts_, bytes memory data_) private returns (bool) {
    if (_hasContract(to_)) {
        try IERC1155Receiver(to_).onERC1155BatchReceived(msg.sender, from_, tokenIDs_, amounts_, data_) returns (bytes4 retval) {
            return retval == IERC1155Receiver.onERC1155Received.selector;
        } catch (bytes memory reason) {
            if (reason.length == 0) {
                revert("ERC1155: transfer to non ERC1155Receiver implementer");
            } else {
                /// @solidity memory-safe-assembly
                assembly {
                    revert(add(32, reason), mload(reason))
                }
            }
        }
    } else {
        return true;
    }
  }

}
