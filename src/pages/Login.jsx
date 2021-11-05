import React from "react";
import { useHistory, Link } from "react-router-dom";
import Cookies from "universal-cookie";
import { userLogin } from "../services/auth/registration-and-login";

import SweetAlert from "sweetalert2";
import Header from "../components/Header";

function Login() {
  const history = useHistory();

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
    <>
      <Header />
      <div className="container-fluid mt-4 d-flex flex-column align-items-center">
        <h2 className="text-center">Login into your account</h2>
        <div className="w-25">
          <form onSubmit={onSubmit}>
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
            <div className="form-group mb-4">
              <label for="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary custom">
              Login
            </button>
          </form>
        </div>
        <br />
        <h5>
          Don't have an account?{" "}
          <strong>
            <Link to="/register" style={{ textDecoration: "none" }}>
              Register now
            </Link>
          </strong>
        </h5>
      </div>
    </>
  );
}

export default Login;
