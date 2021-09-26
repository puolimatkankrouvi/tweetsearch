import React, { Component, Suspense } from 'react';
import './App.css';
import "primeflex/primeflex.css";
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import Header from './Header.js';
const SearchTab = React.lazy(() => import('./SearchTab/SearchTab'));
const SearchHistoryTab = React.lazy(() => import('./SearchHistoryTab/SearchHistoryTab'));
import LoadingIndicator from "./LoadingIndicator";

import { HashRouter, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
    <div className="App">       
      <HashRouter>     
        <Header />
        <Suspense  fallback={<LoadingIndicator />}>    
          <Route exact path="/" component={SearchTab} />
          <Route path="/saved" component={SearchHistoryTab} />
        </Suspense>
      </HashRouter>
    </div> 
    )
  }
}

export default App;
