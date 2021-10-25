import React from "react";
import { useHistory } from "react-router-dom";
import Cookies from "universal-cookie";
import { userLogin } from "../services/auth/registration-and-login";

import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Button, Form } from "react-bootstrap";
import SweetAlert from "sweetalert2";
import Header from "../components/Header";

function Login() {
  const history = useHistory();
  function goToHome() {
    history.push("/");
  }

  const cookies = new Cookies();

  const confirmCookie = cookies.get("token");
  if (confirmCookie) {
    history.push("/login/profile");
  }

  async function onSubmit(event) {
    event.preventDefault();

    const loginData = {
      email: event.target.email.value,
      password: event.target.password.value,
    };

    try {
      const login = await userLogin(loginData);
      const JWT = login.data.token;
      const email = event.target.email.value;
      cookies.set("token", JWT, {
        path: "/",
      });
      cookies.set("email", email, {
        path: "/",
      });
      history.push("/");
    } catch (err) {
      SweetAlert.fire({
        type: "error",
        title: "Login Failed",
        text: "Incorrect email or password",
      });
    }
  }

  return (
    <Container>
      <Header />
      <h1>Login</h1>

      <form onSubmit={onSubmit}>
        <Row style={{ maxWidth: "300px" }}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Your E-mail and Password</Form.Label>
            <Form.Control
              name="email"
              type="email"
              placeholder="Enter your e-mail"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              name="password"
              type="password"
              placeholder="Enter your Password"
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Login
          </Button>
        </Row>
      </form>

      <br />
      <Button onClick={goToHome} variant="outline-secondary">
        Back
      </Button>
    </Container>
  );
}

export default Login;
