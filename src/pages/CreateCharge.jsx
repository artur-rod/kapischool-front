import React from "react";
import Cookies from "universal-cookie";
import { useHistory } from "react-router-dom";
import { createCharge } from "../services/payment/charge";
import { profile, CEP } from "../services";

import SweetAlert from "sweetalert2";
import Header from "../components/Header";

const Payment = () => {
  const history = useHistory();

  function goToCourses() {
    history.push("/courses");
  }

  const cookies = new Cookies();

  function searchCEP(event) {
    event.preventDefault();
    const cepInput = document.getElementsByClassName("address")[0].value;

    const cep = {
      cep: cepInput,
    };

    CEP.get(cep).then((response) => {
      document.getElementsByClassName("address")[1].value = response.data.end;
      document.getElementsByClassName("address")[2].value =
        response.data.cidade;
      document.getElementsByClassName("address")[3].value = response.data.uf;
    });
  }

  async function onSubmit(event) {
    event.preventDefault();

    const price = await cookies.get("coursePrice");
    const courseId = await cookies.get("courseId");

    const payloadData = {
      charge: {
        description: `Curso ID: ${courseId}`,
        amount: price,
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

    try {
      const charge = await createCharge(payloadData);

      cookies.set("chargeId", charge.data.id, {
        path: "/charges",
      });
      await profile.addressUpdate(profileData);

      history.push("/charges/payment");
    } catch (err) {
      SweetAlert.fire({
        type: "error",
        title: "Opps... Something went wrong",
        text: "Try again later",
      });
    }
  }

  return (
    <>
      <Header />
      <div className="container-fluid mt-4 d-flex flex-column align-items-center">
        <h2>Payment</h2>
        <div className="w-75 container">
          <form onSubmit={onSubmit}>
            <div className="row">
              <div className="form-group mb-4 col">
                <h6 className="mb-3">Personal Information</h6>
                <input
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  className="form-control mb-1"
                  required
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Confirm your e-mail"
                  className="form-control mb-1"
                  required
                />
                <input
                  name="document"
                  type="number"
                  placeholder="Enter your CPF"
                  className="form-control"
                  required
                />
              </div>
              <div className="col">
                <h6 className="mb-3">Address</h6>
                <div className="d-flex mb-1">
                  <input
                    name="postCode"
                    type="number"
                    placeholder="Post Code"
                    className="me-1 form-control address"
                    required
                  />
                  <button className="btn btn-primary" onClick={searchCEP}>
                    Search
                  </button>
                </div>
                <input
                  name="street"
                  type="text"
                  placeholder="Street"
                  className="form-control address mb-1"
                  required
                />
                <input
                  name="number"
                  type="text"
                  placeholder="Number"
                  className="form-control mb-1"
                  required
                />
                <input
                  name="city"
                  type="text"
                  placeholder="City"
                  className="form-control address mb-1"
                  required
                />
                <input
                  name="state"
                  type="text"
                  placeholder="State"
                  className="form-control address"
                  required
                />
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col"></div>
              <button
                onClick={goToCourses}
                className="btn btn-outline-danger w-25 me-4"
              >
                Cancel Purchase
              </button>
              <button className="btn btn-primary w-25" type="submit">
                Continue Purchace
              </button>
              <div className="col"></div>
            </div>
          </form>
        </div>

        <br />
      </div>
    </>
  );
};

export default Payment;
