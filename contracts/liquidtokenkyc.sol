// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract LiquidTokenKYC is Ownable {

    mapping (address => bool) allowed;

    function completeKYC (address _addr) public onlyOwner {
        allowed[_addr] = true;
    }

    function revokeKYC (address _addr) public onlyOwner {
        allowed[_addr] = false;
    }

    function getKYCStatus (address _addr) public view returns (bool) {
        return allowed[_addr];
    }

}