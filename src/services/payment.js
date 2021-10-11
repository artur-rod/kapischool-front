import api from "./api";

async function payment(body) {
  const newPayment = await api.post("/payment", body);
  return newPayment;
}

async function refund(body) {
  const newRefund = await api.post("/payment/refund", body);
  return newRefund;
}

export { payment, refund };
