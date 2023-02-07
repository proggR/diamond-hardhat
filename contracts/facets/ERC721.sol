// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;

import { LibDiamond } from "../libraries/LibDiamond.sol";
import "../storage/libraries/ERC721Storage.sol";
import "../interfaces/IERC721.sol";
import "../interfaces/IERC721Receiver.sol";

contract ERC721 is IERC721 {

    //ipfsHash_ = "Qme7ss3ARVgxv6rXqVPiikMJ8u2NLgmgszg13pYrDKEoiu"
    function construct(string memory name_, string memory symbol_, string memory ipfsHash_) external returns (bool){
       ERC721Storage.layout()._name = name_;
       ERC721Storage.layout()._symbol = symbol_;
       _mint(msg.sender, ipfsHash_);
       return true;
    }

    function symbol() public view virtual returns (string memory) {
        return ERC721Storage.layout()._symbol;
    }

    function name() public view virtual returns (string memory) {
        return ERC721Storage.layout()._name;
    }

    function tokenURI(uint256 tokenID_) public view returns (string memory) {
      _requireMinted(tokenID_);
      string memory _tokenURI = ERC721Storage.layout()._tokenURIs[tokenID_];
      string memory _base = _baseURI();

      if (bytes(_base).length == 0) {
          return _tokenURI;
      } else if (bytes(_tokenURI).length > 0) {
          return string(abi.encodePacked(_base, _tokenURI));
      }

      return "";
    }

    function _baseURI() internal pure returns (string memory) {
      return "https://ipfs.io/ipfs/";
    }

    // ERC721 INTERFACE FUNCTIONS

    function balanceOf(address account_) external view returns (uint256){
      return ERC721Storage.layout()._balances[account_];
    }

    function ownerOf(uint256 tokenID_) public view virtual returns (address) {
        _requireMinted(tokenID_);
        return _owner(tokenID_);
    }

    function transfer(address to_, uint256 amount_) external returns (bool){
      return _transfer(msg.sender, to_,amount_);
    }

    function transferFrom(address from_, address to_, uint256 tokenID_) external{
      _requireAuth(from_, tokenID_);
      _transfer(from_,to_,tokenID_);
    }

    function approve(address operator_, uint256 tokenID_) external{
      _approve(msg.sender,operator_,tokenID_);
    }

    function setApprovalForAll(address operator_, bool approved_) external {
      _setApprovalForAll(msg.sender,operator_, approved_);
    }

    function getApproved(uint256 tokenId) external view returns (address operator){
      return ERC721Storage.layout()._tokenApprovals[tokenId];
    }

    function isApprovedForAll(address owner_, address operator_) public view returns (bool){
      return ERC721Storage.layout()._operatorApprovals[owner_][operator_];
    }

    function safeTransferFrom(address from_, address to_, uint256 tokenID_, bytes memory data_) public {
      _requireAuth(msg.sender,tokenID_);
      _safeTransfer(from_,to_, tokenID_, data_);
    }

    function safeTransferFrom(address from_, address to_, uint256 tokenID_) external {
      safeTransferFrom(from_,to_,tokenID_,"");
    }

    // PRIVATE FUNCTIONS

    function _setApprovalForAll(address owner_, address operator_, bool approved_) internal virtual {
        require(owner_ != operator_, "ERC721: approve to caller");

        ERC721Storage.layout()._operatorApprovals[owner_][operator_] = approved_;

        emit ApprovalForAll(owner_, operator_, approved_);
    }

    function _approve(address owner_, address operator_, uint256 tokenID_) private returns (bool){
      require(ownerOf(tokenID_) != operator_, "ERC721: Approval to current owner");
      _requireAuth(owner_, tokenID_);

      ERC721Storage.layout()._tokenApprovals[tokenID_] = operator_;

      emit Approval(ownerOf(tokenID_), operator_, tokenID_);
      return true;
    }

    function _mint(address to_, string memory tokenURI_) private {
      require(to_ != address(0), "ERC721: Cannot transfer to 0 address");
      ERC721Storage.Layout storage _ds = ERC721Storage.layout();
      _ds._idx +=1;
      uint256 _tokenID = _ds._idx;
      _ds._balances[to_] += 1;
      _ds._owners[_tokenID] = to_;
      _ds._tokenURIs[_tokenID] = tokenURI_;

      emit Transfer(address(0), to_, _tokenID);
    }

    function _transfer(address from_, address to_, uint256 tokenID_) private returns (bool){
      require(to_ != address(0), "ERC721: Cannot transfer to 0 address");
      _requireMinted(tokenID_);
      _requireOwner(from_, tokenID_);
      /* _requireAuth(from_, tokenID_); */

      ERC721Storage.Layout storage _ds = ERC721Storage.layout();

      delete _ds._tokenApprovals[tokenID_];
      _ds._owners[tokenID_] = to_;
      _ds._balances[msg.sender] -= 1;
      _ds._balances[to_] += 1;

      emit Transfer(msg.sender, to_, tokenID_);
      return true;
    }

    function _safeTransfer(address from_, address to_, uint256 tokenID_, bytes memory data_) internal {
      _transfer(from_,to_,tokenID_);
      _requireReciever(from_, to_, tokenID_, data_);
    }

    function _requireMinted(uint256 tokenId) internal view virtual {
      require(_exists(tokenId), "ERC721: invalid token ID");
    }

    function _requireAuth(address from_, uint256 tokenID_) private view {
      require(_hasAuth(from_,tokenID_), "ERC721: Not token owner or approved");
    }

    function _requireOwner(address from_, uint256 tokenID_) private view {
      require(_owner(tokenID_) == from_, "ERC721: Not token owner");
    }

    function _requireReciever(address from_, address to_, uint256 tokenID_, bytes memory data_) private {
      require(_checkOnERC721Received(from_, to_, tokenID_, data_), "ERC721: transfer to non ERC721Receiver implementer");
    }

    function _owner(uint256 tokenID_) internal view returns (address){
      return ERC721Storage.layout()._owners[tokenID_];
    }

    function _hasAuth(address from_, uint256 tokenID_) internal view returns (bool){
      address _ownerAcount = _owner(tokenID_);
      return _ownerAcount == from_ || isApprovedForAll(_ownerAcount,from_);
    }

    function _exists(uint256 tokenId) internal view virtual returns (bool) {
      return _owner(tokenId) != address(0);
    }

    function _hasContract(address account_) private view returns (bool){
      return account_.code.length > 0;
    }

    function _checkOnERC721Received(address from_, address to_, uint256 tokenID_, bytes memory data_) private returns (bool) {
      if (_hasContract(to_)) {
          try IERC721Receiver(to_).onERC721Received(msg.sender, from_, tokenID_, data_) returns (bytes4 retval) {
              return retval == IERC721Receiver.onERC721Received.selector;
          } catch (bytes memory reason) {
              if (reason.length == 0) {
                  revert("ERC721: transfer to non ERC721Receiver implementer");
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
