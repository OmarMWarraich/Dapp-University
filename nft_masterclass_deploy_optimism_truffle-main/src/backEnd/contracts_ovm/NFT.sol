// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;

import "./ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./Token.sol";

contract NFT is ERC721, Ownable {

  address public _owner;
  mapping (uint => bool) public sold;
  mapping (uint => uint) public price;
  Token public token;

  event Purchase(address owner, uint price, uint id, string uri);

  constructor(address _token) ERC721("Dapp University", "DAPPU") {
  	_owner = msg.sender;
    token = Token(_token);
  }

  function mint(string memory _tokenURI, uint _price) public onlyOwner returns (bool) {
    uint _tokenId = totalSupply() + 1;
    price[_tokenId] = _price;

    _mint(address(this), _tokenId);
    _setTokenURI(_tokenId, _tokenURI);
    
    return true;
  }

  // need to call approve() with _amount before buying or interating with NFT platform 
  function buy(uint _id, uint _amount) external {
    _validate(_id, _amount); //check req. for trade
    _trade(_id, _amount); //swap nft for ONC token
    
    emit Purchase(msg.sender, price[_id], _id, tokenURI(_id));
  }

  function _validate(uint _id, uint _amount) internal {
  	require(_exists(_id), "Error, wrong Token id"); //not exists
    require(!sold[_id], "Error, Token is sold"); //already sold
    require(_amount >= price[_id], "Error, Token costs more"); //costs more
  }

  function _trade(uint _id, uint _amount) internal {
  	_transfer(address(this), msg.sender, _id); //nft to user
    require(Token(token).transferFrom(msg.sender, _owner, _amount));
    //Token(token).transfer(_owner,_amount); //ONC token to _owner
  	sold[_id] = true; //nft is sold
  }
}