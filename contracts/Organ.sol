pragma solidity ^0.4.21;

import "./zeppelin/ERC721/ERC721Token.sol";
import "./zeppelin/rbac/RBACWithAdmin.sol";
import "./zeppelin/Ownable.sol";
import "./zeppelin/SafeMath.sol";

contract Organ is ERC721Token, RBACWithAdmin, Ownable {

    string public constant ROLE_SIGNER = "signer";
    string public constant ROLE_OPO = "opo";

    struct Signatures {
        bool submitted;
        bool[3] signatures;
        bool finished;
        uint256 sigsCollected;
    }

    struct MetaData {
        address donor;
        bytes32 bloodType;
        uint256 size;
        uint256 averageTemperature;
        address recipient;
        uint256 expiration;
        bool delivered;
    }

    mapping (uint256 => Signatures) pendingSubmissions;
    mapping (uint256 => bool) createdOrgans;
    mapping (uint256 => MetaData) public tokenIdToMetaData;
    mapping (address => uint256[]) internal approvedTokens;
    mapping (uint256 => uint256) internal approvedTokensIndex;

    uint256 public totalSubmissions;

    event Submission(address indexed submitter, uint256 indexed id, uint256 timestamp);
    event Sign(address indexed signer, uint256 indexed id, uint256 numSignature);
    event SubmissionFinished(uint256 indexed id);
    event OrganMinted(address indexed minter, uint256 indexed id, address indexed recipient, uint256 timestamp, uint256 expiration);
    event Delivered(address indexed recipient, uint256 indexed id, uint256 timestamp);

    constructor() ERC721Token("Organ", "ORGAN") public {}

    function addSigner(address _signer) onlyAdmin public {
        adminAddRole(_signer, ROLE_SIGNER);
    }

    function addOpo(address _opo) onlyAdmin public {
        adminAddRole(_opo, ROLE_OPO);
    }

    function submitOrgan(address _donor, bytes32 _bloodType, uint256 _size) onlyRole(ROLE_OPO) public {
        uint256 id = totalSubmissions;

        pendingSubmissions[id].submitted = true;
        pendingSubmissions[id].sigsCollected = 0;
        tokenIdToMetaData[id].donor = _donor;
        tokenIdToMetaData[id].bloodType = _bloodType;
        tokenIdToMetaData[id].size = _size;
        emit Submission(msg.sender, id, block.timestamp);

        totalSubmissions++;
    }

    function signSubmission(uint256 _id) onlyRole(ROLE_SIGNER) public {
        require(pendingSubmissions[_id].submitted == true && pendingSubmissions[_id].finished == false);

        Signatures storage signature = pendingSubmissions[_id];

        uint256 numSignature = signature.sigsCollected;
        signature.signatures[numSignature] = true;
        emit Sign(msg.sender, _id, numSignature++);

        signature.sigsCollected++;
        numSignature = signature.sigsCollected;
        if(numSignature == 1) {
            signature.finished = true;
            emit SubmissionFinished(_id);
        }
    }

    function mintOrgan(uint256 _id, address _recipient, uint256 _expiration) onlyRole(ROLE_OPO) public {
        require(pendingSubmissions[_id].finished && !createdOrgans[_id]);

        _mint(msg.sender, _id);

        tokenIdToMetaData[_id].recipient = _recipient;
        tokenIdToMetaData[_id].expiration = _expiration;

        emit OrganMinted(msg.sender, _id, _recipient, block.timestamp, _expiration);
    }

    function tokenOfApprovalByIndex(address _owner, uint256 _index) public view returns (uint256) {
        require(_index < approvedTokens[_owner].length);
        return approvedTokens[_owner][_index];
    }

    function approve(address _to, uint256 _tokenId) public {
        super.approve(_to, _tokenId);
        addTokenToApproval(_to, _tokenId);
    }

    function _transferFrom(address _from, address _to, uint256 _tokenId, uint256 _averageTemperature) public {
        super.transferFrom(_from, _to, _tokenId);
        removeTokenFromApproval(_to, _tokenId);

        tokenIdToMetaData[_tokenId].averageTemperature = _averageTemperature;

        if(msg.sender == tokenIdToMetaData[_tokenId].recipient) {
            tokenIdToMetaData[_tokenId].delivered = true;
            emit Delivered(_to, _tokenId, block.timestamp);
        }

    }

    function getMetaData(uint256 _id) public view returns(address,
                                                          bytes32,
                                                          uint256,
                                                          uint256,
                                                          address,
                                                          uint256,
                                                          bool) {
        MetaData storage metadata = tokenIdToMetaData[_id];

        return(
            metadata.donor,
            metadata.bloodType,
            metadata.size,
            metadata.averageTemperature,
            metadata.recipient,
            metadata.expiration,
            metadata.delivered
        );

    }

    function addTokenToApproval(address _to, uint256 _tokenId) internal {
        uint256 length = approvedTokens[_to].length;
        approvedTokens[_to].push(_tokenId);
        approvedTokensIndex[_tokenId] = length;
    }

    function removeTokenFromApproval(address _from, uint256 _tokenId) internal {
        uint256 tokenIndex = approvedTokensIndex[_tokenId];
        uint256 lastTokenIndex = approvedTokens[_from].length.sub(1);
        uint256 lastToken = approvedTokens[_from][lastTokenIndex];

        approvedTokens[_from][tokenIndex] = lastToken;
        approvedTokens[_from][lastTokenIndex] = 0;
        // Note that this will handle single-element arrays. In that case, both tokenIndex and lastTokenIndex are going to
        // be zero. Then we can make sure that we will remove _tokenId from the ownedTokens list since we are first swapping
        // the lastToken to the first position, and then dropping the element placed in the last position of the list

        approvedTokens[_from].length--;
        approvedTokensIndex[_tokenId] = 0;
        approvedTokensIndex[lastToken] = tokenIndex;
    }
}