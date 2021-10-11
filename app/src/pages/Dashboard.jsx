import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";

import { listAll } from "../services/balance";
import { listCharges } from "../services/charge";
import CreateCourse from "../components/CreateCourse";

import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Button } from "react-bootstrap";
import { Alert } from "../components/Alert";
import Header from "../components/Header";

export default function Balance() {
  const confirmCookies = useCookies("token")[0].token;

  const history = useHistory();

  if (!confirmCookies) {
    Alert("warning", "Your're not logged", "Login to access our platform");
    setTimeout(() => history.push("/"), 2000);
  }

  const [balance, setBalance] = useState([]);
  async function showBalance() {
    const { data } = await listAll();
    setBalance(data);
  }
  const [charges, setCharges] = useState([]);
  async function showCharges() {
    const { data } = await listCharges();
    setCharges(data);
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
