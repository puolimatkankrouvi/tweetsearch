import React from "react";

interface Search {
	name: string;
	date?: string | number | Date;
	[key: string]: any;
}

interface PreviousSearchProps {
	search: Search;
	onSearchSelected?: (search: Search) => void;
}

export default function PreviousSearch(props: PreviousSearchProps) {
	const [mouseHover, setMouseHover] = React.useState(false);

	const { search, onSearchSelected } = { ...props };
	const date = search.date ? new Date(search.date).toLocaleString() : null;

	return (
		<div className="col-12">
			<div
				className="grid"
				style={mouseHover ? { cursor: "pointer", background: "#E3F2FD" } : undefined}
				onClick={() => onSearchSelected && onSearchSelected(search)}
				onMouseEnter={onSearchSelected ? () => setMouseHover(true) : undefined}
				onMouseLeave={onSearchSelected ? () => setMouseHover(false) : undefined}
			>
				<div className="col-5">
					<p>{search.name}</p>
				</div>
				<div className="col-5">
					<p>{date}</p>
				</div>
			</div>
		</div>
	);
}