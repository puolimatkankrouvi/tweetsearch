import React from 'react';
import {connect} from "react-redux";
import TweetListLogic from "./TweetListLogic";
import SaveSearchDialog from "./SaveSearchDialog";
import SearchBarContainer from "./SearchBarContainer";

const SearchTab = (props) => {
	return <div>
		<SearchBarContainer />       
		<TweetListLogic />
		{props.searchResult ? <SaveSearchDialog /> : null}
	</div>
};

function mapStateToProps(state) {
	return { searchResult: state.searchTab.searchResult };
}

export default connect(mapStateToProps)(SearchTab);