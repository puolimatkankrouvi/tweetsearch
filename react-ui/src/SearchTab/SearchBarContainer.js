import * as React from "react";
import {connect} from "react-redux";
import { Button } from "primereact/button";
import SearchBarLogic from "./SearchBarLogic";

import { setSaveSearchDialogOpen } from '../redux/actions';

const SearchBarContainer = (props) => {
    return <div className="grid" style={{ margin: "5px 0" }}>
        <div className="col-0 lg-4" />
        <div className="col-10 lg-4 search-bar">
            <SearchBarLogic />
        </div>
        <div className="col-0 lg-4">
            <Button
                label="Save search..."
                disabled={!props.searchResult}
                onClick={() => props.setSaveSearchDialogOpen(true)}
            />
        </div>
    </div>;
}

function mapStateToProps(state) {
	return {
        searchResult: state.searchResult,
        text: state.text,
    };
}


const dispatchToProps = {
    setSaveSearchDialogOpen,
}

export default connect(mapStateToProps, dispatchToProps)(SearchBarContainer);