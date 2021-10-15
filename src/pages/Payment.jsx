import React from "react";
import Cookies from "universal-cookie";
import { useHistory } from "react-router-dom";
import Header from "../components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Button, Form } from "react-bootstrap";
import { Alert } from "../components/Alert";

import { payment } from "../services/payment/payment";
import { cancelCharge } from "../services/payment/charge";
import { mailer, profile } from "../services";

const Payment = () => {
  const history = useHistory();

  const cookies = new Cookies();

  const address = cookies.get("address");
  const email = cookies.get("email");

  async function onSubmit(event) {
    event.preventDefault();

    const cardData = {
      cardNumber: "5162499546921104",
      holderName: "Fulano da Silva",
      securityCode: "702",
      expirationMonth: "04",
      expirationYear: "2023",
    };

    const publicToken = process.env.REACT_APP_PUBLIC_TOKEN;
    const checkout = new window.DirectCheckout(publicToken, false);

    async function generateCardHash() {
      const hash = await new Promise((resolve, reject) => {
        checkout.getCardHash(
          cardData,
          function (cardHash) {
            resolve(cardHash);
          },
          function (error) {
            reject(error);
          }
        );
      });
      return hash;
    }

    const paymentData = {
      chargeId: chargeId,
      billing: {
        email: email,
        address: address,
        delayed: false,
      },
      creditCardDetails: {
        creditCardHash: await generateCardHash(),
      },
    };

    payment(paymentData).then((response) => {
      if (response.status === 200) {
        mailer.purchase([{ email: email }]);
        profile.coursesUpdate({
          email: email,
          paymentId: response.data.id,
        });

        cookies.set("paymentId", response.data.id, {
          path: "/login",
        });
        cookies.remove("address");
        cookies.remove("chargeId");

        Alert(
          "success",
          "Purchase Success!",
          "You can access our platform now..."
        );
        setTimeout(() => {
          history.push("/login/profile");
        }, 2000);
      }
    });
  }

  const chargeId = cookies.get("chargeId");
  function cancelButton() {
    const cancelationData = {
      chargeId: chargeId,
    };

    cancelCharge(cancelationData).then((response) => {
      if (response.status === 204) {
        Alert(
          "success",
          "Purchase Canceled!",
          "You're going to our Courses Page..."
        );
        setTimeout(() => {
          history.push("/courses");
          window.location.reload(true);
        }, 2000);
      }
    });
  }

  return (
    <Container>
      <Header />
      <h1>Payment</h1>
      <h2>Payment Data</h2>

      <form onSubmit={onSubmit}>
        <Row style={{ maxWidth: "500px" }}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Credit Card Data</Form.Label>

            <Form.Control
              name="cardNumber"
              type="number"
              placeholder="Card Number"
            />
            <Form.Control
              name="holderName"
              type="number"
              placeholder="Holder Name"
            />
            <Form.Control
              name="securityCode"
              type="number"
              placeholder="Security Code"
            />
            <Form.Control
              name="expirationMonth"
              type="number"
              placeholder="Expiration Month"
            />
            <Form.Control
              name="expirationYear"
              type="number"
              placeholder="Expiration Year"
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Finish Purchase
          </Button>
        </Row>
      </form>

      <br />
      <Button onClick={cancelButton} variant="outline-danger">
        Cancel Purchase
      </Button>
    </Container>
  );
};

export default Payment;
