import { Panel } from "primereact/panel";
import { BreadCrumb, type BreadCrumbProps } from "primereact/breadcrumb";
import type { OldSearch } from "../types";

interface SearchHistoryHeaderProps {
	selectedSearch?: OldSearch | null;
	backToSavedSearchesList: () => void;
}

const SearchHistoryHeader = ({ selectedSearch, backToSavedSearchesList }: SearchHistoryHeaderProps) => {
	const breadCrumbList: BreadCrumbProps["model"] = [];
	if (selectedSearch && selectedSearch.name) {
		breadCrumbList.push({ label: selectedSearch.name });
	}

	return (
		<Panel>
			<h3>Saved searches</h3>
			<BreadCrumb
				model={breadCrumbList}
				home={{ icon: "pi pi-home", command: () => backToSavedSearchesList() }}
			/>
		</Panel>
	);
};

export default SearchHistoryHeader;