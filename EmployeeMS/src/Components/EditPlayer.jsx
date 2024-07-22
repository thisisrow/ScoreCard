import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'


const EditEmployee = (props) => {
    const {id} = useParams()
    const [searchParams, setSearchParams] = useSearchParams();
    const editCategory = searchParams.get('category');
    const [employee, setEmployee] = useState({
        name: "",
        run: "",
        wicket: "",
        run4: "",
        run6: "",
        role:"",
      });
      const [category, setCategory] = useState([])
      const [sport, setSport] = useState([])
      const navigate = useNavigate()

      useEffect(()=> {
        axios.get(`http://localhost:3000/auth/edit_team_player/${id}?category=${editCategory}`)
        .then(result => {
            setEmployee({
                ...employee,
                name: result.data.Result[0].name,
                run: result.data.Result[0].run,
                wicket: result.data.Result[0].wicket,
                run4: result.data.Result[0].run4,
                run6: result.data.Result[0].run6,
                role: result.data.Result[0].role,
            })
        }).catch(err => console.log(err))
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
          name: employee.name,
          run: employee.run,
          wicket: employee.wicket,
          run4: employee.run4,
          run6: employee.run6,
          role: employee.role,
        }
        console.log(employee);
        console.log(payload);


        axios.put(`http://localhost:3000/auth/edit_team_player/${id}?category=${editCategory}`, payload)
        .then(result => {
            if(result.data.Status) {
                navigate('/dashboard/explor')
            } else {
                alert(result.data.Error)
            }
        }).catch(err => console.log(err))
    }
    
  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Edit Player</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label htmlFor="inputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputName"
              placeholder="Enter Name"
              value={employee.name}
              onChange={(e) =>
                setEmployee({ ...employee, name: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputEmail4" className="form-label">
              Run
            </label>
            <input
              type='text'
              className="form-control rounded-0"
              id="inputEmail4"
              autoComplete="off"
              value={employee.run}
              onChange={(e) =>
                setEmployee({ ...employee, run: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputEmail4" className="form-label">
              Wicket
            </label>
            <input
              type='text'
              className="form-control rounded-0"
              id="inputEmail4"
              autoComplete="off"
              value={employee.wicket}
              onChange={(e) =>
                setEmployee({ ...employee, wicket: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputEmail4" className="form-label">
              4 Run
            </label>
            <input
              type='text'
              className="form-control rounded-0"
              id="inputEmail4"
              autoComplete="off"
              value={employee.run4}
              onChange={(e) =>
                setEmployee({ ...employee, run4: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputEmail4" className="form-label">
             6 Run
            </label>
            <input
              type='text'
              className="form-control rounded-0"
              id="inputEmail4"
              autoComplete="off"
              value={employee.run6}
              onChange={(e) =>
                setEmployee({ ...employee, run6: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputEmail4" className="form-label">
              Role
            </label>
            <input
              type='text'
              className="form-control rounded-0"
              id="inputEmail4"
              autoComplete="off"
              value={employee.role}
              onChange={(e) =>
                setEmployee({ ...employee, role: e.target.value })
              }
            />
          </div>
          
          
          
          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Edit Player
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditEmployee