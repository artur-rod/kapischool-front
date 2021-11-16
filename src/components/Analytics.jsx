import React, { useEffect, useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import { analytics } from "../services";
import { Alert } from "./Alert";

const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState([]);
  async function showAnalytics() {
    try {
      const { data } = await analytics.events();
      setAnalyticsData(data.events);
    } catch (err) {
      Alert("error", "Opps... Something went wrong", "Try again later");
    }
  }
  useEffect(() => {
    showAnalytics();
  }, []);

  return (
    <div className="container-fluid p-3">
      {analyticsData.map((event) => (
        <div id={event.event}>
          <h6>{event.event} </h6>
          <div className="mb-2 ps-3">
            <p>
              Amount: {event.amount} <br />
              Percent change: {event.percent_change}
            </p>
          </div>
        </div>
      ))}
      <p>* Last 24 hours</p>
    </div>
  );
};

export default Analytics;
