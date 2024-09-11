import React from 'react'
import { Link } from 'react-router-dom'
import { useState,useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Alerts from './Alerts'

function Success() {
  const [showAlert,setShowAlert] = useState({show:false,text:null,colour:null})
  const ucart = useSelector((state) => { return state.userCart })
  const details = useSelector((state) => { return state.userData })
  const [searchParams, setSearchParams] = useSearchParams();
 


  const placeOrder = async  ()=>{
    const paymentId =  searchParams.get("session_id")
   
    const res = await fetch("http://localhost:5000/user/orderTracking", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({
          
       email: details.data.email,
             
          OrderItems: ucart.items,
    

          
      })

  })
  const response = await res.json()
  






const res2 = await fetch("http://localhost:5000/api/orders", {
  method: "POST",
  headers: {
      "Content-Type": "application/json"
  },
  credentials: "include",
  body: JSON.stringify({
      customerDetails: {
          customerEmail: details.data.email,
          city: details.data.city,
          houseaddress: details.data.address,
          zip: details.data.zip,
      },
      order: ucart.items,
      total: ucart.total,
      key: response.key,
      payment:"online",
      paymentId: paymentId

  })

})
const response2 = await res2.json()

if(res2.status === 200){

  setShowAlert({show:true,text:response2.message,colour:"success"})
}else{ setShowAlert({show:true,text:response2.message,colour:"danger"})}
  }

useEffect(()=>{
  placeOrder()
},[])

  return (
    <div className='d-flex justify-content-center align-items-center h-full'>
       {showAlert.show&&<Alerts colour={showAlert.colour} setShowAlert={setShowAlert} text={showAlert.text} show = {showAlert.show}></Alerts>}
     <div className="card border-success align-self-center" style={{"max-width": "32rem"}}>
  <div className="card-header">payment status</div>
  <div className="card-body text-success">
    <h5 className="card-title">Payment Succeeded</h5>
    <p className="card-text">thank you! for shopping on shopit. Your payment is successful and order is successfully placed</p>
    <Link to="/usercart" className="btn btn-success">Go to Cart</Link>
  </div>
</div>
    </div>
  )
}

export default Success
