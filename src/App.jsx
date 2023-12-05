import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    name: "",
    age: "",
    class: "",
    dateofbirth:""
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/students")
      .then((response) => setStudents(response.data))
      .catch((error) => console.error(error));
  }, []);

  const addStudent = () => {
    axios
      .post("http://localhost:3001/api/students", newStudent)
      .then((response) => setStudents([...students, response.data]))
      .catch((error) => console.error(error));
  };

  const deleteStudent = (id) => {
    axios
      .delete(`http://localhost:3001/api/students/${id}`)
      .then(() =>
        setStudents(students.filter((student) => student._id !== id))
      )
      .catch((error) => console.error(error));
  };

  const updateStudent = (id, updatedStudent) => {
    axios
      .put(`http://localhost:3001/api/students/${id}`, updatedStudent)
      .then((response) =>
        setStudents(
          students.map((student) =>
            student._id === id ? response.data : student
          )
        )
      )
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h1>Student Management System</h1>
      <div>
        <h2>Add New Student</h2>
        <input
          type="text"
          placeholder="Name"
          onChange={(e) =>
            setNewStudent({ ...newStudent, name: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Age"
          onChange={(e) =>
            setNewStudent({ ...newStudent, age: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="class"
          onChange={(e) =>
            setNewStudent({ ...newStudent, class: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="dateofbirth"
          onChange={(e) =>
            setNewStudent({ ...newStudent, class: e.target.value })
          }
        />
        <button onClick={addStudent}>Add Student</button>
      </div>
      <ul>
        {students.map((student) => (
          <li key={student._id}>
            {student.name}, {student.age} years old, class: {student.class}, DOB:{student.dateofbirth}
            <button onClick={() => deleteStudent(student._id)}>Delete</button>
            <button
              onClick={() =>
                updateStudent(student._id, { name: "Updated Name" })
              }
            >
              Update
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
