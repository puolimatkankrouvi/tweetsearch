import React from 'react';
import {ProgressBar} from 'primereact/progressbar';
import { connect } from 'react-redux';

const tweetLoadingIndicator = () => {
    return (
        <div className="p-grid" style={{padding: "50px 0 0 0"}}>
            <div className="p-col-4" />
            <div className="p-col-4">
                <ProgressBar mode="indeterminate" />
            </div>
            <div className="p-col-4" />
        </div>
    );
};

function mapStateToProps(state) {
    return {
        tweetLoadProgress: state.tweetLoadProgress,
    };
}

export default connect(mapStateToProps)(tweetLoadingIndicator);