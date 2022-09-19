// SPDX-License-Identifier: MIT
// deployed on polygon testnet: 0x74Fd20EA4C0D0250dCA622df7638aFde0Cb96463
pragma solidity ^0.8.1;

import 'github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Counters.sol';
import 'github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import 'github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol';

contract NFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721('NonFungibleTalent', 'NFT') {}

    function createToken(string memory tokenURI) public returns (uint256) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        return newItemId;
    }
}
