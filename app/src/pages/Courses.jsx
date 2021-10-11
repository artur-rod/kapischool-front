import React, { useEffect, useState } from "react";
import { listAll } from "../services/courses";

import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";

import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Card, Button, Col, Row } from "react-bootstrap";
import Header from "../components/Header";
import { Alert } from "../components/Alert";

const Courses = () => {
  const confirmCookies = useCookies("token")[0].token;

  const history = useHistory();

  if (!confirmCookies) {
    Alert("warning", "Your're not logged", "Login to access our platform");
    setTimeout(() => history.push("/"), 2000);
  }

  function goToHome() {
    history.push("/");
  }

  function goToCharges() {
    history.push("/charges");
    window.location.reload();
  }

  const [courses, setCourses] = useState([]);
  async function listCourses() {
    const { data } = await listAll();
    setCourses(data);
  }
  useEffect(() => {
    listCourses();
  }, []);

  return (
    <Container>
      <Header />

      <h1>Courses</h1>
      <h2>Choose your course...</h2>

      <Row>
        {courses.map((course) => (
          <Col md>
            <Card key={course._id}>
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
                <Button onClick={goToCharges} variant="success">
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
