import React, { Component } from "react";

import LiquidToken from "./contracts/LiquidToken.json";
import LiquidTokenSale from "./contracts/LiquidTokenSale.json";
import LiquidTokenKYC from "./contracts/LiquidTokenKYC.json";

import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = {};

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      this.web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      this.accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      this.networkId = await web3.eth.net.getId();
      this.LiquidToken = new web3.eth.Contract(
        LiquidToken.abi,
        LiquidToken.networks[this.networkId] &&
          LiquidToken.networks[this.networkId].address
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({}, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Good to Go!</h1>
        <p>Your Truffle Box is installed and ready.</p>
        <h2>Smart Contract Example</h2>
        <p>
          If your contracts compiled and migrated successfully, below will show
          a stored value of 5 (by default).
        </p>
        <p>
          Try changing the value stored on <strong>line 42</strong> of App.js.
        </p>
        <div>The stored value is: {this.state.storageValue}</div>
      </div>
    );
  }
}

export default App;
