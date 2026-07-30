import React, { Component, Suspense } from 'react';
import './App.css';
import "primeflex/primeflex.css";
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import Header from './Header.jsx';
const SearchTab = React.lazy(() => import('./SearchTab/SearchTab.jsx'));
const SearchHistoryTab = React.lazy(() => import('./SearchHistoryTab/SearchHistoryTab.jsx'));
import LoadingIndicator from "./LoadingIndicator.jsx";

import { HashRouter, Route, Routes } from "react-router-dom";

class App extends Component {
  render() {
    return (
    <div className="App">       
      <HashRouter>     
        <Header />
        <Suspense  fallback={<LoadingIndicator />}>
          <Routes>
            <Route exact path="/" element={<SearchTab />}>
            </Route>
            <Route path="/saved" element={<SearchHistoryTab />} />
          </Routes>    
        </Suspense>
      </HashRouter>
    </div> 
    )
  }
}

export default App;
