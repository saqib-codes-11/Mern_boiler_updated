import RaveNav from "./components/RaveNav";
import Home from "./components/Home";
import Room from "./components/Room";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import AuthRoute from "./components/AuthRoute";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

const App = () => {

  return (
    <>
      <Router>
        <RaveNav />
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/room" component={Room}/>
          <Route path="/register" component={Register}/>
          <Route path="/login" component={Login}/>
          <AuthRoute>
            <Route path="/profile" component={Profile}/>
          </AuthRoute>
        </Switch>
        </Router>
    </>
  );
}

export default App;
