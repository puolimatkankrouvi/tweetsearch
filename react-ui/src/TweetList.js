import * as React from "react";
import {DataView} from 'primereact/dataview';
import LoadingIndicator from "./LoadingIndicator";

import {Tweet} from "./Tweet";

export default function TweetList(props) {
    const { tweets, tweetsLoading } = props;

    if (!tweets) {
        return null;
    }

    if (tweetsLoading) {
        return (
            <LoadingIndicator />
        );
    }

    return <DataView value={props.tweets} layout={"list"} itemTemplate={itemTemplate} header={getHeader()} style={{margin: "20px 0 0 0"}}/>;
}

function itemTemplate(tweet) {
    if (!tweet) {
        return null;
    }

    return <Tweet tweet={tweet} />;
}

function getHeader() {
    return <div className="grid">
        <div className="col-6" />
        <div className="col-6" />
    </div>;
}