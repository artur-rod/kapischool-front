import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { useHistory } from "react-router-dom";
import { refund } from "../services/payment/payment";
import { profile } from "../services";

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
  const [address, setAddress] = useState([]);
  const [myProfile, setMyProfile] = useState(null);

  async function showProfile() {
    const userProfile = await profile.show({ email: email });
    setCourses(userProfile.data.courses);
    setMyProfile(userProfile.data.user);
    setAddress(userProfile.data.address[0]);
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
    <>
      <Header />
      <div className="container-fluid mt-4 w-75">
        {!!myProfile && (
          <>
            <h2>{myProfile.name}</h2>
            <div className="container">
              <div className="row">
                <div className="col mt-4 me-4 p-3 container shadow rounded-3">
                  <h3>My Courses</h3>
                  <div className="mt-3 ps-4">
                    {courses.map((course) => (
                      <>
                        <h5 id={course}>{course.details.name}</h5>
                        <button
                          onClick={cancelPayment}
                          data-id={course.paymentId}
                          data-price={course.details.price}
                          className="btn btn-outline-danger"
                          style={{ marginRight: "10px" }}
                        >
                          Cancel Subscription
                        </button>
                        <button
                          onClick={accessCourse}
                          data-link={course.details.link}
                          className="btn btn-primary"
                        >
                          Access course
                        </button>
                        <br />
                        <br />
                      </>
                    ))}
                  </div>
                </div>
                <div className="col mt-4 ms-4 p-3 container shadow rounded-3 ">
                  <h3>My Profile</h3>
                  <div className="mt-3 ps-4">
                    <h5>Email:</h5>
                    <p className="ps-4">{myProfile.email}</p>
                    <h5>Address:</h5>
                    <p className="ps-4 m-0">
                      <b>City:</b> {address.city}
                    </p>
                    <p className="ps-4 m-0">
                      <b>Number:</b> {address.number}
                    </p>
                    <p className="ps-4 m-0">
                      <b>Post Code:</b> {address.postCode}
                    </p>
                    <p className="ps-4 m-0">
                      <b>State:</b> {address.state}
                    </p>
                    <p className="ps-4 m-0">
                      <b>Street:</b> {address.street}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Profile;
