import { parseTwitterDate } from "./Utilities.ts";

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

interface TweetProps {
	tweet: TweetData;
}

export function Tweet(props: TweetProps) {
	const tweet = props.tweet;

	return (
		<div className="col-12">
			<div className="grid">
				<div className="col-2">
					{tweet.user ? (
						<div>
							<img
								src={tweet.user.profile_image_url || ""}
								alt={tweet.user.profile_image_url}
								loading="lazy"
							/>
							<div>
								<p>{tweet.user.name}</p>
							</div>
						</div>
					) : null}
				</div>
				<div className="col-8">{tweet.text}</div>
				<div className="col-2">
					<div>{parseTwitterDate(tweet.created_at)}</div>
				</div>
			</div>
		</div>
	);
}