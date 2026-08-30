import { Button } from "primereact/button";
import SearchBarLogic from "./SearchBarLogic";

import { setSaveSearchDialogOpen } from "../redux/reducers";
import { useDispatch, useSelector } from "react-redux";

interface SearchTabState {
	searchResult: any;
}

interface RootState {
	searchTab: SearchTabState;
}

const SearchBarContainer = () => {
	const searchResult = useSelector((state: RootState) => state.searchTab.searchResult);
	const dispatch = useDispatch();

	return (
		<div className="grid" style={{ margin: "5px 0" }}>
			<div className="col-4 lg-4">
				Search button has been disabled now because X has stopped supporting it for free.
			</div>
			<div className="col-6 lg-4 search-bar">
				<SearchBarLogic />
			</div>
			<div className="col-0 lg-4">
				<Button
					label="Save search..."
					disabled={!searchResult}
					onClick={() => dispatch(setSaveSearchDialogOpen(true))}
				/>
			</div>
		</div>
	);
};

export default SearchBarContainer;