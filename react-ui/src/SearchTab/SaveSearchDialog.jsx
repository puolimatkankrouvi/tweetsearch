import React from "react";
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Toast } from "primereact/toast";
import { setSaveSearchDialogOpen } from "../redux/reducers";
import { save } from "../apiCalls";
import SimpleReactValidator from "simple-react-validator";
import { useDispatch, useSelector } from "react-redux";

const saveSearchDialog = () => {
    const open = useSelector(state => state.searchTab.saveSearchDialogOpen);
    const text = useSelector(state => state.searchTab.text);
    const searchResult = useSelector(state => state.searchTab.searchResult);
    const dispatch = useDispatch();

    const [searchName, setSearchName] = React.useState(text || "");

    const validator = React.useRef(new SimpleReactValidator());
    const toast = React.useRef(null);

    const showTweetsSavedMessage = () => {
        toast.current?.show({
            severity: "success",
            summary: "Tweets saved",
        });
    }

    const showErrorMessage = () => {
        toast.current?.show({
            severity: "error",
            summary: "Error when saving tweets",
        });
    }

    const saveSearch = React.useCallback(() => {
        if (validator.current.allValid()) {
            save(searchResult, searchName)
                .then(() => showTweetsSavedMessage())
                .catch(() => showErrorMessage());

            props.dispatch(setSaveSearchDialogOpen(false));
        }
    },
        [searchResult, searchName]
    );

    const footer = <div>
        <Button
            label="Save"
            onClick={() => saveSearch()}
        />
        <Button
            label="Cancel"
            onClick={dispatch(setSaveSearchDialogOpen(false))}
            className='p-button-secondary'
        />
    </div>;

    return (
        <div>
            <Dialog
                header="Save current search"
                width="600px"
                footer={footer}
                visible={open}
                onHide={dispatch(setSaveSearchDialogOpen(false))}
            >
                <div className="field" style={{ height: "50px", width: "500px" }}>
                    <label htmlFor="searchname" className="block">Search name</label>
                        <InputText
                            id="searchname"
                            value={searchName}
                            onChange={ev => setSearchName(ev.target.value)}
                            onBlur={validator.current.showMessageFor("searchName")}
                        />
                        <small className="block">{validator.current.message("searchName", searchName, "required")}</small>
                </div>
            </Dialog>
            <Toast ref={toast} />
        </div>
    );
};

export default saveSearchDialog;