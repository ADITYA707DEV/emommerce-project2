import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import image1 from "../images/loginImage.png"
import { useNavigate } from 'react-router-dom'
import Alerts from './Alerts'


function SignUp() {
  const navigate = useNavigate()
  const [userCredentials, setCredentials] = useState(null)
  const [showAlert,setShowAlert] = useState({show:false,text:null,colour:null})
  const handleOnChange = (e)=>{
    setCredentials({...userCredentials,[e.target.id]:e.target.value})
 


  }
  const handleOnSubmit = async (event) => {
    event.preventDefault()

  

    const response = await fetch("http://localhost:5000/user/userAccount", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: userCredentials.name,
        email: userCredentials.email,
        password: userCredentials.password
      })
    })

    const res = await response.json()

    if (response.status == 200) {
      navigate("/login", { replace: true })
      setShowAlert({show:true,text:res.message,colour:"success"})
    }else{     setShowAlert({show:true,text:res.message,colour:"danger"})}

  }
  return (
    <div className='container' >
         {showAlert.show&&<Alerts colour={showAlert.colour} text={showAlert.text} setShowAlert={setShowAlert} show = {showAlert.show}></Alerts>}
      <div className='container_fluid d-flex align-items-center justify-content-center flex-column'>
        <img src={image1} alt="notfound" />
        <h2>user signup</h2>
      </div>
      <form onSubmit={handleOnSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputName1" className="form-label fw-bolder">UserName</label>
          <input type="text" className="form-control" id="name" minLength={4}   onChange={handleOnChange} required={true}/>

        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label fw-bolder">Email address</label>
          <input type="email" className="form-control" id="email" onChange={handleOnChange} aria-describedby="emailHelp" required={true} />

        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label fw-bolder">Password</label>
          <input type="password" className="form-control" id="password" onChange={handleOnChange} minLength={5}    required={true}/>
        </div>

        <button type="submit" className="btn btn-primary" >Submit</button>
      </form>
      <div><Link to='/skSignup' className='container_fluid d-flex align-items-center justify-content-center text-dark'>create Account as shopkeeper?</Link></div>

    </div>
  )
}

export default SignUp
