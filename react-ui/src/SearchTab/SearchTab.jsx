import TweetListLogic from "./TweetListLogic";
import SaveSearchDialog from "./SaveSearchDialog";
import SearchBarContainer from "./SearchBarContainer";
import { useSelector } from "react-redux";

const SearchTab = () => {
	const searchResult = useSelector(state => state.searchTab.searchResult);

	return <div>
		<SearchBarContainer />       
		<TweetListLogic />
		{searchResult ? <SaveSearchDialog /> : null}
	</div>
};

export default SearchTab;