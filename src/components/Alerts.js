import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

function Alerts(props) {


//   const showing = ()=>{
//    const    e = document.getElementById("alert")
//    console.log("running")
//     if(props.show){
//       console.log("sprinting")
//         e.classList.remove("d-none")
   
       
//     }
   
//   }
// useEffect(()=>{
//   console.log(props)
// showing()


// },[])
  return (

  <div class={`alert alert-${props.colour} position-absolute z-3 alert-dismissible fade show top-0 w-75  `} id='alert' role="alert" >
  
<span className=" mx-2">{props.text}</span>   <button type="button" class="btn-close" onClick={()=>{props.setShowAlert(false)}} data-bs-dismiss="alert" aria-label="Close"></button>
</div>
   
  )
}

export default Alerts
