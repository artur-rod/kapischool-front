import React from "react";
import { createCourse } from "../services/courses";

import SweetAlert from "sweetalert2";
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
      link: event.target.link.value,
    };

    try {
      await createCourse(courseCreationData);
      Alert("success", `Course ${event.target.courseName.value} created`, "");
    } catch (err) {
      SweetAlert.fire({
        type: "error",
        title: "Opps... Something went wrong",
        text: "Try again later",
      });
    }
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div style={{ "max-width": "500px" }}>
          <h3>Course Creation</h3>
          <div className="p-3 text-center">
            <div className="form-group mb-1">
              <input
                name="courseName"
                type="text"
                placeholder="Course Name"
                required
                className="form-control"
              />
            </div>
            <div className="form-group mb-1">
              <input
                name="keyword1"
                type="text"
                placeholder="Keyword 1"
                required
                className="form-control"
              />
            </div>
            <div className="form-group mb-1">
              <input
                name="keyword2"
                type="text"
                placeholder="Keyword 2"
                required
                className="form-control"
              />
            </div>
            <div className="form-group mb-1">
              <input
                name="description"
                type="text"
                placeholder="Description"
                required
                className="form-control"
              />
            </div>
            <div className="form-group mb-1">
              <input
                name="price"
                type="number"
                placeholder="Price"
                required
                className="form-control"
              />
            </div>
            <div className="form-group mb-2">
              <input
                name="link"
                type="text"
                placeholder="Link"
                required
                className="form-control"
              />
            </div>

            <button className="btn btn-primary custom" type="submit">
              Create Course
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateCourse;
