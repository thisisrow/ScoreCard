import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const addsport = () => {
    const [sport, setSport] = useState()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3000/auth/add_sport', {sport})
        .then(result => {
            if(result.data.Status) {
                navigate('/dashboard/add_sport')
            } else {
                alert(result.data.Error)
            }
        })
        .catch(err => console.log(err))
    }
  return (
    <div className='d-flex justify-content-center align-items-center h-75'>
        <div className='p-3 rounded w-25 border'>
            <h2>Sport</h2>
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor="category"><strong>Sport:</strong></label>
                    <input type="text" name='sport' placeholder='Enter sport'
                     onChange={(e) => setSport(e.target.value)} className='form-control rounded-0'/>
                </div>
                <button className='btn btn-success w-100 rounded-0 mb-2'>Add sport</button>
            </form>
        </div>
    </div>
  )
}

export default addsport