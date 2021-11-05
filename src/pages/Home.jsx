import React, { useEffect } from "react";

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
    <>
      <Header />
      <div className="container-fluid mt-4 text-center">
        <h1>KapiSchool</h1>
        <h3>
          <span>Your way to learn </span>
          <span className="bg-primary text-light">Web Programming</span>
        </h3>
      </div>
    </>
  );
}

export default Home;
