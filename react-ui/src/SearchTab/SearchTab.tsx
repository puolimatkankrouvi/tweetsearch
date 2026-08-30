import TweetListLogic from "./TweetListLogic";
import SaveSearchDialog from "./SaveSearchDialog";
import SearchBarContainer from "./SearchBarContainer";
import { useSelector } from "react-redux";

interface SearchTabState {
	searchResult: any;
}

interface RootState {
	searchTab: SearchTabState;
}

const SearchTab = () => {
	const searchResult = useSelector((state: RootState) => state.searchTab.searchResult);

	return (
		<div>
			<SearchBarContainer />
			<TweetListLogic />
			{searchResult ? <SaveSearchDialog /> : null}
		</div>
	);
};

export default SearchTab;