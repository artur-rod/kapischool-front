import React, { useEffect, useState } from "react";
import { listAll } from "../services/courses";

import { useHistory } from "react-router-dom";
import Cookies from "universal-cookie";

import Header from "../components/Header";
import SweetAlert from "sweetalert2";

const Courses = () => {
  const cookies = new Cookies();
  const confirmCookies = cookies.get("token");

  const history = useHistory();

  if (!confirmCookies) {
    SweetAlert.fire({
      type: "warning",
      title: "Your're not logged",
      text: "Login to access our platform",
    });
    setTimeout(() => history.push("/"), 2000);
  }

  const [courses, setCourses] = useState([]);
  async function listCourses() {
    if (confirmCookies) {
      try {
        const { data } = await listAll();
        setCourses(data);
      } catch (err) {
        SweetAlert.fire({
          type: "error",
          title: "Opps... Something went wrong",
          text: "Try again later",
        });
      }
    }
  }
  useEffect(() => {
    listCourses();
  }, []);

  function goToCharges(event) {
    const courseId = event.target.getAttribute("data-id");
    const coursePrice = event.target.getAttribute("data-price");
    cookies.set("courseId", courseId, {
      path: "/",
    });
    cookies.set("coursePrice", coursePrice, {
      path: "/",
    });
    history.push("/charges");
    window.location.reload();
  }

  return (
    <>
      <Header />
      <div className="container-fluid mt-4 d-flex flex-column align-items-center">
        <h2 className="text-center mb-4">Choose your course...</h2>

        <div className="d-flex w-75">
          {courses.map((course) => (
            <div class="card w-50 mx-3">
              <div
                class="card-body d-flex flex-column justify-content-evenly"
                id={course.name}
                style={{
                  minHeight: "270px",
                  minWidth: "250px",
                }}
              >
                <h5 className="sticky-top">{course.name}</h5>
                <div>
                  <p>{course.description}</p>
                  {course.keywords.map((word) => (
                    <li
                      style={{
                        listStyleType: "none",
                      }}
                    >
                      <span>✔ {word}</span>
                    </li>
                  ))}
                  <br />
                  <h6>R$ {course.price}</h6>
                </div>
                <button
                  className="bottom btn btn-success"
                  onClick={goToCharges}
                  data-id={course._id}
                  data-price={course.price}
                >
                  Purchase
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Courses;
