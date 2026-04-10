import React, { useState } from "react";
import { addStudent, updateStudent } from "../services/api";

const AddStudent = ({ triggerRefresh }) => {

  const [student, setStudent] = useState({
    id: null,
    name: "",
    email: "",
    course: ""
  });

  const [isEdit, setIsEdit] = useState(false);

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {

    await addStudent(student);

    setStudent({
      id: null,
      name: "",
      email: "",
      course: ""
    });

    triggerRefresh();   // refresh table

  } catch (error) {
    console.error(error);
  }
};

  return (
    <div>
      <h2>{isEdit ? "Update Student" : "Add Student"}</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={student.name}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          placeholder="Email"
          value={student.email}
          onChange={handleChange}
          required
        />

        <input
          name="course"
          placeholder="Course"
          value={student.course}
          onChange={handleChange}
          required
        />

        <button type="submit">
          {isEdit ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
};

export default AddStudent;