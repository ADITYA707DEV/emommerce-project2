import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"
import { setToken } from '../redux/tokenSlice'
import image1 from "../images/loginImage.png"
import { Link } from 'react-router-dom'
import { useState } from 'react'
import Alerts from './Alerts'


function SKLogin() {
  const navigate = useNavigate()

  const Dispatch = useDispatch()
  const [showAlert, setShowAlert] = useState({ show: false, text: null, colour: null })

  const [userCredentials, setCredentials] = useState({ email: "", password: "" })



  const handleChange = (e) => {

    setCredentials({ ...userCredentials, [e.target.name]: e.target.value })


  }
  const handleOnSubmit = async (event) => {

    event.preventDefault()




    const response = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
      body: JSON.stringify({
        email: userCredentials.email,
        password: userCredentials.password
      })
    })

    const res = await response.json()



    if (response.status == 200) {



      Dispatch(setToken(true))
      navigate("/includeitems")
      setShowAlert({show:true,text:res.message,colour:"success"})
      
    }else{     setShowAlert({show:true,text:res.message,colour:"danger"})}

  }
  return (
  <>
   {showAlert.show&&<Alerts  colour={showAlert.colour} text={showAlert.text} setShowAlert={setShowAlert} show = {showAlert.show}></Alerts>}
    <div className='d-flex  '>
      <div className='container ' >
        <div className=' d-flex align-items-center justify-content-center flex-column'>
          <img src={image1} alt="notfound" />
          <h3>shopKeeper login</h3>
        </div>
        <form onSubmit={handleOnSubmit} >
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label fw-bolder">email address</label>
            <input type="email" className="form-control" id="email" onChange={handleChange} name='email' />

          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label fw-bolder">password</label>
            <input type="password" className="form-control" id="Password" onChange={handleChange} name='password' />
          </div>

          <button type="submit" className="btn btn-primary" >submit</button>
        </form>
        <div><Link to='/login' className='container_fluid d-flex align-items-center justify-content-center text-dark'>login as User?</Link></div>
      </div>
    </div>
    </>
  )
}

export default SKLogin
