// SPDX-License-Identifier: MIT
// deployed on BSC testnet: 0x1977b8F6c789CbC7AF2bd066842F0fC47Fa583d3
// deployed on Polygon Testnet: 0x9A0B2F1EbAE0217BeAACc09c2ACA0A96184d65CCs
pragma solidity ^0.8.7;

contract PODS {
    event PodCreated(
        bytes32 indexed podId,
        address indexed podOwner,
        address[] podMates,
        bytes32 contentId
    );

    struct Pod {
        address owner;
        bytes32 contentId;
        address[] podMates;
    }

    mapping(bytes32 => Pod) podRegistry;

    function createPod(
        string calldata _contentUri,
        address[] calldata _podMates
    ) external {
        address _owner = msg.sender;
        bytes32 _contentId = keccak256(abi.encode(_contentUri));
        bytes32 _podID = keccak256(
            abi.encodePacked(_owner, block.timestamp, _contentId)
        );

        podRegistry[_podID].owner = _owner;
        podRegistry[_podID].contentId = _contentId;
        podRegistry[_podID].podMates = _podMates;
        emit PodCreated(_podID, _owner, _podMates, _contentId);
    }
}
