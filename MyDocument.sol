// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
//import '/Users/josephdelgiorgio/SBTD/artifacts/contracts/MyDegree.sol/MyDegree.json'

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";

contract MyDegree is Initializable, ERC721Upgradeable, OwnableUpgradeable {
    using CountersUpgradeable for CountersUpgradeable.Counter;
    struct DegreeInfo {
        string school;
        string degree;
        string field;
        string cid;
    }
    mapping(uint256 => DegreeInfo) public degreeInfo;

    CountersUpgradeable.Counter private _tokenIdCounter;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize() initializer public {
        __ERC721_init("MyDegree", "MDG");
        __Ownable_init();
    }

    function safeMint(address to) payable public{
        require(msg.value == 0.5 ether, "Incorrect payment amount");
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }


    function withdrawNFTRevenue(uint _amount) public{
        payable (msg.sender).transfer(_amount);
    }
}

