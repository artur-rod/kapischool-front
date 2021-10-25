import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { useHistory } from "react-router-dom";
import { refund } from "../services/payment/payment";
import { profile } from "../services";

import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Button } from "react-bootstrap";
import SweetAlert from "sweetalert2";
import Header from "../components/Header";
import { Alert } from "../components/Alert";

const Profile = () => {
  const history = useHistory();

  const cookies = new Cookies();
  const confirmCookies = cookies.get("token");

  if (!confirmCookies) {
    Alert("warning", "Your're not logged", "Login to access our platform");
    setTimeout(() => history.push("/"), 2000);
  }

  const email = cookies.get("email");

  const [courses, setCourses] = useState([]);

  async function showProfile() {
    const userProfile = await profile.show({ email: email });
    setCourses(userProfile.data.courses);
  }
  useEffect(() => {
    showProfile();
  }, []);

  async function cancelPayment(event) {
    const paymentId = event.target.getAttribute("data-id");
    const amount = event.target.getAttribute("data-price");

    const refundData = [{ amount: amount }, { paymentId: paymentId }];
    const courseDeletionData = { email: email, paymentId: paymentId };

    try {
      await refund(refundData);
      await profile.deleteCourse(courseDeletionData);
      Alert("success", "Subscription canceled", "...");
      window.location.reload();
    } catch (err) {
      SweetAlert.fire({
        type: "error",
        title: "Opps... Something went wrong",
        text: "Try again later",
      });
    }
  }

  async function accessCourse(event) {
    const link = event.target.getAttribute("data-link");

    window.open(link, "_blank");
  }

  return (
    <Container>
      <Header />
      <h1>Profile</h1>

      <h2>My courses</h2>
      <div>
        <h3>Courses</h3> <br />
        {courses.map((course) => (
          <>
            <h4 id={course}>{course.details.name}</h4>
            <Button
              onClick={cancelPayment}
              data-id={course.paymentId}
              data-price={course.details.price}
              variant="outline-danger"
              style={{ marginRight: "10px" }}
            >
              Cancel Subscription
            </Button>
            <Button onClick={accessCourse} data-link={course.details.link}>
              Access course
            </Button>
            <br />
            <br />
          </>
        ))}
      </div>
    </Container>
  );
};

export default Profile;
