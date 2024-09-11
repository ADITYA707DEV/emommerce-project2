import React from 'react'
import { useState } from 'react'
import  symbol from "../images/+.jpg"
import { useRef } from 'react'
import axios from "axios"
import ModalNew from './ModalNew'

function Modal(props) {
  const {setShowAlert} = props
    const [itemDetails,setItemDetails] = useState({ClothingType:"",Size:"",price:"",tag:""})
    const[image,setImage] = useState(null)
    const [loading,setLoading] = useState(false)
    const buttonRef = useRef(null)
    const closeRef = useRef(null)

   const handleImage = async (e)=>{
    
    
     setImage(e.target.files[0])
  

    

   }
    const handleOnChange = (e)=>{
        setItemDetails({...itemDetails, [e.target.id]:e.target.value})

    }
     
    const handleSelect = (e)=>{
     const value = e.target.value
      setItemDetails({...itemDetails, [e.target.id]:value})
   
     
    }
  
    const handleOnSubmit = async (e)=>{
      e.preventDefault()
   
   setLoading(true)

       const response = await fetch("http://localhost:5000/items/includeItems",{
        method: "POST",
        headers:{
          "Content-Type": "application/json",
        
        },
        credentials: 'include',
        body:JSON.stringify({
          
          "clothingType": itemDetails.ClothingType,
        "size": itemDetails.Size,
        "price":itemDetails.price,
        "tag": itemDetails.tag,
        "clothingCategory": itemDetails.clothingCategory
        })
      })

      
      
      

       const res = await response.json()
       

        const file = new FormData()
        file.append("file",image)
        
        const imageResponse = await axios({
         url:"http://localhost:5000/items/uploadImage",
         
         withCredentials: true,
         method:"POST",
         data: file
       })
       
      

       if(response.status == 200 && imageResponse.status == 200){
        props.setShowAlert({show:true,text:res.message,colour:"success"})
       }
       
        props.getItems()
        
      setLoading(false)
       closeRef.current.click()
      }

   
   
    const addItem = ()=>{
        buttonRef.current.click()
    }
    

    const changeColor = ()=>{
      const e =  document.getElementById("symbol")
     if(e.style.opacity === "1"){
      e.style.opacity = 0.5
      }
      else{
        e.style.opacity = 1
      }}


  return (
    <>
    <div>
     
<button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={buttonRef}>
  
</button>


<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Add Item</h1>
        <button type="button" ref={closeRef} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form onSubmit={handleOnSubmit}>
  <div className="mb-3">
    <label htmlFor="ClothingType" className="form-label">Clothing-Name</label>
    <input type="text" className="form-control" id="ClothingType" onChange={handleOnChange} required={true}/>
  
  </div>
  <div className="mb-3">
    <label htmlFor="Size" className="form-label">Size</label>
    <input type="text" className="form-control" id="Size" onChange={handleOnChange} required={true} placeholder='enter all the sizes sepreted by ,'/>
  </div>
  <div className="mb-3">
    <label htmlFor="price" className="form-label">price</label>
    <input type="number" className="form-control" id="price" onChange={handleOnChange} required={true}/>
  </div>
  <div className="mb-3">
    <label htmlFor="image" className="form-label">image:</label>
    <input type="file" className="form-control" id="image" onChange={handleImage} required={true}/>
  </div>
  <div className="mb-3">
  <span>clothing category: </span>
 
  <select className="form-select" aria-label="Default select example" id="clothingCategory" onClick={handleSelect} required={true} >
  <option defaultValue={"others"}>clothing category</option>
  <option value="upperware"  >upperware</option>
  <option value="lowerware" >lowerware</option>
  <option value="suits dupatta" >dupatta suits</option>
  <option value="saree" >saree</option>
  <option value="others" >others</option>
</select>

  
  </div>
  <div className="mb-3">
  <span>tag: </span>
 
  <select className="form-select" aria-label="Default select example" id="tag" onClick={handleSelect} required={true}>
  <option defaultValue={"men"}>select a tag for clothing item</option>
  <option value="men"  >men</option>
  <option value="women" >women</option>
  <option value="kids" >kids</option>
  <option value="others" >others</option>
</select>

  
  </div>
  
  
  {!loading?<button type="submit" className="btn  btn-outline-primary">Submit</button>:
  <button class="btn btn-primary" type="button" disabled>
  <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
  <span class="visually-hidden" role="status">Loading...</span>
</button>}
</form>

      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-outline-danger" data-bs-dismiss="modal">Close</button>
      
      </div>
    </div>
  </div>
</div>
    </div>
      <div className="card my-2" style={{width: "15rem"}}>
      <img src={symbol} className="card-img-top" alt="cannot load" style={{opacity:"0.5",transition:"0.2s ease-in-out",cursor:"pointer"}} onClick={addItem}  onMouseEnter={changeColor} id='symbol' onMouseLeave={changeColor}/>
      <div className="card-body">
      <p className="card-text fw-bold text-muted">Include Item</p>
      </div>
      
    </div>
    <ModalNew setShowAlert={setShowAlert} ></ModalNew>
    </>
  )
}

export default Modal
