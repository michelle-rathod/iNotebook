import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom';

const Signup = (props) => {
  let navigate = useNavigate();
    const[credentials, setCredentials] = useState({name: "", email: "", password: "", cpassword: ""})

  const handleSubmit = async (e)=>{
    e.preventDefault()
    const response = await fetch("http://localhost:5000/auth/createuser", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: credentials.name ,email: credentials.email, password: credentials.password})
      });
      const json = await response.json()
      console.log(json)
      if(json.success){
        if(credentials.password!== credentials.cpassword){
          props.showAlert("Password and Confirm Password must match", "warning")
        }else{
        localStorage.setItem('token', json.authtoken);
        navigate("/")
        props.showAlert("Signed Up Successfully", "success")
        }
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
      <form onSubmit={handleSubmit}>
        <h2 className='my-3 mb-4'>Signup to start using iNotebook</h2>
      <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name='name' onChange={onChange} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name='email' onChange={onChange} aria-describedby="emailHelp" required />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name='password' onChange={onChange} value={[credentials.password]} required minLength={5} />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={onChange} value={credentials.cpassword} required minLength={5} />
        </div>
        <button type="submit" className="btn btn-danger">Signup</button>
      </form>
    </div>
  )
}

export default Signup
