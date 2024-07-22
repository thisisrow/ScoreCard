import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Regester = () => {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    password: "",
    salary: "",
    address: "",
    category_id: "",
    sport_id:""
  });
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sport, setSport] = useState([]);
  const [employeeTotal, setemployeeTotal] = useState(0)
  const navigate = useNavigate()
  // useEffect(() => {
  //   employeeCount();
  // }, [])
  useEffect(() => {
    employeeCount();
  }, [selectedCategory])

  const employeeCount = () => {
    const category_name = category.find(item=>item.id===Number(selectedCategory))?.name;
    
    if(category_name){
      axios.get(`http://localhost:3000/auth/player_count/${category_name}`)
      .then(result => {
        if(result.data.Status) {
          setemployeeTotal(result.data.Result[0].employee)
        }
      })
    }
  }

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
      .get("http://localhost:3000/auth/sport")
      .then((result) => {
        if (result.data.Status) {
          setSport(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault()
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(employee.password)) {
    alert("Please enter a strong password. should have capital ,small ,number ,caracter and Atlest length should be 8  ");
    return;
  }else{
    if(employeeTotal === 11){ 
    alert("Team is filled Talk to Admin.\nThanks to regester.\nOr select other team " );
    return;
    }
    alert("Submitted");
    const formData = new FormData();
    formData.append('name', employee.name);
    formData.append('email', employee.email);
    formData.append('password', employee.password);
    formData.append('address', employee.address);
    formData.append('salary', employee.salary);
    formData.append('category_id', employee.category_id);
    formData.append('sport_id', employee.sport_id);
    const payload = {
      name: employee.name,
      email: employee.email,
      password: employee.password,
      address: employee.address,
      salary: employee.salary,
      category_id: Number(selectedCategory),
      sport_id: employee.sport_id
    }
    
    axios.post('http://localhost:3000/auth/add_employee', payload)
    .then(result => {
        if(result.data.Status) {
            navigate('/dashboard/employee')
        } else {
            alert(result.data.Error)
        }
    })
    .catch(err => console.log(err))
  
    const category_name = category.find(item=>item.id===Number(selectedCategory))?.name;
    axios.post('http://localhost:3000/auth/player_team', {category: category_name, name: employee.name, role:employee.role})
    .then(result => {
        if(result.data.Status) {
            navigate('/dashboard/employee')
        } else {
            alert(result.data.Error)
        }
    })
    .catch(err => console.log(err))
  }
  
}

  return (
    <div className="d-flex justify-content-center align-items-center " style={{ backgroundImage: `url(./photo-1475440197469-e367ec8eeb19.jpeg)`,backgroundSize: 'cover',backgroundRepeat: 'no-repeat',backgroundPosition: 'center',width: '100%' ,}}>
      <div className="p-3 rounded w-50 border mt-3" style={{boxShadow: 'rgba(0, 0, 0, 0.3) 0px 10px 20px'}}>
        <h3 className="text-center">Register</h3>
        
        <form className="row g-1 fs-5 fw-bold" onSubmit={handleSubmit} style={{color:'white'}}>
          <div className="col-12">
            <label for="inputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputName"
              placeholder="Enter Name"
              onChange={(e) =>
                setEmployee({ ...employee, name: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputEmail4" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control rounded-0"
              id="inputEmail4"
              placeholder="Enter Email"
              autoComplete="off"
              onChange={(e) =>
                setEmployee({ ...employee, email: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputPassword4" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control rounded-0"
              id="inputPassword4"
              placeholder="Enter Password"
              onChange={(e) =>
                setEmployee({ ...employee, password: e.target.value })
              }
            />
            <label for="inputSalary" className="form-label">
              Fees
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputSalary"
              placeholder="Enter Fees"
              autoComplete="off"
              onChange={(e) =>
                setEmployee({ ...employee, salary: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputAddress" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputAddress"
              placeholder="Station"
              autoComplete="off"
              onChange={(e) =>
                setEmployee({ ...employee, address: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="category" className="form-label">
              Department and Year
            </label>
            <select name="category" id="category" className="form-select"
                onChange={(e) => setSelectedCategory(e.target.value)}>
                  <option value="" selected disabled>
                  Select...
                </option>
              {category.map((c) => {
                return <option value={c.id}>{c.name}</option>;
              })}
            </select>
            <div className='d-flex justify-content p-2 '>
            <h5>Total:</h5>
            <h5>{employeeTotal}</h5>
          </div>
          </div>
          <div className="col-12">
            <label for="sport" className="form-label">
              Sport
            </label>
            <select name="sport" id="sport" className="form-select"
                onChange={(e) => setEmployee({...employee, sport_id: e.target.value})}>
                  <option value="" selected disabled>
                  Select...
                </option>
              {sport.map((s) => {
                return <option value={s.id}>{s.name}</option>;
              })}
            </select>
            
          </div>
          <div className="col-12">
            <label for="sport" className="form-label">
              Role
            </label>
            <select name="role" id="role" className="form-select" onChange={(e) => setEmployee({...employee, role: e.target.value})}>
                  <option value="null" selected disabled>Select...</option>
                  <option value="All-rounder"  >All-rounder</option>
                  <option value="Batsman"  >Batsman</option>
                  <option value="Bowler"  >Bowler</option>
            </select>
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
            Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Regester;