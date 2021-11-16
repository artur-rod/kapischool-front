import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { useHistory } from "react-router-dom";

import { listAll } from "../services/payment/balance";
import { listCharges } from "../services/payment/charge";
import CreateCourse from "../components/CreateCourse";

import "bootstrap/dist/css/bootstrap.min.css";
import { Alert } from "../components/Alert";
import Header from "../components/Header";
import Register from "../components/AdminRegister";
import Analytics from "../components/Analytics";

export default function Balance() {
  const history = useHistory();

  const cookies = new Cookies();
  const confirmCookies = !cookies.get("token");
  const confirmAdminCookies = !cookies.get("admin");
  console.log(confirmAdminCookies === confirmCookies);

  if (confirmAdminCookies !== confirmCookies) {
    Alert("warning", "Your don't have access here", "...");
    setTimeout(() => history.push("/"), 2000);
  }

  const [balance, setBalance] = useState([]);
  async function showBalance() {
    try {
      const { data } = await listAll();
      setBalance(data);
    } catch (err) {
      Alert("error", "Opps... Something went wrong", "Try again later");
    }
  }
  useEffect(() => {
    showBalance();
  }, []);

  const [charges, setCharges] = useState([]);
  async function showCharges() {
    try {
      const { data } = await listCharges();
      setCharges(data);
    } catch (err) {
      Alert("error", "Opps... Something went wrong", "Try again later");
    }
  }
  useEffect(() => {
    showCharges();
  }, []);

  const [registerPage, setRegisterPage] = useState(false);
  function employeeRegister() {
    setRegisterPage(true);
    setAnalyticsPage(false);
  }
  const [analyticsPage, setAnalyticsPage] = useState(false);
  function showAnalytics() {
    setAnalyticsPage(true);
    setRegisterPage(false);
  }

  return (
    <div>
      <Header />
      <div className="container-fluid mt-4 w-75">
        <div className="d-flex justify-content-between">
          <h2>Dashboard</h2>
          <div>
            <button className="btn btn-outline-primary" onClick={showAnalytics}>
              Analytics Data
            </button>
            <button
              className="btn btn-outline-primary ms-2"
              onClick={employeeRegister}
            >
              Employee registration
            </button>
          </div>
        </div>
        {!!registerPage && (
          <div className="d-flex container justify-content-center">
            <div className="mt-4 me-3 p-4 shadow rounded-3 d-flex flex-column align-items-center">
              <h3>Employee Registration</h3>
              <Register />
            </div>
          </div>
        )}

        {!!analyticsPage && (
          <div className="d-flex container justify-content-center">
            <div className="mt-4 me-3 p-4 shadow rounded-3 d-flex flex-column align-items-center">
              <h3>Analytics Data</h3>
              <Analytics />
            </div>
          </div>
        )}

        {!registerPage && !analyticsPage && (
          <div className="container-lg">
            <div className="row">
              <div className="col mt-4 me-3 p-3 container shadow rounded-3">
                <h3>Finances</h3>
                <div className="ps-3">
                  <h5>
                    Your Balance -{" "}
                    <span className="text-primary">
                      R$ {balance.transferableBalance}
                    </span>
                  </h5>
                </div>
                <div className="listCharges ps-3 pt-2 m-50">
                  <h5>Charges</h5>
                  <div
                    className="mh-75 overflow-auto bg-light rounded p-2"
                    style={{ maxHeight: "39vh" }}
                  >
                    {charges.map((charge) => (
                      <div>
                        <b>Id:</b> {charge.id} <br />
                        <b>Amount:</b> {charge.amount} <br />
                        <b>Status:</b> {charge.status} <br />
                        <b>Due date:</b> {charge.dueDate} <br />
                        <hr />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="col mt-4 ms-3 p-3 container shadow rounded-3">
                <CreateCourse />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
