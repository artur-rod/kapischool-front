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

  deleteCourse: async (body) => {
    const deletion = await api.put("/profile/courses", body);
    return deletion;
  },

  show: async (body) => {
    const showProfile = await api.post("/profile", body);
    return showProfile;
  },
};

export default profile;
