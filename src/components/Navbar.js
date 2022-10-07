import {React, useEffect} from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";


const Navbar = () => {
  let location = useLocation();
  useEffect(() => {
    console.log(location.pathname)
  }, [location]);
  let navigate = useNavigate();
  const handleLogout = () =>{
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <nav className="navbar navbar-expand-lg bg-dark" >
  <div className="container-fluid">
    <Link className="navbar-brand text-white" to="/"><strong>iNotebook</strong></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link text-light ${location.pathname==='/'?"text-decoration-underline":""}`} aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link text-light ${location.pathname==='/about'?"text-decoration-underline":""}`} to="/about">About</Link>
        </li>
      </ul>
      { !localStorage.getItem('token')? <form className='d-flex'>
      <Link className="btn btn-outline-light mx-2" to="/login" role="button">Login</Link>
      <Link className="btn btn-outline-light mx-2" to="/signup" role="button">Signup</Link>
      </form>:<button onClick={handleLogout} className='btn btn-outline-light'>Logout</button>}
    </div>
  </div>
</nav>
  )
}

export default Navbar
