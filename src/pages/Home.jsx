import React, { useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import SweetAlert from "sweetalert2";
import Header from "../components/Header";
import Cookies from "universal-cookie";

function Home() {
  const cookies = new Cookies();
  const confirmCookies = cookies.get("token");

  useEffect(() => {
    if (!confirmCookies) {
      SweetAlert.fire({
        type: "info",
        title: "This website use Cookies",
        text: "You're okay with that?",
      });
    }
  }, []);

  return (
    <Container>
      <Header />
      <h1>Home</h1>
    </Container>
  );
}

export default Home;
