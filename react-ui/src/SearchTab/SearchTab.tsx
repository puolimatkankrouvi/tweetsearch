import TweetListLogic from "./TweetListLogic";
import SaveSearchDialog from "./SaveSearchDialog";
import SearchBarContainer from "./SearchBarContainer";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/reducers";

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