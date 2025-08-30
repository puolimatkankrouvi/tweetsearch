import * as React from "react";

export function errorMessage(props) {
    return (<h5>{`${props.errorMessage}`}</h5>);
}

export default errorMessage;