// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract LiquidToken is ERC20 {
     constructor (uint256 _initialSupply) ERC20 ("Liquid Token", "LQD") {
         _mint (_msgSender(), _initialSupply * decimals());
     }
}