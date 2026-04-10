import React, { useEffect, useState } from "react";
import { getStudents, deleteStudent } from "../services/api";

const StudentList = ({ refresh, triggerRefresh }) => {

  const [students, setStudents] = useState([]);

  const loadStudents = async () => {
    const res = await getStudents();
    setStudents(res.data);
  };

  useEffect(() => {
    loadStudents();
  }, [refresh]);   // reload when refresh changes

  const handleDelete = async (id) => {
    await deleteStudent(id);
    triggerRefresh();
  };

  return (
    <div>
      <h2>Student List</h2>

      <table border="1" cellPadding="10">

        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Course</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
  {students && students.length > 0 ? (
    students.map((s) => (
      <tr key={s.id}>
        <td>{s.id}</td>
        <td>{s.name}</td>
        <td>{s.email}</td>
        <td>{s.course}</td>
        <td>
          <button onClick={() => handleDelete(s.id)}>Delete</button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="5">No Students Available</td>
    </tr>
  )}
</tbody>

      </table>

    </div>
  );
};

export default StudentList;