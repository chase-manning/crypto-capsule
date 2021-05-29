// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./utils/EnumerableSet.sol";
import "./utils/Ownable.sol";

import "./interfaces/IERC20.sol";
import "./interfaces/IERC721.sol";
import "./interfaces/IERC1155.sol";
import "./extensions/IERC20Metadata.sol";

contract CryptoCapsule is Ownable{
    using EnumerableSet for EnumerableSet.UintSet;


    // Capsule Data
    struct Capsule {
        uint256 id;
        address grantor;
        address payable beneficiary;
        uint256 distributionDate;
        uint256 periodSize;
        uint256 periodCount;
        uint256 claimedPeriods;
        uint256 createdDate;
        bool opened;
        uint256 value;
        address[] tokens;
        uint256[] amounts;
        address[] erc721s;
        uint256[][] erc721Ids;
        address[] erc1155s;
        uint256[][] erc1155Ids;
        uint256[][] erc1155Amounts;
        bool addingAssetsAllowed;
    }

    Capsule[] capsules;
    mapping (address => EnumerableSet.UintSet) private sent;
    mapping (address => EnumerableSet.UintSet) private received;


    // Constructor 
    constructor() Ownable() { }


    // Functions
    function createCapsule(
        address payable _beneficiary,
        uint256 _distributionDate,
        uint256 _periodSize,
        uint256 _periodCount,
        address[] calldata _tokens,
        uint256[] calldata _values,
        address[] calldata _erc721s,
        uint256[][] calldata _erc721Ids,
        address[] calldata _erc1155s,
        uint256[][] calldata _erc1155Ids,
        uint256[][] calldata _erc1155Amounts,
        bool addingAssetsAllowed
    ) public payable returns(Capsule memory) {
        // Require Statements
        require(_distributionDate > block.timestamp, "Distribution Date must be in future");
        require(_tokens.length == _values.length, "Tokens and Values must be same length");
        require(_periodSize >= 1, "Period Size must greater than or equal to 1");
        require(_periodCount >= 1, "Period Count must greater than or equal to 1");
        require(_erc721s.length == _erc721Ids.length, "ERC721s and ERC721 Ids must be same length"); // Test
        require(_erc1155s.length == _erc1155Ids.length, "ERC1155s and ERC1155 Ids must be same length"); // Test
        require(_erc1155s.length == _erc1155Amounts.length, "ERC1155s and ERC1155 Amounts must be same length"); // Test

        // Transferring ERC20 Tokens
        for (uint256 i = 0; i < _tokens.length; i++) {
            require(_values[i] > 0, "Token value must be greater than 0");
            IERC20 erc20Token = IERC20(_tokens[i]);
            erc20Token.transferFrom(msg.sender, address(this), _values[i]);
        }

        // Transferring ERC721 Tokens
        for (uint256 i = 0; i < _erc721s.length; i++) {
            require(_erc721Ids[i].length > 0, "ERC721 Ids must have at least one id"); // Test
            IERC721 erc721Token = IERC721(_erc721s[i]);
            for (uint256 j = 0; j < _erc721Ids[i].length; j++) {
                erc721Token.transferFrom(msg.sender, address(this), _erc721Ids[i][j]); // Test
            }
        }

        // Transferring ERC1155 Tokens
        for (uint256 i = 0; i < _erc1155s.length; i++) {
            uint256 idCount = _erc1155Ids[i].length;
            require(idCount > 0, "ERC1155 Ids must have at least one id"); // Test
            require(idCount == _erc1155Amounts[i].length, "ERC1155 Ids must have the same amount as ERC1155 Amounts"); // Test

            IERC1155 erc1155Token = IERC1155(_erc1155s[i]);
            if (idCount > 1)
                erc1155Token.safeBatchTransferFrom(msg.sender, address(this),  _erc1155Ids[i], _erc1155Amounts[i], ""); // Test
            else
                erc1155Token.safeTransferFrom(msg.sender, address(this), _erc1155Ids[i][0], _erc1155Amounts[i][0], ""); // Test
        }

        // Creating Capsule
        uint256 capsuleId = capsules.length;
        capsules.push(
            Capsule(
                capsuleId,
                msg.sender,
                _beneficiary,
                _distributionDate,
                _periodSize,
                _periodCount,
                0,
                block.timestamp,
                false,
                msg.value,
                _tokens,
                _values,
                _erc721s,
                _erc721Ids,
                _erc1155s,
                _erc1155Ids,
                _erc1155Amounts,
                addingAssetsAllowed
            )
        );
        sent[msg.sender].add(capsuleId);
        received[_beneficiary].add(capsuleId);

        // Emitting Event
        emit CapsuleCreated(capsuleId);

        // Returning Capsule
        return getCapsule(capsuleId);
    }

    function openCapsule(uint256 capsuleId) public {
        // Require Statements
        require(capsules.length > capsuleId, "Capsule does not exist");
        Capsule memory capsule = capsules[capsuleId];
        require(msg.sender == capsule.beneficiary, "You are not the beneficiary of this Capsule");
        require(!capsule.opened, "Capsule has already been opened");
        require(block.timestamp >= capsule.distributionDate, "Capsule has not matured yet");
        uint256 nextClaimDate = capsule.distributionDate + capsule.claimedPeriods * capsule.periodSize;
        require(block.timestamp >= nextClaimDate, "No periods available to claim"); 

        // Calculating Claimable Periods
        uint256 claimablePeriods = (block.timestamp - nextClaimDate) / capsule.periodSize + 1;
        uint256 unclaimedPeriods = capsule.periodCount - capsule.claimedPeriods;
        claimablePeriods = claimablePeriods > unclaimedPeriods ? unclaimedPeriods : claimablePeriods;

        // Transferring ETH
        if (capsule.value > 0) capsule.beneficiary.transfer(capsule.value * claimablePeriods / capsule.periodCount);

        // Transferring ERC20 Tokens
        for (uint256 i = 0; i < capsule.tokens.length; i++) {
            IERC20 erc20Token = IERC20(capsule.tokens[i]);
            erc20Token.transfer(capsule.beneficiary, capsule.amounts[i] * claimablePeriods / capsule.periodCount);
        }

        if (capsule.claimedPeriods == 0) { // Test
            // Transferring ERC721 Tokens
            for (uint256 i = 0; i < capsule.erc721s.length; i++) {
                IERC721 erc721Token = IERC721(capsule.erc721s[i]);
                for (uint256 j = 0; j < capsule.erc721Ids[i].length; j++) {
                    erc721Token.transferFrom(address(this), capsule.beneficiary, capsule.erc721Ids[i][j]); // Test
                }
            }

            // Transferring ERC1155 Tokens
            for (uint256 i = 0; i < capsule.erc1155s.length; i++) {
                uint256 idCount = capsule.erc1155Ids[i].length;
                IERC1155 erc1155Token = IERC1155(capsule.erc1155s[i]);
                if (idCount > 1)
                    erc1155Token.safeBatchTransferFrom(address(this), capsule.beneficiary,  capsule.erc1155Ids[i], capsule.erc1155Amounts[i], ""); // Test
                else
                    erc1155Token.safeTransferFrom(address(this), capsule.beneficiary, capsule.erc1155Ids[i][0], capsule.erc1155Amounts[i][0], ""); // Test
            }
        }

        // Updating Capsule
        capsules[capsuleId].claimedPeriods = capsule.claimedPeriods + claimablePeriods;
        capsules[capsuleId].opened = capsule.claimedPeriods + claimablePeriods == capsule.periodCount;

        // Emitting Event
        emit CapsuleOpened(capsuleId);
    }

    function addAssets(
        uint256 capsuleId,
        address[] calldata _tokens,
        uint256[] calldata _values, 
        address[] calldata _erc721s,
        uint256[][] calldata _erc721Ids,
        address[] calldata _erc1155s,
        uint256[][] calldata _erc1155Ids,
        uint256[][] calldata _erc1155Amounts
    ) public payable {
        // Require Statements
        require(capsules.length > capsuleId, "Capsule does not exist");
        require(_tokens.length == _values.length, "Tokens and Values must be same length");
        Capsule memory capsule = capsules[capsuleId];
        require(capsule.addingAssetsAllowed, "Adding assets not allowed for this Capsule");
        require(msg.sender == capsule.grantor, "You are not the grantor of this Capsule");
        require(!capsule.opened, "Capsule has already been opened");
        require(_erc721s.length == _erc721Ids.length, "ERC721s and ERC721 Ids must be same length"); // Test
        require(_erc1155s.length == _erc1155Ids.length, "ERC1155s and ERC1155 Ids must be same length"); // Test
        require(_erc1155s.length == _erc1155Amounts.length, "ERC1155s and ERC1155 Amounts must be same length"); // Test

        // Adding ERC20 Tokens
        for (uint256 i = 0; i < _tokens.length; i++) {
            require(_values[i] > 0, "Token value must be greater than 0");
            IERC20 erc20Token = IERC20(_tokens[i]);
            erc20Token.transferFrom(msg.sender, address(this), _values[i]);

            bool tokenExists = false;
            for (uint256 j = 0; j < capsule.tokens.length; j++) {
                if (capsule.tokens[j] == _tokens[i]) {
                    capsules[capsuleId].amounts[j] += _values[i];
                    tokenExists = true;
                    break;
                }
            }
            if (!tokenExists) {
                capsules[capsuleId].tokens.push(_tokens[i]);
                capsules[capsuleId].amounts.push(_values[i]);
            }
        }

        // Transferring ERC721 Tokens
        for (uint256 i = 0; i < _erc721s.length; i++) {
            require(_erc721Ids[i].length > 0, "ERC721 Ids must have at least one id"); // Test
            IERC721 erc721Token = IERC721(_erc721s[i]);
            for (uint256 j = 0; j < _erc721Ids[i].length; j++) {
                erc721Token.transferFrom(msg.sender, address(this), _erc721Ids[i][j]); // Test
            }

            bool tokenExists = false;
            for (uint256 j = 0; j < capsule.erc721s.length; j++) {
                if (capsule.erc721s[j] == _erc721s[i]) {
                    for (uint256 k = 0; k < _erc721Ids[i].length; k++) {
                        capsules[capsuleId].erc721Ids[j].push(_erc721Ids[i][k]); // Test
                    }
                    tokenExists = true;
                    break;
                }
            }
            if (!tokenExists) {
                capsules[capsuleId].erc721s.push(_erc721s[i]); // Test
                capsules[capsuleId].erc721Ids.push(_erc721Ids[i]); // Test
            }
        }

        // Transferring ERC1155 Tokens
        for (uint256 i = 0; i < _erc1155s.length; i++) {
            uint256 idCount = _erc1155Ids[i].length;
            require(idCount > 0, "ERC1155 Ids must have at least one id"); // Test
            require(idCount == _erc1155Amounts[i].length, "ERC1155 Ids must have the same amount as ERC1155 Amounts"); // Test

            IERC1155 erc1155Token = IERC1155(_erc1155s[i]);
            if (idCount > 1)
                erc1155Token.safeBatchTransferFrom(msg.sender, address(this),  _erc1155Ids[i], _erc1155Amounts[i], ""); // Test
            else
                erc1155Token.safeTransferFrom(msg.sender, address(this), _erc1155Ids[i][0], _erc1155Amounts[i][0], ""); // Test
            

            bool tokenExists = false;
            for (uint256 j = 0; j < capsule.erc1155s.length; j++) {
                if (capsule.erc1155s[j] == _erc1155s[i]) {
                    for (uint256 k = 0; k < _erc1155Ids[i].length; k++) {
                        bool tokenIdExists = false;
                        for (uint256 l = 0; l < capsule.erc1155Ids[j].length; l++) {
                            if (capsule.erc1155Ids[j][l] == _erc1155Ids[i][k]) {
                                capsules[capsuleId].erc1155Amounts[j][l] += _erc1155Amounts[i][k]; // Test
                                tokenIdExists = true;
                                break;
                            }
                        }
                        if (!tokenIdExists) {
                            capsules[capsuleId].erc1155Ids[j].push(_erc1155Ids[i][k]); // Test
                            capsules[capsuleId].erc1155Amounts[j].push(_erc1155Amounts[i][k]); // Test
                        }
                    }

                    tokenExists = true;
                    break;
                }
            }
            if (!tokenExists) {
                capsules[capsuleId].erc1155s.push(_erc1155s[i]); // Test
                capsules[capsuleId].erc1155Ids.push(_erc1155Ids[i]); // Test
                capsules[capsuleId].erc1155Amounts.push(_erc1155Amounts[i]); // Test
            }
        }

        // Adding ETH
        capsules[capsuleId].value += msg.value; 

        // Emitting Event
        emit AddedAssets(capsuleId, _tokens, _values, msg.value);
    }


    // Views
    function getCapsuleCount() public view returns(uint256) {
        return capsules.length;
    }
    
    function getCapsule(uint256 capsuleId) public view returns(Capsule memory) {
        require(capsules.length > capsuleId, "Capsule does not exist");
        return capsules[capsuleId];
    }

    function getCapsules() public view returns(Capsule[] memory) {
        return capsules;
    }

    function getSentCapsules(address grantor) public view returns(Capsule[] memory) {
        uint256 count = sent[grantor].length();
        Capsule[] memory _capsules = new Capsule[](count);
        for (uint256 i = 0; i < count; i++) {
            _capsules[i] = capsules[sent[grantor].at(i)];
        }
        return _capsules;
    }

    function getReceivedCapsules(address beneficiary) public view returns(Capsule[] memory) {
        uint256 count = received[beneficiary].length();
        Capsule[] memory _capsules = new Capsule[](count);
        for (uint256 i = 0; i < count; i++) {
            _capsules[i] = capsules[received[beneficiary].at(i)];
        }
        return _capsules;
    }


    // Events
    event CapsuleOpened(uint256 capsuleId);
    event CapsuleCreated(uint256 capsuleId);
    event AddedAssets(uint256 capsuleId, address[] tokens, uint256[] values, uint256 eth);
}
