import React, { useState } from 'react'
import { useEffect } from 'react'
import { useLocation,useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setitem } from '../redux/itemSlice'
import  Navbar from "./Navbar"

function Search() {


const navigate = useNavigate(null)
const location = useLocation()
const  Dispatch = useDispatch()
const [Items,setItems] = useState([])
const[searchItem,setSearchItem] = useState("")

const getItems = async ()=>{
    const res = await fetch("http://localhost:5000/items/getallitems")
    const response = await res.json()
    setItems(response)
 
    
}


const handleClick = (item)=>{
 
   Dispatch(setitem(item))
   navigate("/itempage")
}



useEffect(()=>{

    getItems()
    setSearchItem(location.state.value)
   
  
   
},[location.state.value])


  return (
    <div className='container-fluid d-flex flex-column align-items-center ' >

      {Items.filter((item)=>{
        for(const key in item){
          if(item[key] == searchItem){
            return item
         }
       
        }
      }).map((item)=>{
          
        return <div className="card mb-3 border border-4" style={{maxWidth: "900px",maxHeight:"200px",minWidth:"850px"}} onClick={()=>{handleClick(item)}}>
  <div className="row g-0">
    <div className="col-md-2">
      <img src={item.src}  style={{maxHeight:"200px"}} className="img-fluid rounded-start" alt="..."/>
    </div>
    <div className="col-md-10">
      <div className="card-body">
        <h1 className="card-title d-flex justify-content-between align-items-center">{item.clothingType}        <div className="card-text d-inline fs-6 mx-4">Rs. <h2 className='d-inline '>{item.price}</h2></div></h1>
        <hr />

        <p className="card-text">category: {item.tag}</p>
        <span className=" ms-auto badge text-bg-warning " style={{maxWidth:"60px"}}>{item.overallRating}</span>
      </div>
    </div>
  </div>
</div>})}
    </div>
  )
}

export default Search
