import React from "react";
import Cookies from "universal-cookie";
import { useHistory } from "react-router-dom";
import { refund } from "../services/payment/payment";

import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Button } from "react-bootstrap";
import SweetAlert from "sweetalert2";
import Header from "../components/Header";
import { Alert } from "../components/Alert";

const Profile = () => {
  const cookies = new Cookies();
  const confirmCookies = cookies.get("token");

  const history = useHistory();

  if (!confirmCookies) {
    Alert("warning", "Your're not logged", "Login to access our platform");
    setTimeout(() => history.push("/"), 2000);
  }

  const paymentId = cookies.get("paymentId");

  async function cancelPayment() {
    const refundData = [{ amount: 50 }, { paymentId: paymentId }];

    try {
      await refund(refundData);
      Alert("success", "Subscription canceled", "...");
      cookies.remove("paymentId");
    } catch (err) {
      SweetAlert.fire({
        type: "error",
        title: "Opps... Something went wrong",
        text: "Try again later",
      });
    }
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
