import { DataView } from "primereact/dataview";
import LoadingIndicator from "./LoadingIndicator";

import { Tweet } from "./Tweet";

interface TweetUser {
	profile_image_url?: string;
	name: string;
	[key: string]: any;
}

interface TweetData {
	user?: TweetUser;
	text: string;
	created_at: string;
	[key: string]: any;
}

interface TweetListProps {
	tweets: TweetData[] | null;
	tweetsLoading: boolean;
}

export default function TweetList(props: TweetListProps) {
	const { tweets, tweetsLoading } = props;

	if (!tweets) {
		return null;
	}

	if (tweetsLoading) {
		return <LoadingIndicator />;
	}

	return (
		<DataView
			value={tweets}
			layout="list"
			itemTemplate={itemTemplate}
			header={getHeader()}
			style={{ margin: "20px 0 0 0" }}
		/>
	);
}

function itemTemplate(tweet: TweetData) {
	if (!tweet) {
		return null;
	}

	return <Tweet tweet={tweet} />;
}

function getHeader() {
	return (
		<div className="grid">
			<div className="col-6" />
			<div className="col-6" />
		</div>
	);
}