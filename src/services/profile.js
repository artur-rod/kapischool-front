import api from "./authenticated-api";

const profile = {
  addressUpdate: async (body) => {
    const update = await api.post("/profile/address", body);
    return update;
  },

  coursesUpdate: async (body) => {
    const update = await api.post("/profile/courses", body);
    return update;
  },
};

export default profile;
