import TweetList from "../TweetList";
import ErrorMessage from "../ErrorMessage";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/reducers";

function TweetListLogic() {
	const tweets = useSelector((state: RootState) => state.searchTab.searchResult?.statuses ?? []);
	const tweetsLoading = useSelector((state: RootState) => state.searchTab.tweetsLoading);
	const searchResultErrorMessage = useSelector(
		(state: RootState) => state.searchTab.searchResultErrorMessage
	);

	return (
		<div>
			<TweetList tweets={tweets} tweetsLoading={tweetsLoading} />
			{searchResultErrorMessage ? <ErrorMessage errorMessage={searchResultErrorMessage} /> : null}
		</div>
	);
}

export default TweetListLogic;