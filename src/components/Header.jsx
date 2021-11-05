import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

import Logout from "./Logout";

const Header = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const cookies = new Cookies();
    setToken(cookies.get("token"));
  }, []);

  return (
    <div className="container-fluid p-0">
      <nav className="navbar navbar-light bg-primary ">
        <div className="container-fluid mx-5">
          <a className="navbar-brand text-light" href="/">
            <img
              src="https://cdn-icons.flaticon.com/png/512/2721/premium/2721620.png?token=exp=1635976100~hmac=df45962d639336ba3872830e28c5c7f7"
              alt=""
              width="35"
              style={{ marginRight: "10px" }}
            />
            KapiSchool
          </a>
          <ul className="nav">
            <li className="nav-item">
              <Link to="/" style={{ textDecoration: "none" }}>
                <span className="nav-link text-light">Home</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/courses" style={{ textDecoration: "none" }}>
                <span className="nav-link text-light">Buy Courses</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/register" style={{ textDecoration: "none" }}>
                <span className="nav-link text-light">Register</span>
              </Link>
            </li>
            <li className="nav-item">
              {!token && (
                <Link to="/login" style={{ textDecoration: "none" }}>
                  <button className="btn btn-outline-light">Login</button>
                </Link>
              )}
              {!!token && (
                <Link to="/login/profile" style={{ textDecoration: "none" }}>
                  <button className="btn btn-outline-light">Profile</button>
                </Link>
              )}
            </li>
            {!!token && (
              <li className="ps-2">
                <Logout />
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Header;

// <nav className="vw-100 d-flex justify-content-evenly">
//   <span>
//     <Link to="/" style={{ textDecoration: "none" }}>
//       Home
//     </Link>
//   </span>
//   <span>
//     <Link to="/courses" style={{ textDecoration: "none" }}>
//       Courses
//     </Link>
//   </span>
//   <span>
//     <Link to="/register" style={{ textDecoration: "none" }}>
//       Register
//     </Link>
//   </span>

//   <div
//     className="container"
//     style={{ position: "absolute", left: "10px", bottom: "10px" }}
//   >
//     <Logout />
//   </div>

//   <br />
//   <br />
// </nav>
