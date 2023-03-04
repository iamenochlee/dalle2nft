// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFT is Ownable, ERC721, ERC721URIStorage {
    using Counters for Counters.Counter;

    mapping(string => bool) private existingURI;
    Counters.Counter private _tokenIdCounter;
    event Mint(address to, uint id, string uri);

    constructor(
        string memory name,
        string memory symbol
    ) ERC721(name, symbol) {}

    function safeMint(address to, string calldata uri) public onlyOwner {
        require(!existingURI[uri], "URI: Token URI already exists");
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        existingURI[uri] = true;
        emit Mint(to, tokenId, uri);
    }

    function bulkMint(address to, string[] calldata uris) public onlyOwner {
        for (uint i = 0; i < uris.length; i++) {
            safeMint(to, uris[i]);
        }
    }

    function _burn(
        uint256 tokenId
    ) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function count() public view returns (uint) {
        return _tokenIdCounter.current();
    }
}
