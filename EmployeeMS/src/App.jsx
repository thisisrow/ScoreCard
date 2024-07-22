import './App.css'
// import './in.css'
// import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './Components/Login'
import {BrowserRouter, Routes, Route, useNavigate} from 'react-router-dom'
import Dashboard from './Components/Dashboard'
import Home from './Components/Home'
import Employee from './Components/Employee'
import Category from './Components/Category'
import Profile from './Components/Profile'
import AddCategory from './Components/AddCategory'
import AddEmployee from './Components/AddEmployee'
import EditEmployee from './Components/EditEmployee'
import Start from './Components/Start'
import EmployeeLogin from './Components/EmployeeLogin'
import EmployeeDetail from './Components/EmployeeDetail'
import PrivateRoute from './Components/PrivateRoute'
import UserPage from './Components/UserPage'
import AddSport from './Components/AddSport'
import Sport from './Components/Sport'
import Explor from './Components/Explor'
import Userexplorer from './Components/Userexplorer'
import Regester from './Components/Regester'
import EditPlayer from './Components/EditPlayer'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<UserPage />}></Route>
      <Route path='/start' element={<Start />}></Route>
      <Route path='/regester' element={<Regester />}></Route>
      <Route path='/adminlogin' element={<Login />}></Route>
      <Route path='/employee_login' element={<EmployeeLogin />}></Route>
      <Route path='/employee_detail/:id' element={<EmployeeDetail />}></Route>
      <Route path='/userexplorer' element={<Userexplorer />}></Route>
      <Route path='/dashboard' element={
        <PrivateRoute >
          <Dashboard />
        </PrivateRoute>
      }>
        <Route path='' element={<Home />}></Route>
        <Route path='/dashboard/employee' element={<Employee />}></Route>
        <Route path='/dashboard/explor' element={<Explor />}></Route>
        <Route path='/dashboard/category' element={<Category />}></Route>
        <Route path='/dashboard/sport' element={<Sport />}></Route>
        <Route path='/dashboard/profile' element={<Profile />}></Route>
        <Route path='/dashboard/add_category' element={<AddCategory />}></Route>
        <Route path='/dashboard/add_sport' element={<AddSport />}></Route>
        <Route path='/dashboard/add_employee' element={<AddEmployee />}></Route>
        <Route path='/dashboard/edit_employee/:id' element={<EditEmployee />}></Route>
        <Route path='/dashboard/edit_player/:id' element={<EditPlayer />}></Route>
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App