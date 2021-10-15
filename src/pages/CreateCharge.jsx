import React from "react";
import Cookies from "universal-cookie";
import { useHistory } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Button, Form } from "react-bootstrap";
import Header from "../components/Header";
import { createCharge } from "../services/payment/charge";

import { profile } from "../services";

const Payment = () => {
  const history = useHistory();

  function goToCourses() {
    history.push("/courses");
  }

  const cookies = new Cookies();

  function onSubmit(event) {
    event.preventDefault();

    const payloadData = {
      charge: {
        description: "Curso 1",
        amount: 50,
        installments: 1,
        paymentTypes: ["CREDIT_CARD"],
      },
      billing: {
        name: event.target.name.value,
        document: event.target.document.value,
        email: event.target.email.value,
        address: {
          street: event.target.street.value,
          number: event.target.number.value,
          city: event.target.city.value,
          state: event.target.state.value,
          postCode: event.target.postCode.value,
        },
      },
    };
    const profileData = Object.create(null);
    Object.assign(profileData, {
      email: payloadData.billing.email,
      address: payloadData.billing.address,
    });

    createCharge(payloadData).then((response) => {
      if (response.status === 200) {
        cookies.set("chargeId", response.data.id, {
          path: "/charges",
        });
        cookies.set("email", payloadData.billing.email, {
          path: "/charges",
        });
        cookies.set("address", payloadData.billing.address, {
          path: "/charges",
        });
        console.log(profileData);
        console.log(payloadData);
        profile.addressUpdate(profileData);

        history.push("/charges/payment");
      }
    });
  }

  return (
    <Container>
      <Header />
      <h1>Payment</h1>
      <h2>Personal Data</h2>

      <form onSubmit={onSubmit}>
        <Row style={{ maxWidth: "500px" }}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Personal Information</Form.Label>
            <Form.Control
              name="name"
              type="text"
              placeholder="Enter your name"
              required
            />
            <Form.Control
              name="email"
              type="email"
              placeholder="Confirm your e-mail"
              required
            />
            <Form.Control
              name="document"
              type="number"
              placeholder="Enter your CPF"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Address</Form.Label>
            <Form.Control
              name="street"
              type="text"
              placeholder="Street"
              required
            />
            <Form.Control
              name="number"
              type="text"
              placeholder="Number"
              required
            />
            <Form.Control name="city" type="text" placeholder="City" required />
            <Form.Control
              name="state"
              type="text"
              placeholder="State"
              required
            />
            <Form.Control
              name="postCode"
              type="number"
              placeholder="PostCode"
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Continue
          </Button>
        </Row>
      </form>

      <br />
      <Button onClick={goToCourses} variant="outline-danger">
        Cancel Purchase
      </Button>
    </Container>
  );
};

export default Payment;
