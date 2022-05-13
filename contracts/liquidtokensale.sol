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

    function _preValidatePurchase(address _beneficiary, uint256 weiAmount) internal view override {
        require (kyc.getKYCStatus(_msgSender()) == true, "LiquidTokenKYC: Incomplete KYC. Token purchase not allowed" );
        super._preValidatePurchase(_beneficiary, weiAmount);
    }

}
