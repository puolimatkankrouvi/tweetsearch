import TweetList from "../TweetList";
import ErrorMessage from "../ErrorMessage";
import { useSelector } from "react-redux";

function TweetListLogic() {
    const tweets = useSelector(state => state.searchTab.searchResult?.statuses ?? []);
    const tweetsLoading = useSelector(state => state.searchTab.tweetsLoading);
    const searchResultErrorMessage = useSelector(state => state.searchTab.searchResultErrorMessage);

    return <div>
        <TweetList
            tweets={tweets}
            tweetsLoading={tweetsLoading}
        />   
        {searchResultErrorMessage ? <ErrorMessage errorMessage={searchResultErrorMessage} /> : null}
    </div>;
}

export default TweetListLogic;