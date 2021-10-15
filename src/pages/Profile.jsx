import React from "react";
import Cookies from "universal-cookie";
import { useHistory } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Button } from "react-bootstrap";
import Header from "../components/Header";
import { Alert } from "../components/Alert";
import { refund } from "../services/payment/payment";

const Profile = () => {
  const cookies = new Cookies();
  const confirmCookies = cookies.get("token");

  const history = useHistory();

  if (!confirmCookies) {
    Alert("warning", "Your're not logged", "Login to access our platform");
    setTimeout(() => history.push("/"), 2000);
  }

  const paymentId = cookies.get("paymentId");

  function cancelPayment() {
    const refundData = [{ amount: 50 }, { paymentId: paymentId }];

    refund(refundData).then((response) => {
      if (response.status === 200) {
        Alert("success", "Subscription canceled", "...");
      }

      setTimeout(() => {
        cookies.remove("paymentId");
      }, 2000);
    });
  }

  return (
    <Container>
      <Header />
      <h1>Profile</h1>

      <h2>My courses</h2>
      <p>
        Courses <br />
        {paymentId}
      </p>

      <Button onClick={cancelPayment}>Cancelar assinatura</Button>
    </Container>
  );
};

export default Profile;
