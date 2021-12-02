pragma solidity ^0.5.0;

import "@openzeppelin/contracts/token/ERC721/ERC721Full.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721Pausable.sol";
import "@openzeppelin/contracts/access/roles/MinterRole.sol";
import "@openzeppelin/contracts/ownership/Ownable.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

contract DappUniversityToken is Ownable, MinterRole, ERC721Full, ERC721Pausable {
  using SafeMath for uint;

  constructor() ERC721Full("Dapp University", "DAPPU") public {
  }

  function mint(address _to, string memory _tokenURI) public onlyMinter returns (bool) {
    _mintWithTokenURI(_to, _tokenURI);
    return true;
  }

  function _mintWithTokenURI(address _to, string memory _tokenURI) internal {
    uint _tokenId = totalSupply().add(1);
    _mint(_to, _tokenId);
    _setTokenURI(_tokenId, _tokenURI);
  }

  function addMinter(address _account) public onlyOwner {
    _addMinter(_account);
  }

  function removeMinter(address _account) public onlyOwner {
    _removeMinter(_account);
  }

  function addPauser(address _account) public onlyOwner {
    _addPauser(_account);
  }

  function removePauser(address _account) public onlyOwner {
    _removePauser(_account);
  }
}
