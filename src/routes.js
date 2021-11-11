import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Courses from "./pages/Courses";
import Payment from "./pages/Payment";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateCharge from "./pages/CreateCharge";
import AdminLogin from "./pages/AdminLogin";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfUse from "./pages/TermsOfUse";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />

        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/login/profile" component={Profile} />

        <Route exact path="/admin-login" component={AdminLogin} />
        <Route exact path="/dashboard" component={Dashboard} />

        <Route exact path="/courses" component={Courses} />
        <Route exact path="/charges" component={CreateCharge} />
        <Route exact path="/charges/payment" component={Payment} />

        <Route exact path="/privacy-policy" component={PrivacyPolicy} />
        <Route exact path="/terms-of-use" component={TermsOfUse} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
