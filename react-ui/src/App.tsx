import React, { Suspense } from "react";
import "./App.css";
import "primeflex/primeflex.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import Header from "./Header";
const SearchTab = React.lazy(() => import("./SearchTab/SearchTab"));
const SearchHistoryTab = React.lazy(() => import("./SearchHistoryTab/SearchHistoryTab"));
import LoadingIndicator from "./LoadingIndicator";

import { HashRouter, Route, Routes } from "react-router-dom";

function App() {
	return (
		<div className="App">
			<HashRouter>
				<Header />
				<Suspense fallback={<LoadingIndicator />}>
					<Routes>
						<Route path="/" element={<SearchTab />}></Route>
						<Route path="/saved" element={<SearchHistoryTab />} />
					</Routes>
				</Suspense>
			</HashRouter>
		</div>
	);
}

export default App;