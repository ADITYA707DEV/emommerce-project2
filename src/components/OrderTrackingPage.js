import React from 'react'
import { useState, useEffect } from 'react'
import  {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faXmark } from '@fortawesome/free-solid-svg-icons'

function OrderTrackingPage() {
  const [trackedOrders, setTrackedOrders] = useState(null)

  const removeOrder = async  (id)=>{
    const res = await fetch("http://localhost:5000/user/orderTracking",{
      method: "DELETE",
      credentials:"include",
      headers:{
        "Content-Type": "application/json "

      },
     body: JSON.stringify({
       orderid: id
      }) 
    }
    )
    const response = await res.json()
   
    getTrackedOrders()
  }
  const getTrackedOrders = async () => {
    const res = await fetch("http://localhost:5000/user/orderTracking", { credentials: "include" })
    const response = await res.json()
    
    setTrackedOrders(response.orderTracking)
  }

  useEffect(() => {
    getTrackedOrders()
  }, [])
  return (
    <div>
      <div className='border border-1 shadow-sm rounded fs-4 p-2 m-2 w-50 m-auto'><span className='text-primary'>User-Orders</span></div>
      <div className='d-flex flex-column justify-content-center align-items-center m-4'>
       {trackedOrders&& trackedOrders.map((order)=>{return <div className='w-75  border border-1 p-2'>
          <span className='text-primary mx-1'>status: </span> {order.status == "pending"?<span className="badge text-bg-warning">pending</span>:<div className='d-inline '><span className="badge text-bg-success mx-2">deleivered</span><FontAwesomeIcon icon={faXmark} style={{cursor:"pointer"}} onClick={()=>{removeOrder(order._id)}}/></div>}

          <div className='d-flex flex-column  p-2'>
            {order.OrderItems.map((o)=>{return <div className="card mb-3 " style={{ maxWidth: "540px" }}>
              <div className="row g-0">
                <div className="col-md-3">
                  <img src={o.src} className=" rounded-start" style={{ maxHeight: "150px" }} alt="..." />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title d-flex">clothing-Type:  {o.clothingType} <span className=" ms-auto badge text-bg-warning self-align-end "></span></h5>
                    <p className="card-text">size:  {o.size}</p>
                    <p className="card-text d-flex justify-content-between ">price : {o.price}</p>

                  </div>
                </div>
              </div>
            </div>})}</div>


        </div>})}
      </div>
    </div>
  )
}

export default OrderTrackingPage
