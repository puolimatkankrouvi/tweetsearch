import { parseTwitterDate } from "./Utilities";
import type { Tweet as TweetData } from "./types";

interface TweetProps {
	tweet: TweetData;
}

export function Tweet({ tweet }: TweetProps) {
	return (
		<div className="col-12">
			<div className="grid">
				<div className="col-2">
					{tweet.user ? (
						<div>
							<img
								src={tweet.user.profileImageUrl || ""}
								alt={tweet.user.profileImageUrl}
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
					<div>{parseTwitterDate(tweet.createdAt)}</div>
				</div>
			</div>
		</div>
	);
}

export default Tweet;