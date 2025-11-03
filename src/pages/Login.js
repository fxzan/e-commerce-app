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
  const history = useHistory();

  function loginToggle() {
    setLogin((prevLogin) => !prevLogin);
  }

  async function submitHandler(event) {
    event.preventDefault();
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
        console.log(data.error.code);
        throw new Error(` Code ${data.error.code}: ${data.error.message}`);
      } else {
        const data = await response.json();
        console.log(data);
        authCtx.login(data.idToken);
        authCtx.userIdSet(data.localId);
        history.replace("/e-commerce-app/store");
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
            <button className="btn-pink" type="submit">
              {isLogin ? "Sign in" : "Sign up"}
            </button>
          </form>
          <div className={"login-mode"} onClick={loginToggle}>
            {isLogin ? "Create a new account" : "Login to an existing account"}
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
