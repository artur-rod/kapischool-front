import api from "./api";

async function listAll() {
  const courses = api.get("/courses");
  return courses;
}

async function createCourse(body) {
  const createCourse = api.post("/courses", body);
  return createCourse;
}

export { listAll, createCourse };
