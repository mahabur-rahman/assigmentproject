import React from "react";
import "./styles/main.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import router from "./router/routes";

const App = () => {
  return (
    <>
      <Router>
        <Switch>
          {router.map((route) => {
            const { path, component, exact } = route;
            return <Route path={path} exact={exact} component={component} />;
          })}
        </Switch>
      </Router>
    </>
  );
};
export default App;
