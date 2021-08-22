import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/font-awesome/css/font-awesome.min.css";
import "assets/scss/argon-design-system-react.scss?v1.1.0";

import Home from "views/legalData/Home.js";
import Login from "views/legalData/Login.js";
import Profile from "views/legalData/Profile.js";
import Register from "views/legalData/Register.js";
import BoardSearch from "views/legalData/Board-search";


import BoardAdmin from "views/legalData/admin/Board-admin";
import BoardUser from "./views/legalData/admin/Board-user";
import BoardDocument from "views/legalData/admin/Documents";
import BoardArticle from "views/legalData/admin/Articles";


ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/" exact render={props => <Home {...props} />} />
      <Route path="/home" exact render={props => <Home {...props} />} />
      <Route path="/login-page" exact render={props => <Login {...props} />} />
      <Route path="/document-page" exact render={props => <BoardDocument {...props} />} />
      <Route path="/article-page" exact render={props => <BoardArticle {...props} />} />
      <Route path="/board-admin" exact render={props => <BoardAdmin {...props} />} />
      <Route path="/board-user" exact render={props => <BoardUser {...props} />} />
      <Route path="/board-search" exact render={props => <BoardSearch {...props} />} />
      <Route path="/profile-page" exact render={props => <Profile {...props} />} />
      <Route path="/register-page" exact render={props => <Register {...props} />} />
      <Redirect to="/" />
    </Switch> 
  </BrowserRouter>,
  document.getElementById("root")
);
