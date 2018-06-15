import React, { Component } from 'react';
import SimpleStorageContract from './contracts/SimpleStorage.json';
import getWeb3 from './utils/getWeb3';

import './css/oswald.css';
import './css/open-sans.css';
import './css/pure-min.css';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      storageValue: 0,
      web3: null,
      formValue: ''
    };
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
      .then(results => {
        this.setState(
          {
            web3: results.web3
          },
          () => this.instantiateContract()
        );
      })
      .catch(() => {
        console.log('Error finding web3.');
      });
  }

  async instantiateContract() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

    const contract = require('truffle-contract');
    const simpleStorage = contract(SimpleStorageContract);
    simpleStorage.setProvider(this.state.web3.currentProvider);

    // Get accounts.
    const accounts = await this.state.web3.eth.getAccounts();
    console.log('∆∆∆ accounts', accounts);

    const instance = await simpleStorage.deployed();

    // Get the value from the contract to prove it worked.
    const result = await instance.get.call(accounts[0]);

    // Update state with the result.
    return this.setState({ storageValue: result.c[0] });
  }

  handleSubmit = async e => {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

    e.preventDefault();

    const contract = require('truffle-contract');
    const simpleStorage = contract(SimpleStorageContract);
    simpleStorage.setProvider(this.state.web3.currentProvider);

    // Declaring this for later so we can chain functions on SimpleStorage.
    // var simpleStorageInstance;

    // Get accounts.
    const accounts = await this.state.web3.eth.getAccounts();

    const instance = await simpleStorage.deployed();

    // Stores a given value, 5 by default.
    await instance.set(this.state.formValue, { from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const newResult = await instance.get.call(accounts[0]);

    // Update state with the result.
    return this.setState({ storageValue: newResult.c[0] });
  };

  render() {
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
          <a href="#" className="pure-menu-heading pure-menu-link">
            Truffle Box
          </a>
        </nav>

        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <h1>Good to Go!</h1>
              <p>Your Truffle Box is installed and ready.</p>
              <h2>Smart Contract Example</h2>

              <form onSubmit={e => this.handleSubmit(e)}>
                <input
                  type="number"
                  value={this.state.formValue}
                  onChange={e => this.setState({ formValue: e.target.value })}
                />
                <button type="submit">change value</button>
              </form>

              <p>The stored value is: {this.state.storageValue}</p>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
