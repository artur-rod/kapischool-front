import React from "react";
import { useHistory } from "react-router-dom";
import {
  adminLogin,
  adminRegistration,
} from "../services/auth/registration-and-login";
import Cookies from "universal-cookie";

import "bootstrap/dist/css/bootstrap.min.css";
import SweetAlert from "sweetalert2";
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
      name: event.target.name.value,
      email: event.target.email.value,
      password: event.target.password.value,
    };

    try {
      await adminRegistration(registrationData);
      await mailer.registration([{ email: registrationData.email }]);

      const login = await adminLogin(loginData);

      const JWT = login.data.token;
      const email = login.data.user.email;
      cookies.set("token", JWT, {
        path: "/",
      });
      cookies.set("email", email, {
        path: "/",
      });
      history.push("/dashboard");
    } catch (err) {
      SweetAlert.fire({
        type: "error",
        title: "Registration Failed",
        text: "Try again later",
      });
    }
  }

  return (
    <div className="container-fluid p-3">
      <form onSubmit={onSubmit}>
        <div>
          <h6>Enter employee data</h6>
          <div className="form-group mb-2">
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
            <input
              type="office"
              className="form-control"
              id="office"
              aria-describedby="officeHelp"
              placeholder="Enter office"
              required
            />
          </div>
          <div className="form-group mb-2">
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
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              required
            />
          </div>

          <button className="btn btn-primary custom" type="submit">
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
