import api from "./api";

const analytics = {
  events: async () => {
    const listEvents = await api.get("/analytics");
    return listEvents;
  },
};

export default analytics;
