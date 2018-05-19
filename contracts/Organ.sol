pragma solidity ^0.4.23;

import "./zeppelin/ERC721/ERC721Token.sol";
import "./zeppelin/rbac/RBACWithAdmin.sol";
import "./zeppelin/Pausable.sol";
import "./zeppelin/SafeMath.sol";

contract Organ is ERC721Token, RBACWithAdmin, Pausable {

    string public constant ROLE_SIGNER = "signer";
    string public constant ROLE_OPO = "opo";

    struct Signatures {
        bool submitted;
        bool[3] signatures;
        bool finished;
    }

    struct MetaData {
        address donor;
        address recipient;
        uint256 expiration;
        bool delivered;
    }

    mapping (uint256 => Signatures) pendingSubmissions;
    mapping (uint256 => bool) createdOrgans;
    mapping (uint256 => MetaData) tokenIdToMetaData;

    uint256 totalSubmissions;

    event Submission(address indexed submitter, uint256 indexed id, uint256 timestamp);
    event Sign(address indexed signer, uint256 indexed id, uint256 numSignature);
    event SubmissionFinished(uint256 indexed id);
    event OrganMinted(address indexed minter, uint256 indexed id, address indexed recipient, uint256 timestamp, uint256 expiration);

    //constructor() public {}

    function addSigner(address _signer) onlyAdmin public {
        adminAddRole(_signer, ROLE_SIGNER);
    }

    function addOpo(address _opo) onlyAdmin public {
        adminAddRole(_opo, ROLE_OPO);
    }

    function submitOrgan() onlyRole(ROLE_OPO) public {
        uint256 id = totalSubmissions;

        pendingSubmissions[id].submitted = true;
        emit Submission(msg.sender, id, block.timestamp);

        totalSubmissions++;
    }

    function signSubmission(uint256 _id) onlyRole(ROLE_SIGNER) public {
        require(pendingSubmissions[_id].submitted && !pendingSubmissions[_id].finished);

        uint256 numSignature = pendingSubmissions[_id].signatures.length;
        pendingSubmissions[_id].signatures[numSignature] = true;
        emit Sign(msg.sender, _id, numSignature.add(1));

        numSignature = pendingSubmissions[_id].signatures.length;
        if(numSignature == 3) {
            pendingSubmissions[_id].finished = true;
            emit SubmissionFinished(_id);
        }
    }

    function mintOrgan(uint256 _id, address _donor, address _recipient, uint256 _expiration) onlyRole(ROLE_OPO) public {
        require(pendingSubmissions[_id].finished && !createdOrgans[_id]);

        _mint(msg.sender, _id);

        tokenIdToMetaData[_id].donor = _donor;
        tokenIdToMetaData[_id].recipient = _recipient;
        tokenIdToMetaData[_id].expiration = _expiration;

        emit OrganMinted(msg.sender, _id, _recipient, block.timestamp, _expiration);
    }


    function transferFrom(address _from, address _to, uint256 _tokenId) public {
        super.transferFrom(_from, _to, _tokenId);

        if(msg.sender == tokenIdToMetaData[_tokenId].recipient) {
            tokenIdToMetaData[_tokenId].delivered = true;
        }
    } 
}