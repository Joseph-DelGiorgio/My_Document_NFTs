// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";

contract MyDegree is Initializable, ERC721, ERC721Upgradeable{
using CountersUpgradeable for CountersUpgradeable.Counter;
CountersUpgradeable.Counter public _tokenIdCounter;
uint256 public mintPrice;
uint256 public totalSupply;
uint256 public maxSupply;
string internal baseTokenUri;
address payable public withdrawAccount;
mapping(address => uint256) public documentMints;
mapping (uint256 => documentInfo) public documentInfos;



struct documentInfo {
    string school;
    string degree;
    string field;
    bytes32 cid;
}

constructor() {
    _disableInitializers();
    totalSupply= 0;
    maxSupply= 10000;
    mintPrice= 0.01 ether; //10000000000000000 wei
}

function updateDocumentInfo(uint256 tokenId, string memory school, string memory degree, string memory field) public onlyOwner {
    require(_exists(tokenId), "Token does not exist");
    documentInfos[tokenId].school = school;
    documentInfos[tokenId].degree = degree;
    documentInfos[tokenId].field = field;
}

function transferOwnership(address from, address to, uint256 tokenId) public {
    require(_exists(tokenId), "Token does not exist");
    require(to != address(0), "Invalid recipient address");
    require(_isApprovedOrOwner(msg.sender, tokenId), "Sender is not authorized to transfer this token");
    safeTransferFrom(from, to, tokenId);
}



function getdocumentInfo(uint256 tokenId) public view returns (string memory school, string memory degree, string memory field, bytes32 cid) {
require(_exists(tokenId), "Token does not exist");
school = documentInfos[tokenId].school;
degree = documentInfos[tokenId].degree;
field = documentInfos[tokenId].field;
cid = documentInfos[tokenId].cid;
}

function mintDocument(string memory school, string memory degree, string memory field, bytes32 cid) public payable {
require(msg.value >= mintPrice, "Payment not enough");
require(totalSupply < maxSupply, "Maximum supply reached");
uint256 newTokenId = _tokenIdCounter.increment();
documentInfos[newTokenId].school = school;
documentInfos[newTokenId].degree = degree;
documentInfos[newTokenId].field = field;
documentInfos[newTokenId].cid = cid;
_mint(msg.sender, newTokenId);
totalSupply++;
documentMints[msg.sender]++;
withdrawAccount.transfer(msg.value);
}

function withdrawEarnings() public onlyOwner {
require(withdrawAccount.send(address(this).balance), "Unable to send funds");
}

function setBaseTokenUri(string memory uri) public onlyOwner {
baseTokenUri = uri;
}

function setMintPrice(uint256 newPrice) public onlyOwner {
mintPrice = newPrice;
}

function setMaxSupply(uint256 newMaxSupply) public onlyOwner {
maxSupply = newMaxSupply;
}



function getDocumentMints(address account) public view returns (uint256) {
return documentMints[account];
}

}


