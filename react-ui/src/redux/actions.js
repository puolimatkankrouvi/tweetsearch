/* Action types */
export const CHANGE_TEXT = 'CHANGE_TEXT';
export const SET_SEARCHRESULT = 'SET_SEARCHRESULT';
export const TWEETSLOADING = 'TWEETSLOADING';
export const TWEETLOADPROGRESS = "TWEETLOADPROGRESS";
export const SEARCH_ERRORMESSAGE = "SEARCH_ERRORMESSAGE";
export const SET_SAVESEARCHDIALOG_OPEN = "SET_SAVESEARCHDIALOG_OPEN";

/*Action creators*/
export function changeText(text){
	return{
		type: CHANGE_TEXT,
		text
	}
}

export function searchToState(json){
	return{
		type: SET_SEARCHRESULT,
		json
	}
}

export function setTweetsLoading(loading) {
	return  {
		type: TWEETSLOADING,
		loading
	}
}

export function setTweetLoadProgress(progress) {
	return {
		type: TWEETLOADPROGRESS,
		progress,
	};
}

export function setSearchErrorMessage(errorMessage) {
	return {
		type: SEARCH_ERRORMESSAGE,
		errorMessage,
	};
}

export function setSaveSearchDialogOpen(open) {
    return {
        type: SET_SAVESEARCHDIALOG_OPEN,
        open,
    }
}