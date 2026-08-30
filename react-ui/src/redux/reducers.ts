import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RawSearchResult } from "../types";

interface SearchTabState {
	text: string;
	searchResult: RawSearchResult | null;
	tweetsLoading: boolean;
	searchResultErrorMessage: string | null;
	saveSearchDialogOpen: boolean;
}

const initialState: SearchTabState = {
	text: "",
	searchResult: null,
	tweetsLoading: false,
	searchResultErrorMessage: null,
	saveSearchDialogOpen: false,
};

const searchTabSlice = createSlice({
	name: "searchTab",
	initialState,
	reducers: {
		changeText(state, action: PayloadAction<string>) {
			state.text = action.payload;
		},
		searchToState(state, action: PayloadAction<any>) {
			state.searchResult = action.payload;
			state.searchResultErrorMessage = null;
		},
		setTweetsLoading(state, action: PayloadAction<boolean>) {
			state.tweetsLoading = action.payload;
		},
		setSearchErrorMessage(state, action: PayloadAction<string | null>) {
			state.searchResultErrorMessage = action.payload;
		},
		setSaveSearchDialogOpen(state, action: PayloadAction<boolean>) {
			state.saveSearchDialogOpen = action.payload;
		},
	},
});

export interface RootState {
	searchTab: SearchTabState;
}

export const {
	changeText,
	searchToState,
	setSearchErrorMessage,
	setTweetsLoading,
	setSaveSearchDialogOpen,
} = searchTabSlice.actions;

export default searchTabSlice.reducer;