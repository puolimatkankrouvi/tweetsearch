import React from "react";
import { DataView } from "primereact/dataview";
import OldSearch from "./OldSearch";
import LoadingIndicator from "../LoadingIndicator";
import type { OldSearch as OldSearchData } from "../types";

interface OldSearchesListProps {
	oldSearches: OldSearchData[];
	loading: boolean;
	onSearchSelected?: (search: OldSearchData) => void;
}

function OldSearchesList({ oldSearches, loading, onSearchSelected }: OldSearchesListProps) {
	const itemTemplate = React.useCallback(
		(search: OldSearchData) => {
			if (!search) {
				return null;
			}

			return <OldSearch search={search} onSearchSelected={onSearchSelected} />;
		},
		[onSearchSelected]
	);

	if (loading) {
		return <LoadingIndicator />;
	}

	return (
		<DataView
			value={oldSearches}
			layout="list"
			itemTemplate={itemTemplate}
			header={getHeader()}
			style={{ margin: "20px 0 0 0" }}
		/>
	);
}

function getHeader() {
	return (
		<div className="grid">
			<div className="col-6" />
			<div className="col-6" />
		</div>
	);
}

export default OldSearchesList;