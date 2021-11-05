import React, { useState, useEffect, useMemo } from "react";
import { useHistory } from "react-router-dom";
import Cookies from "universal-cookie";

const Logout = () => {
  const history = useHistory();
  const cookies = useMemo(() => new Cookies(), []);

  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(cookies.get("token"));
  }, [cookies]);

  function logout() {
    cookies.remove("token");
    history.push("/");
    history.go(0);
  }

  return (
    !!token && (
      <button onClick={logout} className="btn btn-outline-light">
        Logout
      </button>
    )
  );
};

export default Logout;
