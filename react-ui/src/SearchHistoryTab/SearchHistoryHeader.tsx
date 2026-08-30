import { Panel } from "primereact/panel";
import { BreadCrumb, type BreadCrumbProps } from "primereact/breadcrumb";

interface Search {
	name: string;
	date?: string | number | Date;
	[key: string]: any;
}

interface SearchHistoryHeaderProps {
	selectedSearch?: Search | null;
	backToSavedSearchesList: () => void;
}

const SearchHistoryHeader = (props: SearchHistoryHeaderProps) => {
	const { selectedSearch, backToSavedSearchesList } = { ...props };

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