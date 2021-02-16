import React from 'react';
import { Router } from "@reach/router";
import './App.scss';

import Nav from './components/Nav.jsx';
import Landing from './components/Landing.jsx';
import Web3 from './components/Web3.jsx';
import Admin from './components/Admin/Admin.jsx';
import Sale from './components/Sale/Sale.jsx';

function App() {
  return (
    <div className="app">
      <Nav />
      <Router>
        <Landing path="/" />
        <Web3 path="app" >
          <Sale path="sale" />
          <Admin path="admin" />
        </Web3>
      </Router>
    </div>
  );
}

export default App;