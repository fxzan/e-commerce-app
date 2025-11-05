import React from "react";
import { useHistory } from "react-router-dom";

import InfoModalContext from "../store/infoModal-context";
import AuthContext from "../store/auth-context";

function Login() {
  const [isLogin, setLogin] = React.useState(true);
  const authCtx = React.useContext(AuthContext);
  const modalCtx = React.useContext(InfoModalContext);
  const email = React.useRef();
  const password = React.useRef();
  const confPassRef = React.useRef();
  const history = useHistory();

  function loginToggle() {
    setLogin((prevLogin) => !prevLogin);
  }

  async function submitHandler(event) {
    event.preventDefault();
    if (!isLogin && password.current.value !== confPassRef.current.value) {
      throw new Error("Passwords don't match!");
    }
    let url;
    if (isLogin)
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAoQtbu7HMnZAG_5er1DnA-HYEj-NWGU4s";
    else
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAoQtbu7HMnZAG_5er1DnA-HYEj-NWGU4s";

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: email.current.value,
          password: password.current.value,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const data = await response.json();
        console.log(data.error);
        throw new Error(`${data.error.message}`);
      } else {
        const data = await response.json();
        console.log(data);
        authCtx.login(data.idToken);
        authCtx.userIdSet(data.localId);
        history.replace("/store");
      }
    } catch (error) {
      modalCtx.showModal(error);
    }
  }

  return (
    <>
      <div className="container-form">
        <h2>Login</h2>
        <div className="form-container">
          <form onSubmit={submitHandler}>
            <label htmlFor="email">E-Mail:</label>
            <input id="email" type="email" ref={email} required />
            <label htmlFor="phone">Password:</label>
            <input id="phone" type="password" ref={password} required />
            {!isLogin && (
              <label htmlFor="phone">Password:</label>
            )}
            {!isLogin && (
              <input
                id="conf-password"
                type="password"
                ref={confPassRef}
              />
            )}
            <button className="action-button" type="submit">
              {isLogin ? "Sign in" : "Sign up"}
            </button>
          </form>
          <p>
          {isLogin ? "Create an account? " : "Have an account? "}
          <span className="link-text" onClick={loginToggle}>
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>
        </div>
      </div>
    </>
  );
}

export default Login;
