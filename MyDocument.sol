// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyDegree is Ownable, ERC721 {
uint256 public mintPrice;
uint256 public totalSupply;
uint256 public maxSupply;
string internal baseTokenURI;
address payable public withdrawAddress;
mapping (address => uint256) public documentMints;
mapping (uint256 => DocumentInfo) public documentInfos;
struct DocumentInfo {
    string school;
    string degree;
    string field;
    bytes32 cid;
}



constructor(string memory name_, string memory symbol_) ERC721(name_, symbol_) public {
    totalSupply = 0;
    maxSupply = 10000;
    mintPrice = 0.01 ether; // 10000000000000000 wei
}

function updateDocumentInfo(uint256 tokenId, string memory school, string memory degree, string memory field) public {
    require(_exists(tokenId), "Token does not exist");
    documentInfos[tokenId].school = school;
    documentInfos[tokenId].degree = degree;
    documentInfos[tokenId].field = field;
}

function transferOwnership(address from, address to, uint256 tokenId) public {
    require(_exists(tokenId), "Token does not exist");
    require(to != address(0), "Invalid recipient address");
    require(_isApprovedOrOwner(from, tokenId), "Sender must be the owner or approved user of the token");
    super._transfer(from, to, tokenId);
}

function setWithdrawAddress(address payable newAddress) public onlyOwner {
    require(newAddress != address(0), "Invalid address");
    withdrawAddress = newAddress;
}

function setMintPrice(uint256 newMintPrice) public onlyOwner {
    require(newMintPrice >= 0, "Mint price must be non-negative");
    mintPrice = newMintPrice;
}

function setMaxSupply(uint256 newMaxSupply) public onlyOwner {
    require(newMaxSupply >= totalSupply, "New max supply must be greater than or equal to current total supply");
    maxSupply = newMaxSupply;
}

function setBaseTokenURI(string memory newBaseTokenURI) public onlyOwner {
    baseTokenURI = newBaseTokenURI;
}

function mint(string memory cid, string memory school, string memory degree, string memory field) public payable {
    require(msg.value >= mintPrice, "Amount sent is less than the minimum required");
    require(totalSupply + 1 <= maxSupply, "Max supply reached");
    uint256 newTokenId = _tokenId();
    documentMints[msg.sender]++;
    totalSupply++;
    _mint(msg.sender, newTokenId);
    documentInfos[newTokenId].cid = bytes32(keccak256(abi.encodePacked(cid)));
    documentInfos[newTokenId].school = school;
    documentInfos[newTokenId].degree = degree;
    documentInfos[newTokenId].field = field;
}


/*function mint(bytes32 cid, string memory school, string memory degree, string memory field) public payable {
    require(msg.value >= mintPrice, "Amount sent is less than the minimum required");
    require(totalSupply + 1 <= maxSupply, "Max supply reached");
    uint256 newTokenId = _tokenId();
    documentMints[msg.sender]++;
    totalSupply++;
    _mint(msg.sender, newTokenId);
    documentInfos[newTokenId].cid = cid;
    documentInfos[newTokenId].school = school;
    documentInfos[newTokenId].degree = degree;
    documentInfos[newTokenId].field = field;
}

*/




function _tokenId() private view returns (uint256) {
return totalSupply + 1;
}

function withdraw() public onlyOwner {
require(withdrawAddress != address(0), "Withdraw address not set");
withdrawAddress.transfer(address(this).balance);
}

function getDocumentInfo(uint256 tokenId) public view returns (string memory, string memory, string memory, bytes32) {
return (
documentInfos[tokenId].school,
documentInfos[tokenId].degree,
documentInfos[tokenId].field,
documentInfos[tokenId].cid
);
}

function balanceOf(address account) public view override returns (uint256) {
return super.balanceOf(account);
}

function ownerOf(uint256 tokenId) public view override returns (address) {
return super._ownerOf(tokenId);
}

function getApproved(uint256 tokenId) public view override returns (address) {
return super.getApproved(tokenId);
}

function approve(address to, uint256 tokenId) public override {
super._approve(to, tokenId);
}

function transfer(address to, uint256 tokenId) public {
super._transfer(msg.sender, to, tokenId);
}

function _exists(uint256 tokenId) internal view override returns (bool) {
return super._exists(tokenId);
}

function _isApprovedOrOwner(address spender, uint256 tokenId) internal view override returns (bool) {
return super._isApprovedOrOwner(spender, tokenId);
}

}

