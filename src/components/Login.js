import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom';

const Login = (props) => {
    let navigate = useNavigate();
    const[credentials, setCredentials] = useState({email: "", password: ""})

const handleSubmit = async (e)=>{
    e.preventDefault()
    const response = await fetch("http://localhost:5000/auth/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: credentials.email, password: credentials.password})
      });
      const json = await response.json()
      console.log(json)

      if(json.success){
        localStorage.setItem('token', json.authtoken);
        navigate("/")
        props.showAlert("Logged In Successfully", "success")
      }
      else{
        props.showAlert("Invalid Credentials", "danger")
      }
}

const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

    return (
        <div>
            <form onSubmit={handleSubmit} >
            <h2 className='my-3 mb-4'>Login to iNotebook</h2>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" value={credentials.email} name="email" onChange={onChange} aria-describedby="emailHelp" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} id="password" name='password' onChange={onChange} required/>
                </div>
                <button  type="submit" className="btn btn-danger" >Login</button>
            </form>
        </div>
    )
}

export default Login

