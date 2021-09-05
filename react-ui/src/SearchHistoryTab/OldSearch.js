import * as React from "react";

export default function previousSearch(props) {
    const [mouseHover, setMouseHover] = React.useState(false);

    const {search, onSearchSelected } = {...props};
    const date = search.date ? new Date(search.date).toLocaleString() : null;

    return (
        <div className="p-col-12">
            <div
                className="p-grid"
                style={mouseHover ? { cursor: "pointer", background: "#E3F2FD"} : undefined}
                onClick={() => onSearchSelected && onSearchSelected(search)}
                onMouseEnter={onSearchSelected ? () => setMouseHover(true) : undefined}
                onMouseLeave={onSearchSelected ? () => setMouseHover(false) : undefined}
            >
                <div className="p-col-5">
                    <p>{search.name}</p>
                </div>
                <div className="p-col-5">
                    <p>{date}</p>
                </div>
            </div>
        </div>
    );
}