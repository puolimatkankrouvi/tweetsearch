import React from 'react';
import { ProgressBar } from 'primereact/progressbar';

const tweetLoadingIndicator = () => {
    return (
        <div className="grid" style={{ padding: "50px 0 0 0" }}>
            <div className="col-4" />
            <div className="col-4">
                <ProgressBar mode="indeterminate" />
            </div>
            <div className="col-4" />
        </div>
    );
};

export default tweetLoadingIndicator;