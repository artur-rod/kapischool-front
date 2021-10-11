import React from "react";
import { Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import { Nav } from "react-bootstrap";
import Logout from "./Logout";

const Header = () => {
  return (
    <Nav>
      <Nav.Item>
        <Link to="/" style={{ marginRight: "10px" }}>
          Home
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link to="/courses" style={{ marginRight: "10px" }}>
          Courses
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link to="/register" style={{ marginRight: "10px" }}>
          Register
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link to="/login">Login</Link>
      </Nav.Item>

      <div
        className="container"
        style={{ position: "absolute", left: "10px", bottom: "10px" }}
      >
        <Logout />
      </div>

      <br />
      <br />
    </Nav>
  );
};

export default Header;
