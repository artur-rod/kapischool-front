import React from "react";
import { createCourse } from "../services/courses";

import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Button, Form } from "react-bootstrap";
import { Alert } from "../components/Alert";

const CreateCourse = () => {
  async function onSubmit(event) {
    event.preventDefault();

    const courseCreationData = {
      name: event.target.courseName.value,
      keywords: [
        event.target.keyword1.value,
        event.target.keyword2.value,
        event.target.keyword3.value,
      ],
      description: event.target.description.value,
      price: event.target.price.value,
    };

    createCourse(courseCreationData).then((response) => {
      if (response.status === 200) {
        Alert("success", `Course ${event.target.courseName.value} created`, "");
      }
    });
  }

  return (
    <Container>
      <form onSubmit={onSubmit}>
        <Row style={{ "max-width": "500px" }}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <h2>Course Creation</h2>

            <Form.Control
              name="courseName"
              type="text"
              placeholder="Course Name"
              required
            />
            <Form.Control
              name="keyword1"
              type="text"
              placeholder="Keyword 1"
              required
            />
            <Form.Control name="keyword2" type="text" placeholder="Keyword 2" />
            <Form.Control name="keyword3" type="text" placeholder="Keyword 3" />
            <Form.Control
              name="description"
              type="text"
              placeholder="Description"
              required
            />
            <Form.Control
              name="price"
              type="number"
              placeholder="Price"
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Create Course
          </Button>
        </Row>
      </form>
    </Container>
  );
};

export default CreateCourse;
