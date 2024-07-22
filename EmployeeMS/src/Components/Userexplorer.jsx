import axios from "axios";
import React, { useEffect, useState } from "react";
import {useNavigate } from "react-router-dom";

const Userexplorer = () => {
    const [employee, setEmployee] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState("fe_it");
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
    }, [selectedTeam]);

    const handleSelectTeam = (team) => {
        setSelectedTeam(team);
    };

    return (
        <div classNameName="px-5 mt-3">
            <div classNameName="d-flex justify-content-center">
                <h3>Team Score List</h3>
            </div>
            
            <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
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
            <div class="mt-3">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Run</th>
                            <th>Wicket</th>
                            <th>4Run</th>
                            <th>6Run</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employee.map((e) => (
                            <tr>
                                <td>{e.name}</td>
                                <td>{e.run}</td>
                                <td>{e.wicket}</td>
                                <td>{e.run4}</td>
                                <td>{e.run6}</td>
                                <td>{e.role}</td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Userexplorer;
