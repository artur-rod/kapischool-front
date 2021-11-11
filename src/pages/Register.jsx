import React from "react";
import { useHistory, Link } from "react-router-dom";
import Cookies from "universal-cookie";

import Header from "../components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import SweetAlert from "sweetalert2";

import {
  userLogin,
  userRegistration,
} from "../services/auth/registration-and-login";
import { mailer } from "../services";

function Register() {
  const history = useHistory();

  const cookies = new Cookies();

  async function onSubmit(event) {
    event.preventDefault();

    const registrationData = {
      name: event.target.name.value,
      email: event.target.email.value,
      password: event.target.password.value,
    };

    const loginData = {
      email: event.target.email.value,
      password: event.target.password.value,
    };

    try {
      await userRegistration(registrationData);
      await mailer.registration([{ email: registrationData.email }]);

      SweetAlert.fire({
        type: "success",
        title: "Registration Success!",
        text: "You can now access out platform...",
        showConfirmButton: false,
        timer: 2000,
      });

      const login = await userLogin(loginData);

      const JWT = login.data.token;
      const email = login.data.user.email;
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
        title: "Registration Failed",
        text: err.response.data.error,
      });
    }
  }

  return (
    <>
      <Header />
      <div className="container-fluid mt-4 d-flex flex-column align-items-center">
        <h2 className="text-center">Create your account</h2>
        <div className="w-25">
          <form onSubmit={onSubmit}>
            <div className="form-group mb-2">
              <label for="name">Enter your name</label>
              <input
                type="name"
                className="form-control"
                id="name"
                aria-describedby="nameHelp"
                placeholder="Enter name"
                required
              />
            </div>
            <div className="form-group mb-2">
              <label for="email">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                required
              />
            </div>
            <div className="form-group mb-2">
              <label for="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                required
              />
            </div>
            <div className="form-check mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="terms"
                required
              />
              <label className="form-check-label" for="terms">
                <span style={{ fontSize: ".95rem" }}>
                  I agree with <Link to="/terms-of-use">Terms of Use</Link>
                  <span> and </span>
                  <Link to="/privacy-policy">Privacy Policy</Link>
                </span>
              </label>
            </div>
            <button type="submit" className="btn btn-primary custom">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
