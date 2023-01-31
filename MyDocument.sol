// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
//import '/Users/josephdelgiorgio/SBTD/artifacts/contracts/MyDegree.sol/MyDegree.json'
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";

contract MyDegree is Initializable, ERC721Upgradeable, OwnableUpgradeable {
    using CountersUpgradeable for CountersUpgradeable.Counter;
    uint256 public mintPrice;
    uint256 public totalSupply;
    uint256 public maxSupply;
    string internal baseTokenUri;
    address payable public withdrawAccount;
    mapping(address=>uint256) public documentMints;

    struct documentInfo {
        string school;
        string degree;
        string field;
        string cid;
    }

    CountersUpgradeable.Counter private _tokenIdCounter;
    
    constructor() {
        _disableInitializers();
        totalSupply= 0;
        maxSupply= 10000;
        mintPrice= 0.01 ether; //10000000000000000 wei
    }

    function setBaseTokenUri(string calldata baseTokenUri_) external onlyOwner{
        baseTokenUri= baseTokenUri_;
    }

    function tokenUri(uint256 tokenId_) public view returns (string memory){
        require(_exists(tokenId_), "Token is not valid");
        return string(abi.encodePacked(baseTokenUri, Strings.toString(tokenId_), "/Users/josephdelgiorgio/SBTD/my-app/src/MyDegree.json"));
    }

    function initialize() initializer public {
        __ERC721_init("MyDocument", "MDT");
        __Ownable_init();
    }

    function safeMint(address to, uint256 quantity_) payable public{
        require(msg.value == mintPrice, "Incorrect payment amount, 0.01 ETH required");
        require(totalSupply <= maxSupply, "No more Document Minting available");
        for(uint256 i =0; i < quantity_; i++){
            uint256 newTokenId = totalSupply +1;
            _tokenIdCounter.increment();
            _safeMint(to, newTokenId);
        }
    }


    function withdraw() external onlyOwner{
        address withdrawAccount = 0x203EaDa017F04475193596A329017E926E3DAfe9;
        withdrawAccount.call{ value: address(this).balance}('');
    }

}

