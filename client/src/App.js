import axios from "axios";
import React from "react";
import { UserContextProvider } from "./context/UserContext";
import Router from "./Router";
import "./style/index.scss";

axios.defaults.withCredentials = true;
function App(){
    return (
        <UserContextProvider>
            <div className="container"><Router /></div>
        </UserContextProvider>);
}

export default App;