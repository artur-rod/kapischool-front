import React, { useState } from "react";
import Cookies from "universal-cookie";
import { useHistory } from "react-router-dom";

import { listAll } from "../services/payment/balance";
import { listCharges } from "../services/payment/charge";
import CreateCourse from "../components/CreateCourse";

import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Button } from "react-bootstrap";
import { Alert } from "../components/Alert";
import Header from "../components/Header";

export default function Balance() {
  const cookies = new Cookies();
  const confirmCookies = cookies.get("token");

  const history = useHistory();

  if (!confirmCookies) {
    Alert("warning", "Your're not logged", "Login to access our platform");
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

  const [charges, setCharges] = useState([]);
  async function showCharges() {
    try {
      const { data } = await listCharges();
      setCharges(data);
    } catch (err) {
      Alert("error", "Opps... Something went wrong", "Try again later");
    }
  }

  return (
    <Container>
      <Header />
      <h1>KapiSchool Dashboard</h1>

      <div className="saldo">
        <h2>Your balance</h2>
        <Button onClick={showBalance}>Show Balance</Button>

        <p>Em conta: R$ {balance.transferableBalance}</p>
        <p>A receber: R$ {balance.withheldBalance}</p>
      </div>

      <div className="listCharges">
        <h2>List charges</h2>
        <Button onClick={showCharges}>List</Button>

        {charges.map((charge) => (
          <li>
            <b>Charge Id:</b> {charge.id} <br />
            <b>Amount:</b> {charge.amount} <br />
            <b>Status:</b> {charge.status} <br />
            <b>Due date:</b> {charge.dueDate} <br />
            <br />
          </li>
        ))}
      </div>
      <br />
      <CreateCourse />
    </Container>
  );
}
