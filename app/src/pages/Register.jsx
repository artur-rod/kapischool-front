import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  userLogin,
  userRegistration,
} from "../services/auth/registration-and-login";
import Cookies from "universal-cookie";

import Header from "../components/Header";

import SweetAlert from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Button, Form } from "react-bootstrap";

function Register() {
  const history = useHistory();
  function goToHome() {
    history.push("/");
  }

  const cookies = new Cookies();

  async function onSubmit(event) {
    event.preventDefault();

    const registrationData = {
      name: event.target.name.value,
      email: event.target.email.value,
      password: event.target.password.value,
    };

    const loginData = {
      name: event.target.name.value,
      email: event.target.email.value,
      password: event.target.password.value,
    };

    userRegistration(registrationData)
      .then((response) => {
        if (response.status === 200) {
          SweetAlert.fire({
            type: "success",
            title: "Registration Success!",
            text: "You can now access out platform...",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      })
      .then(() => {
        userLogin(loginData).then((response) => {
          if (response.status === 200) {
            const JWT = response.data.token;
            const email = response.data.user.email;
            cookies.set("token", JWT, {
              path: "/",
            });
            cookies.set("email", email, {
              path: "/charges",
            });
            history.push("/login/profile");
          }
        });
      });
  }

  return (
    <Container>
      <Header />
      <h1>Registration</h1>

      <form onSubmit={onSubmit}>
        <Row style={{ maxWidth: "300px" }}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Your Name</Form.Label>
            <Form.Control
              name="name"
              type="text"
              placeholder="Enter your name"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Your E-mail</Form.Label>
            <Form.Control
              name="email"
              type="email"
              placeholder="Enter your e-mail"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              name="password"
              type="password"
              placeholder="Enter your Password"
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Register
          </Button>
        </Row>
      </form>

      <br />
      <Button onClick={goToHome} variant="outline-secondary">
        Back
      </Button>
    </Container>
  );
};

export default Register;