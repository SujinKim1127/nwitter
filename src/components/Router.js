import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Navigation from "./Navigation";


const AppRouter = ({ isLoggedIn, userObj }) => {
    return(
        <Router>
            {isLoggedIn && <Navigation />}
            <Switch>
                { isLoggedIn ? (
                    <>
                    <Route exact path="/">
                        <Home userObj={userObj}/>
                    </Route>
                    <Route exact path="/profile">
                        <Profile userObj={userObj}/>
                    </Route>
                    </>
                ) : (
                    <Route exact path="/">
                        <Home userObj={userObj} />
                    </Route>
                )}
            </Switch>
        </Router>
    );
};


export default AppRouter;