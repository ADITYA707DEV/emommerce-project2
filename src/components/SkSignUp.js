import React from 'react'
import { useState } from 'react'
import { useRef } from 'react'
import image1 from "../images/loginImage.png"
import { useNavigate } from 'react-router-dom'
import Alerts from './Alerts'



function SkSignUp() {
  const navigate = useNavigate()
  const ref = useRef(0)
    const [skCredentials,setCredentials] = useState({})
    const [showAlert,setShowAlert] = useState({show:false,text:null,colour:null})
    const handleOnChange = (e)=>{
      setCredentials({...skCredentials,[e.target.id]:e.target.value})

  
    }


    const handleOnSubmit = async (event)=>{
        event.preventDefault()
 
   
   
      const response = await fetch("http://localhost:5000/api/skAccount",{
        method: "POST",
        headers:{
          "Content-Type": "application/json",
        },
        body:JSON.stringify({
          name: skCredentials.name,
          email: skCredentials.email,
          shopName: skCredentials.shopName,

          password:skCredentials.password,
          officeaddress: skCredentials.officeaddress,
          phone: skCredentials.phone
        })
      })
      
      const res = await response.json()
      
   
     if(response.status == 200){ 
      setShowAlert({show:true,text:res.message,colour:"success"})
    ref.current.click()
      
     }else{     setShowAlert({show:true,text:res.message,colour:"danger"})}
 
    }
  return (
    <div className='container '>
         <a href='/' ref={ref } className='d-none'></a>
         {showAlert.show&&<Alerts colour={showAlert.colour} text={showAlert.text} setShowAlert={setShowAlert} show = {showAlert.show}></Alerts>}
       <div className='container h-100 d-flex align-items-center justify-content-center flex-column'>
    <img src={image1} alt="notfound" style={{width:"15%"}} />
    <h2>shopkeeper signup</h2>
    </div>
    <form onSubmit={handleOnSubmit} >
    <div className="mb-3">
  <label htmlFor="exampleInputName1" className="form-label fw-bolder">name</label>
  <input type="text" className="form-control" id="name"  onChange={handleOnChange}  required={true}/>
 
</div>
<div className="mb-3">
  <label htmlFor="exampleInputEmail1" className="form-label fw-bolder">email address</label>
  <input type="email" className="form-control" id="email" aria-describedby="emailHelp" onChange={handleOnChange} required={true}/>
 
</div>
<div className="mb-3">
  <label htmlFor="exampleInputshopName1" className="form-label fw-bolder">Shopname</label>
  <input type="text" className="form-control" id="shopName"  onChange={handleOnChange} required={true}/>
 
</div>
<div className="mb-3">
  <label htmlFor="exampleInputshopName1" className="form-label fw-bolder">office-Address</label>
  <input type="text" className="form-control" id="officeaddress"  onChange={handleOnChange} required={true}/>
 
</div>
<div className="mb-3">
  <label htmlFor="exampleInputshopName1" className="form-label fw-bolder">phone</label>
  <input type="number" className="form-control" id="phone" onChange={handleOnChange} required={true}/>
 
</div>
<div className="mb-3">
  <label htmlFor="exampleInputPassword1" className="form-label fw-bolder">Password</label>
  <input type="password" className="form-control" id="password" onChange={handleOnChange} required={true}/>
</div>

<button type="submit" className="btn btn-primary" >Submit</button>
</form>

  
    </div>
  )
}

export default SkSignUp

