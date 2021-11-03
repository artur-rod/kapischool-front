import React, { useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import SweetAlert from "sweetalert2";
import Header from "../components/Header";
import Cookies from "universal-cookie";

function Home() {
  const cookies = new Cookies();

  useEffect(() => {
    const confirmCookies = cookies.get("okayWithCookies");
    if (!confirmCookies) {
      SweetAlert.fire({
        type: "info",
        title: "This website use Cookies! You're okay with that?",
        showCancelButton: true,
        cancelButtonText: "No",
        cancelButtonColor: "#d33",

        toast: true,
        width: "100vw",
        position: "bottom",
      }).then((result) => {
        if (result.value === true) {
          cookies.set("okayWithCookies", "Okay", {
            path: "/",
          });
        }
      });
    }
  });

  return (
    <Container>
      <Header />
      <h1>Home</h1>
    </Container>
  );
}

export default Home;
