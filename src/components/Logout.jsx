import React, { useState, useEffect, useMemo } from "react";
import Cookies from "universal-cookie";

import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import { useHistory, useLocation } from "react-router-dom";

const Logout = () => {
  const history = useHistory();
  const location = useLocation();
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
      <Button
        onClick={logout}
        style={{ position: "absolute", left: "1rem", bottom: "1rem" }}
      >
        Logout
      </Button>
    )
  );
};

export default Logout;
