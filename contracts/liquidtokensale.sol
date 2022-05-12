// SPDX License Identifier: MIT

pragma solidity ^0.8.0;

import "./crowdsale.sol";

contract LiquidTokenSale is Crowdsale {

    constructor (uint256 _rate, address payable _wallet, IERC20 _token) 
        Crowdsale (_rate, _wallet, _token)
    {}

}
