import api from "../api";

const mailer = {
  registration: async (body) => {
    const registrationMail = await api.post("/email/registration", body);
    return registrationMail;
  },

  purchase: async (body) => {
    const purchaseMail = await api.post("/email/purchase", body);
    return purchaseMail;
  },
};

export default mailer;
