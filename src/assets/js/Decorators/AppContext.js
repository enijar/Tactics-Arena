import React from "react";
import Context from "../Context/App";

export default Component => props => (
    <Context.Consumer>
        {context => <Component {...props} context={context}/>}
    </Context.Consumer>
);
