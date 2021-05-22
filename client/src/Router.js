import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Home from "./components/home/Home";
import Navbar from "./components/misc/Navbar";

function Router(){
    return <BrowserRouter>
        <Navbar />
        <Switch>
            <Route exact path = "/"><Home /></Route>
            <Route exact path = "/login"><Login /></Route>
            <Route exact path = "/register"><Register /></Route>
            <Route  path = "*"><Home /></Route>
        </Switch>
    </BrowserRouter>
}

export default Router;