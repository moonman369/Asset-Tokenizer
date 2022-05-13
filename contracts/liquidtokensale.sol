// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./crowdsale.sol";
import "./liquidtokenkyc.sol";

contract LiquidTokenSale is Crowdsale {

    LiquidTokenKYC kyc;

    constructor (uint256 _rate, address payable _wallet, IERC20 _token, LiquidTokenKYC _kyc) 
        Crowdsale (_rate, _wallet, _token)
    {
        kyc = LiquidTokenKYC( _kyc);
    }

    function _preValidatePurchase(address beneficiary, uint256 weiAmount) internal view override {
        super._preValidatePurchase(beneficiary, weiAmount);
        require (kyc.getKYCStatus(msg.sender) == true, "LiquidTokenKYC: Incomplete KYC. Token purchase not allowed" );
    }

}
