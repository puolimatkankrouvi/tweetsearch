import App from "./App";
import "./index.css";
import { configureStore } from "@reduxjs/toolkit";
import { createRoot } from "react-dom/client";

import { Provider } from "react-redux";
import searchReducer from "./redux/reducers";

export const store = configureStore({
	reducer: {
		searchTab: searchReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
	<Provider store={store}>
		<App />
	</Provider>
);