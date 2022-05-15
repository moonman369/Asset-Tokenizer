// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract LiquidTokenKYC is Ownable {

    mapping (address => bool) allowed;

    modifier notWhitelisted (address _addr) {
        require (!allowed[_addr], "LiquidTokenKYC: This address is already whitelisted.");
        _;
    }

    modifier whitelisted (address _addr) {
        require (allowed[_addr], "LiquidTokenKYC: This address is not whitelisted.");
        _;
    }

    function approveKYC (address _addr) public onlyOwner notWhitelisted (_addr) {
        allowed[_addr] = true;
    }

    function revokeKYC (address _addr) public onlyOwner whitelisted (_addr) {
        allowed[_addr] = false;
    }

    function getKYCStatus (address _addr) public view returns (bool) {
        return allowed[_addr];
    }

}