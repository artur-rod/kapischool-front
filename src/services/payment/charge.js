import api from "../authenticated-api";

async function listCharges() {
  const charges = await api.get("/charges");
  return charges;
}

async function createCharge(body) {
  const charges = await api.post("/charges", body);
  return charges;
}

async function cancelCharge(body) {
  const cancelation = await api.put("/charges/cancelation", body);
  return cancelation;
}

export { listCharges, createCharge, cancelCharge };
