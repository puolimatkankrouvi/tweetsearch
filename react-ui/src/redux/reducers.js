import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	text: "",
	searchResult: null,
	tweetsLoading: false,
	tweetLoadProgress: 0,
    searchResultErrorMessage: null,
	saveSearchDialogOpen: false,
};

const searchTabSlice = createSlice({
	name: 'searchTab',
	initialState: initialState,
	reducers: {
		changeText(state, action) {
			state.text = action.payload;
		},
		searchToState(state, action) {
			state.searchResult = action.payload;
			state.searchResultErrorMessage = null;
		},
		setTweetsLoading(state, action) {
			state.tweetsLoading = action.payload;
		},
		setTweetLoadProgress(state, action) {
			state.tweetLoadProgress = action.payload;
		},
		setSearchErrorMessage(state, action) {
			state.searchResultErrorMessage = action.payload;
		},
		setSaveSearchDialogOpen(state, action) {
			state.saveSearchDialogOpen = action.payload;
		}
	}
})

export const {
	changeText,
	searchToState,
	setSearchErrorMessage,
	setTweetsLoading,
	setTweetLoadProgress,
	setSaveSearchDialogOpen,
} = searchTabSlice.actions;

export default searchTabSlice.reducer;
