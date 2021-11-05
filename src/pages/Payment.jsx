import React from "react";
import Cookies from "universal-cookie";
import { useHistory } from "react-router-dom";

import Header from "../components/Header";
import SweetAlert from "sweetalert2";
import { Alert } from "../components/Alert";

import { payment } from "../services/payment/payment";
import { cancelCharge } from "../services/payment/charge";
import { mailer, profile } from "../services";

const Payment = () => {
  const history = useHistory();

  const cookies = new Cookies();

  const email = cookies.get("email");
  const courseId = cookies.get("courseId");

  async function onSubmit(event) {
    event.preventDefault();

    const cardData = {
      cardNumber: event.target.cardNumber.value,
      holderName: event.target.holderName.value,
      securityCode: event.target.securityCode.value,
      expirationMonth: event.target.expirationMonth.value,
      expirationYear: event.target.expirationYear.value,
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

    const address = await profile.show({ email: email });

    const paymentData = {
      chargeId: chargeId,
      billing: {
        email: email,
        address: address.data.address[0],
        delayed: false,
      },
      creditCardDetails: {
        creditCardHash: await generateCardHash(),
      },
    };

    try {
      const createPayment = await payment(paymentData);

      mailer.purchase([{ email: email }]);
      profile.coursesUpdate({
        email: email,
        course: {
          details: courseId,
          paymentId: createPayment.data.id,
        },
      });
      cookies.remove("address");
      cookies.remove("chargeId");
      cookies.remove("courseId");
      cookies.remove("coursePrice");

      Alert(
        "success",
        "Purchase Success!",
        "You can access our platform now..."
      );
      setTimeout(() => {
        history.push("/login/profile");
        window.location.reload();
      }, 2000);
    } catch (err) {
      SweetAlert.fire({
        type: "error",
        title: "Opps... Something went wrong",
        text: "Try again later",
      });
    }
  }

  const chargeId = cookies.get("chargeId");
  async function cancelButton() {
    const cancelationData = {
      chargeId: chargeId,
    };

    try {
      const cancelation = await cancelCharge(cancelationData);

      if (cancelation.status === 204) {
        Alert(
          "success",
          "Purchase Canceled!",
          "You're going to our Courses Page..."
        );
        setTimeout(() => {
          history.push("/courses");
        }, 2000);
      }
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
        <h2 className="text-center">Payment</h2>
        <div className="w-25">
          <form onSubmit={onSubmit}>
            <div className="form-group mb-2">
              <h6>Credit Card Data</h6>

              <input
                name="cardNumber"
                type="number"
                className="cardData form-control mb-1"
                placeholder="Card Number"
                required
              />
              <input
                name="holderName"
                type="text"
                className="cardData form-control mb-1"
                placeholder="Holder Name"
                required
              />
              <input
                name="securityCode"
                type="number"
                className="cardData form-control mb-1"
                placeholder="Security Code"
                min="000"
                max="999"
                required
              />
              <input
                name="expirationMonth"
                type="number"
                className="cardData form-control mb-1"
                placeholder="Expiration Month"
                min="01"
                max="12"
                required
              />
              <input
                name="expirationYear"
                type="number"
                className="cardData form-control mb-3"
                placeholder="Expiration Year"
                min="2020"
                max="2100"
                required
              />
              <div className="d-flex justify-content-center">
                <button
                  onClick={cancelButton}
                  className="btn btn-outline-danger me-2"
                >
                  Cancel Purchase
                </button>
                <button className="btn btn-primary ms-2" type="submit">
                  Finish Purchase
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Payment;
