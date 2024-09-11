
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import Alerts from './Alerts'
import {loadStripe} from '@stripe/stripe-js'
import { deleteCart } from '../redux/cartSlice'
import trashcan from "../images/trashcan.png"
import "../css/Style1.css"

function CartPage() {




    const Dispatch = useDispatch()
    const ucart = useSelector((state) => { return state.userCart })
    const details = useSelector((state) => { return state.userData })
    const [showAlert,setShowAlert] = useState({show:false,text:null,colour:null})


  
     const onDeleivery = async ()=>{
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
      
      
      
      
      
      if(res.status === 200){
      
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
             payment:"on deleivery"
      
        })
      
      })
      const response2 = await res2.json()
   
      if(res2.status === 200){
      
        setShowAlert({show:true,text:response2.message,colour:"success"})
      }else{ setShowAlert({show:true,text:response2.message,colour:"danger"})}
      } else{
        setShowAlert({show:true,text:response.message,colour:"danger"})}
      }
    


    const paying = async () => {
        const stripe = await loadStripe('pk_test_51PuatxP5i1YBGuOcOEg0nJWxy0pcdmL29JePtCJAs7xyQOddpVh8yIBhWJ8s7fNuWAL7F66FbKmdJWc3dxYG054O008JTd4HAL');
        const response = await fetch("http://localhost:5000/payment/checkout",{
          
            method:"POST",
            credentials:"include",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({products:ucart.items}),
            
        })    
        const res = await response.json()

        if(response.status === 200){
      
        
            const result = stripe.redirectToCheckout({
                sessionId: res.sessionid
            })  
          }else{setShowAlert({show:true,text:res.message,colour:"danger"})}
       
        
        
        // const response = await fetch("http://localhost:5000/payment/pay",{S
        //     method:"GET"

        // })
        // const res = await response.json()
        // const paymentResponse = await fetch("http://localhost:5000/payment/pay",{
        //     method:"POST",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     credentials: "include",
        //     body: JSON.stringify({
        //         amount: ""

        //     })
        // }).then((res)=>{
        //     let options = {
        //        "key":""+ res.key_Id + "",
        //        "amount": ""+ res.amount +"",
        //        "currency": "INR",
        //        "order_Id":"" + res.order + "",
        //        "handler": function (response){
        //         console.log("payment made")
        //        } ,
        //        "prefill":{
        //         "contact": ""+res.contact +"",
        //         "name": ""+res.name +"",
        //         "email": ""+ res.email + ""
        //        },
        //        "theme":{
        //         "color":"#2300a3"
        //        }
        //     }
        // })
        
 
    }



    const handledelete = (ucart) => {
        Dispatch(deleteCart(ucart))
    }


    return (
        <div className='container d-flex m-2 '>
 {showAlert.show&&<Alerts colour={showAlert.colour} setShowAlert={setShowAlert} text={showAlert.text} show = {showAlert.show}></Alerts>}
            <div className='d-flex-column bg-light px-2 w-75'>
                <div className='my-4'>
                    <h1>my-cart</h1>
                </div>



                {(ucart.items).map((ucart) => {
                    return <div className="card mb-3 my-4" key={ucart.key} style={{ maxWidth: "540px" }}>
                        <div className="row g-0">
                            <div className="col-md-4">
                                <img src={ucart.src} className=" rounded-start" style={{ maxHeight: "200px" }} alt="..." />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title d-flex">clothing-Type: {ucart.clothingType}   <span className=" ms-auto badge text-bg-warning self-align-end ">{ucart.overallRating}</span></h5>
                                    <p className="card-text">size: {ucart.size}</p>
                                    <p className="card-text d-flex justify-content-between "><small className="text-body-secondary">price: {ucart.price} </small><span role="button" onClick={() => { handledelete(ucart) }}><img src={trashcan} height={18} alt='' /></span> </p>

                                </div>
                            </div>
                        </div>
                    </div>
                })}

            </div>

            <div className="card w-25 ">
                <h5 className="card-header">cart summary</h5>
                <div className="card-body">
                    <p className="card-title">items: {ucart.cartCount}</p>
                    <hr />
                    <p className="card-text">Total : {ucart.total}</p>
                    {/* <button type='button' className="btn btn-primary" onClick={paying} >checkout</button> */}
                 

  <button type="button" className="btn btn-primary dropdown-toggle  "  data-bs-toggle="dropdown" aria-expanded="false">
    <div className='fontWidth' >checkout</div>
  </button>
  <ul className="dropdown-menu  border-2 border-black">
    <li><button className='btn btn-primary m-2 text-white '   onClick={paying}>pay online</button></li>
    <li><button className='btn btn-primary m-2 text-white' onClick={onDeleivery}>pay on delivery</button></li>
 
  </ul>

                </div>
            </div>

        </div>
    )
}

export default CartPage
