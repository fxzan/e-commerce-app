import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import AuthContext from "./store/auth-context";

const Store = React.lazy(() => import("./pages/Store"));
const About = React.lazy(() => import("./pages/About"));
const Login = React.lazy(() => import("./pages/Login"));
const Home = React.lazy(() => import("./pages/Home"));
const ContactUs = React.lazy(() => import("./pages/ContactUs"));
const Products = React.lazy(() => import("./pages/Products"));

function App() {
  const authCtx = React.useContext(AuthContext);

  return (
    <Layout>
      <React.Suspense fallback={<p className="fallback">Loading...</p>}>
        <Switch>
          <Route path="/e-commerce-app/" exact>
            <Redirect to="/e-commerce-app/home" />
          </Route>
          <Route path="/e-commerce-app/home">
            <Home />
          </Route>
          <Route path="/e-commerce-app/store" exact>
            {authCtx.isLoggedIn && <Store />}
            {!authCtx.isLoggedIn && <Redirect to="/e-commerce-app/login" />}
          </Route>
          <Route path="/e-commerce-app/store/:productClass/:productID">
            {authCtx.isLoggedIn && <Products />}
            {!authCtx.isLoggedIn && <Redirect to="/e-commerce-app/login" />}
          </Route>
          <Route path="/e-commerce-app/about">
            <About />
          </Route>
          <Route path="/e-commerce-app/contact-us">
            <ContactUs />
          </Route>
          <Route path="/e-commerce-app/login">
            {!authCtx.isLoggedIn && <Login />}
            {authCtx.isLoggedIn && <Redirect to="/store" />}
          </Route>
          <Route path="/e-commerce-app/*">
            <p className="fallback">Page Not Found.</p>
          </Route>
        </Switch>
      </React.Suspense>
    </Layout>
  );
}

export default App;
