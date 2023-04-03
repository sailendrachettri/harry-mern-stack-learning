import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = () => {

    // states
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", confirmPassword: "" })

    // variables
    const host = 'http://localhost:5000'
    let navigate = useNavigate()

    // methods
    const handleSubmit = async (e) => {
        e.preventDefault()

        const url = `${host}/api/auth/createuser`

        const { name, email, password } = credentials

        const response = await fetch(url, {

            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        })
        const json = await response.json()
        console.log(json);

        if (json.success) {
            // save the auth token and redirect
            localStorage.setItem('token', json.authtoken)
            navigate("/")
        }
        else {
            alert("Invalid credentials")
        }

    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">name</label>
                        <input type="text" className="form-control" id="name" name='name' aria-describedby="emailHelp" onChange={onChange} minLength={3} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" name='password' onChange={onChange} minLength={5} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="confirmPassword" className="form-label"> Confirm Password</label>
                        <input type="password" className="form-control" id="confirmPassword" name='confirmPassword' onChange={onChange} minLength={5} required />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </>
    )
}

export default Signup