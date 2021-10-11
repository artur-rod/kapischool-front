import React from "react";
import Cookies from "universal-cookie";

import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const Logout = () => {
  const history = useHistory();

  function logout() {
    const cookies = new Cookies();
    cookies.remove("token");
    history.push("/");
  }
  return (
    <Button
      onClick={logout}
      style={{ position: "absolute", left: "1rem", bottom: "1rem" }}
    >
      Logout
    </Button>
  );
};

export default Logout;
