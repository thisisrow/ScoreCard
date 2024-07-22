import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const explor = () => {
    const [employee, setEmployee] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [category, setCategory] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        axios
            .get("http://localhost:3000/auth/category")
            .then((result) => {
                if (result.data.Status) {
                    setCategory(result.data.Result);
                } else {
                    alert(result.data.Error);
                }
            })
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        if(selectedTeam){
            axios
                .get(`http://localhost:3000/auth/team/${encodeURIComponent(selectedTeam)}`)
                .then((result) => {
                    if (result.data.Status) {
                        setEmployee(result.data.Result);
                    } else {
                        alert(result.data.Error);
                    }
                })
                .catch((err) => console.log(err));
        }
    }, [selectedTeam]);

    const handleSelectTeam = (team) => {
        setSelectedTeam(team);
    };
    const handleDelete = (id) => {
        axios.delete(`http://localhost:3000/auth/team/${encodeURIComponent(selectedTeam)}` + id)
            .then(result => {
                if (result.data.Status) {
                    window.location.reload()
                } else {
                    alert(result.data.Error)
                }
            })
    }
    return (
        <div className="px-3 mt-2">
            <div className="d-flex justify-content-center">
                <h3>Player List</h3>
            </div>

            <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle p-0" type="button" data-bs-toggle="dropdown" aria-expanded="false" >
                    Select Your team name
                </button>
                <ul className="dropdown-menu dropdown-menu-dark ">
                    {category.map((c) => {
                        return (
                            <li><p className={`dropdown-item ${selectedTeam === 'be_it' ? 'active' : ''}`} onClick={() => handleSelectTeam(c.name)}>{c.name}</p></li>
                        );
                    })}
                </ul>
            </div>
            <h3 class="text-uppercase">{selectedTeam}</h3>
            <div className="mt-3">
                <table className="table">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>name</th>
                            <th>run</th>
                            <th>wicket</th>
                            <th>4run</th>
                            <th>6run</th>
                            <th>role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employee.map((e) => (
                            <tr>
                                <td>{e.id}</td>
                                <td>{e.name}</td>
                                <td>{e.run}</td>
                                <td>{e.wicket}</td>
                                <td>{e.run4}</td>
                                <td>{e.run6}</td>
                                <td>{e.role}</td>
                                <td>
                                    <Link
                                        to={`/dashboard/edit_player/${e.id}?category=${selectedTeam}`}
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

export default explor;
