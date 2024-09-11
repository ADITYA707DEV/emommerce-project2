import React from 'react'
import image1 from "../images/loginImage.png"
import { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCookieData } from '../redux/userDataSlice'
import Alerts from './Alerts'





function Login() {

  const navigate = useNavigate(null)

  const Dispatch = useDispatch()
  const [userCredentials,setCredentials] = useState({})
 const [showAlert,setShowAlert] = useState({show:false,text:null,colour:null})
  
   const automatic = async ()=>{
    const response = await fetch("http://localhost:5000/user/userlogin",{
      method: "GET",
      headers:{
        "Content-Type": "application/json",
      },
       credentials: 'include'
      
    })

  

     const res = await response.json()

     if(res.status === 200){
     
      Dispatch(setCookieData({name:res.user.name,email:res.user.email,id:res.user._id, city:res.user.city, zip: res.user.zip, address:res.user.address}))
     setShowAlert({show:true,text:"already logged in log in another account",colour:"primary"})
     }
   }
 
 
   const handleOnChange = (e)=>{
    setCredentials({...userCredentials,[e.target.name]:e.target.value})
    

   }



  const handleOnSubmit = async (event)=>{

      event.preventDefault()
     

    const response = await fetch("http://localhost:5000/user/userlogin",{
      method: "POST",
      headers:{
        "Content-Type": "application/json",
      },
       credentials: 'include',
      body:JSON.stringify({
        email: userCredentials.email,
        password:userCredentials.password
      })
    })

     const res = await response.json()
       
     
     if(res.status === true){
      Dispatch(setCookieData({name:res.user.name,email:res.user.email,id:res.user._id, city:res.user.city, zip: res.user.zip, address:res.user.address }))
      navigate("/",{replace: true})
      setShowAlert({show:true,text:res.message,colour:"success"})
     }else{     setShowAlert({show:true,text:res.message,colour:"danger"})}
  }   




  useEffect(()=>{
   automatic() 
  },[])


  
  return (
    <div className='container' >
    {showAlert.show&&<Alerts colour={showAlert.colour} text={showAlert.text} setShowAlert={setShowAlert} show = {showAlert.show}></Alerts>}
      <div className='container_fluid d-flex align-items-center justify-content-center flex-column'>
      <img src={image1} alt="notfound" />
      <h2>user login</h2>
      </div>
      <form onSubmit={handleOnSubmit}>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label fw-bolder">Email address</label>
    <input type="email" className="form-control" id="Email" name="email" onChange={handleOnChange}/>
   
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label fw-bolder">Password</label>
    <input type="password" className="form-control" id="Password" name="password" onChange={handleOnChange}/>
  </div>

  <button type="submit" className="btn btn-primary" >Submit</button>
</form>
    <div><Link to='/skLogin' className='container_fluid d-flex align-items-center justify-content-center text-dark' >login as shopkeeper?</Link></div>
    </div>
  )
}

export default Login
