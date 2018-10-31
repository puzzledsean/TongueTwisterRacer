import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from './components/Home';
import Join from './components/Join';
import Lobby from './components/Lobby';

const AppRouter = () => (
  <Router>
    <div>
      <Route path="/" exact component={Home} />
      <Route path="/join" component={Join} />
      <Route path="/lobby/:id" render={props => <Lobby {...props}  /> } /> 
    </div>
  </Router>
);

export default AppRouter;