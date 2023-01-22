pragma solidity ^0.8.0;
// SPDX-License-Identifier: MIT

contract SchoolDegrees {
    struct DegreeInfo {
        string school;
        string degree;
        string field;
        string cid;
    }
    mapping(uint256 => DegreeInfo) public degreeInfo;
    string public name;
    string public symbol;
    mapping(address => mapping(uint256 => bool)) private _ownedTokens;
    mapping(address => mapping(uint256 => bool)) private _approvedTokens;
    address public owner;
    bool public paused;

    event Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId);
    event Approval(address indexed _owner, address indexed _approved, uint256 indexed _tokenId);
    event Mint(address indexed _to, uint256 indexed _tokenId);
    event Pause();
    event Unpause();
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    mapping(address => uint256) public balanceOfSBT;
    uint amount= 1 ether;

    constructor() {
        owner = msg.sender;
        name = "School Degree";
        symbol = "DEG";
    }

    modifier onlyOwner {
        require(owner == msg.sender, "You are not the owner");
        _;
    }

    modifier onlyWhenNotPaused {
        require(!paused, "The contract is paused");
        _;
    }

    modifier cost(uint amount) {
        require(msg.value >= amount, "Not enough ETH provided");
        _;
    }
    
    function createDegree(uint256 _tokenId, string memory _degree, string memory _school, string memory _year, string memory _cid) payable public onlyOwner cost(1 ether) onlyWhenNotPaused {
        require(_ownedTokens[msg.sender][_tokenId] == false, "Token ID already exists.");
        _ownedTokens[msg.sender][_tokenId] = true;
        DegreeInfo memory newDegreeInfo = DegreeInfo({school: _school, degree: _degree, field: _year, cid:_cid});
        degreeInfo[_tokenId] = newDegreeInfo;
        balanceOfSBT[msg.sender] += 1;
        emit Mint(msg.sender, _tokenId);
    }

    function updateDegreeInfo(uint256 _tokenId, string memory _degree, string memory _school, string memory _year, string memory _cid) public onlyOwner onlyWhenNotPaused {
        require(_ownedTokens[msg.sender][_tokenId], "You are not the owner of this token.");
        DegreeInfo memory newDegreeInfo = DegreeInfo({school: _school, degree: _degree, field: _year, cid:_cid});
        degreeInfo[_tokenId] = newDegreeInfo;
    }

    function transferDegree(address _to, uint256 _tokenId) public onlyOwner onlyWhenNotPaused {
        require(_ownedTokens[msg.sender][_tokenId], "You are not the owner of this token.");
        require(_to != address(0), "Cannot transfer to address 0");
        _ownedTokens[_to][_tokenId] = true;
        _ownedTokens[msg.sender][_tokenId] = false;
        emit Transfer(msg.sender, _to, _tokenId);
        balanceOfSBT[msg.sender] -= 1;
        balanceOfSBT[_to] += 1;
    }

    function getDegreeInfo(uint256 _tokenId) public view returns (string memory, string memory, string memory) {
        return (degreeInfo[_tokenId].degree, degreeInfo[_tokenId].school, degreeInfo[_tokenId].field);
    }

    function getDegreeCID(uint256 _tokenId) public view returns (string memory) {
        return (degreeInfo[_tokenId].cid);
    }

    function approve(address _approved, uint256 _tokenId) public onlyOwner onlyWhenNotPaused {
        require(_ownedTokens[msg.sender][_tokenId], "You are not the owner of this token.");
        _approvedTokens[msg.sender][_tokenId] = true;
        emit Approval(msg.sender, _approved, _tokenId);
    }

    function revokeApproval(uint256 _tokenId) public onlyOwner onlyWhenNotPaused {
        require(_approvedTokens[msg.sender][_tokenId], "This token is not approved for this address.");
        _approvedTokens[msg.sender][_tokenId] = false;
    }

    function pause() public onlyOwner {
        paused = true;
        emit Pause();
    }

    function unpause() public onlyOwner {
        paused = false;
        emit Unpause();
    }

    function transferOwnership(address newOwner) public onlyOwner {
        require(newOwner != address(0), "Cannot transfer ownership to address 0");
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
    }

}
