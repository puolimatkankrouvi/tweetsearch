import * as React from "react";
import { connect } from "react-redux";
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Toast } from "primereact/toast";
import { setSaveSearchDialogOpen } from "../redux/actions";
import { save } from "../apiCalls";
import SimpleReactValidator from "simple-react-validator";

const saveSearchDialog = (props) => {
    const [searchName, setSearchName] = React.useState(props.text || "");

    const validator = React.useRef(new SimpleReactValidator());
    const toast = React.useRef(null);

    const showTweetsSavedMessage = () => {
        toast.current.show({
            severity: "success",
            summary: "Tweets saved",
        });
    }

    const showErrorMessage = () => {
        toast.current.show({
            severity: "error",
            summary: "Error when saving tweets",
        });
    }

    const saveSearch = React.useCallback(() => {
        if (validator.current.allValid()) {
            save(props.searchResult, searchName)
                .then(showTweetsSavedMessage(), showErrorMessage(),
            );

            props.closeDialog();
        }
    },
        [props.searchResult, searchName]
    );

    const footer = <div>
        <Button
            label="Save"
            onClick={() => saveSearch()}
        />
        <Button
            label="Cancel"
            onClick={props.closeDialog}
            className='p-button-secondary'
        />
    </div>;

    return (
        <div>
            <Dialog
                header="Save current search"
                width="600px"
                footer={footer}
                visible={props.open}
                onHide={props.closeDialog}
            >
                <div className="p-field" style={{ height: "50px", width: "500px" }}>
                    <label htmlFor="searchname" className="p-d-block">Search name</label>
                        <InputText
                            id="searchname"
                            value={searchName}
                            onChange={ev => setSearchName(ev.target.value)}
                            onBlur={validator.current.showMessageFor("searchName")}
                        />
                        <small className="p-d-block">{validator.current.message("searchName", searchName, "required")}</small>
                </div>
            </Dialog>
            <Toast ref={toast} />
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        open: state.saveSearchDialogOpen,
        text: state.text,
        searchResult: state.searchResult,
    };
};

function dispatchToProps(dispatch) {
    return {
        closeDialog: () => dispatch(setSaveSearchDialogOpen(false))
    };
}

export default connect(mapStateToProps, dispatchToProps)(saveSearchDialog);