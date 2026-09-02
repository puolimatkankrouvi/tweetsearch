import React from "react";
import type { OldSearch as OldSearchData } from "../types";

interface OldSearchProps {
	search: OldSearchData;
	onSearchSelected?: (search: OldSearchData) => void;
}

export default function OldSearch({ search, onSearchSelected }: OldSearchProps) {
	const [mouseHover, setMouseHover] = React.useState(false);

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