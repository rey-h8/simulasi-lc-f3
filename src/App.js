import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/style.css";

import Home from "./pages/Home.jsx";
import CreateTask from "./pages/CreateTask.jsx";
import EditTask from "./pages/EditTask.jsx";
import Navbar from "./components/Navbar.jsx";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/create-task">
            <CreateTask />
          </Route>
          <Route path="/edit-task/:id">
            <EditTask />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
