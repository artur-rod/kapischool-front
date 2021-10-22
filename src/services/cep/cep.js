import api from "../api";

const CEP = {
  get: async (cep) => {
    const getCEP = await api.post("/address", cep);
    return getCEP;
  },
};

export default CEP;
