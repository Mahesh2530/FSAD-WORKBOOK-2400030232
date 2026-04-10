import axios from "axios";

const API = "http://localhost:8080/students";

export const getStudents = () => axios.get(API);
export const addStudent = (student) => axios.post(API, student);
export const deleteStudent = (id) => axios.delete(`${API}/${id}`);