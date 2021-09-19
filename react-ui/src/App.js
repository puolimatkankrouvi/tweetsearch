import React, { Component } from 'react';
import './App.css';
import "primeflex/primeflex.css";
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import Header from './Header.js';
import SearchTab from './SearchTab/SearchTab';
import SearchHistoryTab from "./SearchHistoryTab/SearchHistoryTab";

import { Route, HashRouter } from "react-router-dom";

class App extends Component {
  render() {
    return (
    <div className="App">       
      <HashRouter>     
        <Header />    
        <Route exact path="/" component={SearchTab} />
        <Route path="/saved" component={SearchHistoryTab} />
      </HashRouter>
    </div> 
    )
  }
}

export default App;
