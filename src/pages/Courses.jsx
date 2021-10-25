import React, { useEffect, useState } from "react";
import { listAll } from "../services/courses";

import { useHistory } from "react-router-dom";
import Cookies from "universal-cookie";

import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Card, Button, Col, Row } from "react-bootstrap";
import Header from "../components/Header";
import SweetAlert from "sweetalert2";
import { Alert } from "../components/Alert";

const Courses = () => {
  const cookies = new Cookies();
  const confirmCookies = cookies.get("token");

  const history = useHistory();

  if (!confirmCookies) {
    Alert("warning", "Your're not logged", "Login to access our platform");
    setTimeout(() => history.push("/"), 2000);
  }

  function goToHome() {
    history.push("/");
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
    <Container>
      <Header />

      <h1>Courses</h1>
      <h2>Choose your course...</h2>

      <Row>
        {courses.map((course) => (
          <Col md>
            <Card
              key={course.name}
              style={{
                minHeight: "270px",
                minWidth: "250px",
              }}
            >
              <Card.Body>
                <Card.Title>{course.name}</Card.Title>
                <Card.Text>
                  {course.description}
                  {course.keywords.map((word) => (
                    <>
                      {" "}
                      <br />
                      <span>✔{word} </span>{" "}
                    </>
                  ))}
                  <br />
                  <p>{course.price}</p>
                </Card.Text>
                <Button
                  onClick={goToCharges}
                  data-id={course._id}
                  data-price={course.price}
                  variant="success"
                >
                  Purchase
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <br />
      <Button onClick={goToHome} variant="outline-secondary">
        Voltar
      </Button>
    </Container>
  );
};

export default Courses;
