import api from "./api";

async function listAll() {
  const balance = await api.get("/balance");
  return balance;
}

export { listAll };
