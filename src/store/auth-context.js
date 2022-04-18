import React from "react";
import { useHistory } from "react-router-dom";

const AuthContext = React.createContext({
  token: "",
  userID: "",
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

export function AuthContextProvider(props) {
  const history = useHistory();
  const inititalToken = localStorage.getItem("token");
  const [token, setToken] = React.useState(inititalToken);
  const isLoggedIn = !!token;
  let userID = "";
  if (token) userID = token.substring(token.length - 15);

  function loginHandler(newToken) {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  }

  function logoutHandler() {
    localStorage.removeItem("token");
    setToken(null);
    history.replace("/e-commerce-app/");
  }

  const contextValue = {
    token: token,
    userID: userID,
    isLoggedIn: isLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
