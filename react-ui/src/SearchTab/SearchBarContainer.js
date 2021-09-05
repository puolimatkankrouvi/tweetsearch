import * as React from "react";
import {connect} from "react-redux";
import { Button } from "primereact/button";
import SearchBarLogic from "./SearchBarLogic";

import { setSaveSearchDialogOpen } from '../redux/actions';

class SearchBarContainer extends React.Component {

    render() {       
		return <div className="p-grid" style={{ margin: "5px 0" }}>
            <div className="p-col-0 p-lg-4" />
            <div className="p-col-10 p-lg-4 search-bar">
                <SearchBarLogic />
            </div>
            <div className="p-col-0 p-lg-4">
                <Button
                    label="Save search..."
                    disabled={!this.props.searchResult}
                    onClick={() => this.props.setSaveSearchDialogOpen(true)}
                />
            </div>
        </div>;
    }
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