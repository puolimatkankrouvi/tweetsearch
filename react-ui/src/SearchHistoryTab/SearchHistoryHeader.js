import * as React from "react";
import { Panel } from "primereact/panel";
import { BreadCrumb } from "primereact/breadcrumb";

const seachHistoryHeader = (props) => {
    const { selectedSearch, backToSavedSearchesList } = {...props};
    
    const breadCrumbList = [];
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

export default seachHistoryHeader;