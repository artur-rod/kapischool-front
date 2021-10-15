import api from "../api";

async function userRegistration(body) {
  const register = await api.post("/user/register", body);
  return register;
}

async function userLogin(body) {
  const login = await api.post("/user/login", body);
  return login;
}

async function adminRegistration(body) {
  const register = await api.post("/admin/register", body);
  return register;
}

async function adminLogin(body) {
  const login = await api.post("/admin/login", body);
  return login;
}

export { userRegistration, userLogin, adminRegistration, adminLogin };
