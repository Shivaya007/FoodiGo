import React, { useState } from 'react'

       
import { Link, useNavigate } from 'react-router-dom'

export default function Login(){

  const [credentials, setcredentials] = useState({ email: "", password: "" })
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("${process.env.REACT_APP_BACKEND_URL}api/loginuser", {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    }
    );
    const json = await response.json()
    console.log(json);
    if (!json.success) {
      alert("Enter valid credential")
    }
    if (json.success) {
      localStorage.setItem("authToken",json.authToken)
      console.log(localStorage.getItem("authToken"));
       navigate("/");
    }
              
  }
  const onChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value })
  }
  return (




    <div><div className='container'>
      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={onChange} />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={onChange} />
        </div>

        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" n />
          <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/CreateUser" className='m-3 btn btn-danger'>I'm a new user</Link>

      </form></div></div>
  )
}
