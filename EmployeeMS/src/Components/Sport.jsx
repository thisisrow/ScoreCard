import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Sport = () => {

    const [sport, setSport] = useState([])

    useEffect(()=> {
        axios.get('http://localhost:3000/auth/sport')
        .then(result => {
            if(result.data.Status) {
                setSport(result.data.Result);
            } else {
                alert(result.data.Error)
            }
        }).catch(err => console.log(err))
    }, [])
  return (
    <div className='px-5 mt-3'>
        <div className='d-flex justify-content-center'>
            <h3>Player List</h3>
        </div>
        <Link to="/dashboard/add_sport" className='btn btn-success'>Add Sport</Link>
        <div className='mt-3'>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        sport.map(s => (
                            <tr>
                                <td>{s.name}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>

    </div>
  )
}

export default Sport