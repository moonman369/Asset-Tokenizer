import React, { Component } from "react";

import LiquidToken from "./contracts/LiquidToken.json";
import LiquidTokenSale from "./contracts/LiquidTokenSale.json";
import LiquidTokenKYC from "./contracts/LiquidTokenKYC.json";

import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = { loaded: false, kycAddress: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      this.web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      this.accounts = await this.web3.eth.getAccounts();

      // Get the contract instance.
      this.networkId = await this.web3.eth.net.getId();

      this.LiquidToken = new this.web3.eth.Contract(
        LiquidToken.abi,
        LiquidToken.networks[this.networkId] &&
          LiquidToken.networks[this.networkId].address
      );

      this.LiquidTokenKYC = new this.web3.eth.Contract(
        LiquidTokenKYC.abi,
        LiquidTokenKYC.networks[this.networkId] &&
          LiquidTokenKYC.networks[this.networkId].address
      );

      this.LiquidTokenSale = new this.web3.eth.Contract(
        LiquidTokenSale.abi,
        LiquidTokenSale.networks[this.networkId] &&
          LiquidTokenSale.networks[this.networkId].address
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ loaded: true }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  };

  render() {
    if (!this.state.loaded) return <div>Loading Web3 and Accounts.</div>;
    return (
      <div className="App">
        <h1>Liquid Token (LQD) Crowdsale</h1>
        <h2>Whitelisting</h2>
        <p>
          Enter your Ethereum Wallet Address in the dialog box below to complete
          your KYC process
        </p>
        <div>
          Enter address:{" "}
          <input
            type="text"
            placeholder="Wallet Address Here"
            name="kycAddress"
            value={this.state.kycAddress}
            onChange={this.handleInputChange}
          />
        </div>
      </div>
    );
  }
}

export default App;
