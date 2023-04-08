import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {

    // states
    const [credentials, setCredentials] = useState({ email: "", password: "" })

    // variables

    const host = 'http://localhost:5000'
    let navigate = useNavigate()

    // methods
    const handleSubmit = async (e) => {
        e.preventDefault()

        const url = `${host}/api/auth/login`

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        })
        const json = await response.json()
        console.log(json);

        if (json.success) {
            // save the auth token and redirect
            localStorage.setItem('token', json.authtoken)
            navigate("/")
            props.showAlert("Logged in successfully", "success")
        }
        else {
            props.showAlert("Invalid details", "danger")
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' value={credentials.password} onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-outline-success">Login</button>
            </form>
        </>
    )
}

export default Login