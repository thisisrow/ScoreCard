import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Employee = () => {
  const [employee, setEmployee] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/employee")
      .then((result) => {
        if (result.data.Status) {
          setEmployee(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  const handleDelete = (id) => {
    axios.delete('http://localhost:3000/auth/delete_employee/'+employee.id)
    .then(result => {
        if(result.data.Status) {
            window.location.reload()
        } else {
            alert(result.data.Error)
        }
    })
  } 
  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>Player List</h3>
      </div>
      <Link to="/dashboard/add_employee" className="btn btn-success">
        Add Player
      </Link>
      <div className="mt-3">
      <table className="table">
  <thead>
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th>Address</th>
      <th>Fees</th>
      <th>Category Name</th> {/* Updated column header */}
      <th>Sport Name</th> {/* Updated column header */}
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    {employee.map((e) => (
      <tr key={e.employee_id}>
        <td>{e.employee_name}</td>
        <td>{e.email}</td>
        <td>{e.address}</td>
        <td>{e.salary}</td>
        <td>{e.category_name}</td> {/* Display category name */}
        <td>{e.sport_name}</td> {/* Display sport name */}
        <td>
          <Link
            to={`/dashboard/edit_employee/` + e.employee_id} 
            className="btn btn-info btn-sm me-2"
          >
            Edit
          </Link>
          <button
            className="btn btn-warning btn-sm"
            onClick={() => handleDelete(e.id)}
          >
            Delete
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

      </div>
    </div>
  );
};

export default Employee;
