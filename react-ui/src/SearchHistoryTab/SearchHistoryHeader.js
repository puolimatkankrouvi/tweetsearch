import * as React from "react";
import { Panel } from "primereact/panel";
import { BreadCrumb } from "primereact/breadcrumb";
import { useHistory } from "react-router-dom";

const seachHistoryHeader = (props) => {
    const selectedSearch = props.selectedSearch;
    
    const breadCrumbList = [];
    if (selectedSearch && selectedSearch.name) {
        breadCrumbList.push({ label: selectedSearch.name });
    }
    
    const history = useHistory();
    function backToSavedSearchesList() {
        history.push("/history");
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