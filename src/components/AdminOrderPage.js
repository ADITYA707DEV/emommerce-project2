import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import "../css/Style1.css"
function AdminOrderPage() {
const [orders,setOrders] = useState(null)

const deleivered = async (key,orderid)=>{


  const res = await  fetch("http://localhost:5000/api/orders",{
    method:"DELETE",
    credentials:"include",
    headers:{
      "Content-Type":"application/json"

    },

    body: JSON.stringify({
      key:key,
      orderid: orderid
    })

  })

  const response = await res.json()

  getOrders()
}

  const getOrders = async  ()=>{
     const res = await fetch("http://localhost:5000/api/orders",{
      credentials:"include"
     })
     const response = await  res.json()
  
     setOrders(response.allOrders)
  }

  useEffect(()=>{
     getOrders()
  },[])
  return (
    <>
     <nav className="navbar navbar-expand-lg bg-primary rounded m-2  flex-grow-1">
          <div className="container-fluid">
            <ul className='navbar-nav me-auto mb-2 mb-lg-0 align-items-center d-flex'> <li className="nav-item  text-white" style={{cursor:"pointer "}} ><Link  className="nav-link text-white fw-bold"  to="/includeitems">shopit</Link></li>
          
            <li className="nav-item  text-white" style={{cursor:"pointer "}} ><Link  className="nav-link text-white fw-bold"  to="/adminorder">orders</Link></li></ul>
          
          </div>
        </nav>
   { orders&&orders.map((item)=>{return <div className='  d-flex  bg-light p-2 rounded flex-column justify-content-center align-items-center m-4 '>
    <button type="button" class="d-inline-flex btn btn-primary focus-ring py-1 px-2 text-decoration-none border rounded-2"onClick={()=>{deleivered(item.key,item._id)}}>
delieverd
</button>
<span className="badge text-bg-primary  align-self-start ">payment: {item.payment}</span>
{item.onlinePaymentId&&<div className=" rounded fw-bold px-1 text-bg-warning my-1 align-self-start " style={{"word-break": "break-all",fontSize:" 12px"}}>paymentId:-   {item.onlinePaymentId}</div>}
      <div className='d-flex rounded m-2 p-2'>
   
        <div className='d-flex flex-column '>
      {item.OrderItems.map((i)=>{return <div className="card mb-3" style={{ maxWidth: "540px" }}>
  <div className="row ">
    <div className="col-md-6">
    <img src={i.src} className=" rounded-start" style={{maxHeight:"200px"}} alt="..." />
    </div>
    <div className="col-md-6  row">
      <div className="card-body">
        <h5 className="card-title">{i.clothingType}</h5>
        <p className="card-text">size:  {i.size}</p>
        <p className="card-text"><small className="text-body-secondary">price:  {i.price}</small></p>
      </div>
    </div>
  </div>
</div>})}
</div>
<div>
<div className="card text-bg-light mb-3" style={{"max-height":"14rem"}}>
  <div className="card-header fw-bold">userdetails</div>
  <div className='w-full'>
   <ul >
    <li className='d-flex justify-content-between my-2'><span className='fw-semibold '>email:</span><span className='mx-3' style={{"word-break": "break-all"}}>{item.customerDetails.customerEmail}</span></li>
    
    <li className='d-flex justify-content-between my-2'><span className='fw-semibold'>address:</span><span className='mx-3' style={{"word-break": "break-all"}}>{item.customerDetails.houseaddress}</span></li>
    <li className='d-flex justify-content-between my-2'><span className='fw-semibold'>city:</span><span className='mx-3'>{item.customerDetails.city}</span></li>
    <li className='d-flex justify-content-between my-2'><span className='fw-semibold'>zip:</span><span className='mx-3'>{item.customerDetails.zip}</span></li>
    
   </ul>

</div></div>
<div className="card text-bg-light mb-3 mx-2" style={{"max-height":"14rem"}}>
  <div className="card-header fw-bold">userdetails</div>
  <div className='d-flex justify-content-between px-2'><span className='fw-semibold mx-1'>Total:</span><span className='mx-2'>rs. {item.Total}</span></div>
  </div>
</div>
</div>
    </div>})}
    </>
  )
}

export default AdminOrderPage
