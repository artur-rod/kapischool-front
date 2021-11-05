import api from "../authenticated-api";

async function listAll() {
  const balance = await api.get("/balance");
  return balance;
}

export { listAll };
