import React from 'react'
import { useState,useEffect } from 'react'
import "../css/Style1.css"

function Carousel() {



    const [top,settop] = useState(null)
    const getTopRatedItems = async ()=>{
      const res = await fetch("http://localhost:5000/items/toprated")
      const response = await res.json()
      
      settop(response.tr)
      
     }
     

     useEffect(()=>{
      getTopRatedItems()
    },[])
   

  return (
    <div className='carouselDisplay '>
    <div className='d-flex justify-content-center'>
     { top !== null?<div id="carouselExampleAutoplaying" className="carousel slide w-25" data-bs-ride="carousel">
  <div className="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div className="carousel-inner">
    {top.map((item,i)=>{
      if(i >= 3){
        return
      }
      return <div key={item._id} className="carousel-item active">
      <img src= {item.src} className="d-block " style={{height:"400px",maxWidth:"300px"}} alt="..."/>
      <div className="carousel-caption d-none d-md-block   ">
        <h5>{item.clothingType}</h5>
       
      </div>
    </div>})}
    {/* <div className="carousel-item active">
      <img src= {top[0].src} className="d-block " style={{height:"400px",maxWidth:"300px"}} alt="..."/>
      <div className="carousel-caption d-none d-md-block   ">
        <h5>item - {top[0].clothingType}</h5>
        <p>rs{top[0].price}</p>
      </div>
    </div> */}

  
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>:<div>loading</div>}
    </div>
    </div>
  )
}

export default Carousel
