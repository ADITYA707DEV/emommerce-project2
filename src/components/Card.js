import React from 'react'
import  { useState,useEffect} from 'react'
import CardItem from './CardItem'
import { useDispatch, useSelector} from 'react-redux'
import Filters from "./Filters"

import { useLocation } from 'react-router-dom'

import { setTopItems } from '../redux/topItemsSlice'

function Card() {

  // const useEffect
  const location = useLocation()
  
 const Dispatch = useDispatch()


  const cardType = useSelector((state)=>{return state.userCardType.cardtype})
 
  const[filters,setFilters] = useState({clothingCategory:[],priceRange:""})
  const [item,setItem] = useState([])
 



  const [type,setype] = useState(null)

  const getALLNotes = async ()=>{
   

   

    const res = await fetch("http://localhost:5000/items/getallitems",{
      method: "POST",
      headers:{
        "Content-Type": "application/json",
      },
      body:JSON.stringify({
       tag: location.state.value
      })
    })

      const response = await res.json()
      
   response.sort((a,b)=>{
    return b.overallRating - a.overallRating
   })
   
      
      setItem(response)

     if(response.length !== 0 ){
      Dispatch(setTopItems(response.slice(0,1))) 
    getFilters(response)
     }
        
    }
    
    const getFilters = (arr)=>{
     
     let e = []
     e = arr.map((item)=>{
      return item.price
     })
     e = e.filter((item,i)=>{
      return e.indexOf(item) === i
     })
     e = e.reduce((a,b)=>{return a>b?a:b})
   

    arr =   arr.map((item)=>{
      
         return item.clothingCategory /** */
      })
    
    let c = arr.filter((item,i)=>{
      return arr.indexOf(item) === i
    })


  

      setFilters({...filters,clothingCategory: c,priceRange:e})
   
    }



     useEffect(()=>{
   
     getALLNotes()
         
     },[cardType])
     
   
 
  return (
    <div className='container-fluid'>
  
    <div className='container-fluid d-flex '>
      <Filters prices={filters.priceRange} clothingCategory = {filters.clothingCategory}  show = {true}></Filters>
    
      <div className='row align-items-start mx-2 ' >
    
      {/* {(item.filter((note)=>{
        return note.clothingType === cardType.cardtype
      })).map((note)=>{
        return  <CardItem note = {note} key={note._id}></CardItem>
      })
      
      } */}
      {
        item.length !==  0? item.map((note,i)=>{
          if(cardType !== "" &&cardType.priceRange === undefined){
            if((note.clothingCategory).search(new RegExp(cardType)) !== -1  )
              {
                 
            return  <CardItem note = {note} key={note._id} ></CardItem>
          }
        }
        if(cardType.priceRange !== undefined &&  parseInt(note.price) >=  parseInt(cardType.priceRange[0]) && parseInt(note.price) <= parseInt(cardType.priceRange[1])   ){
       
        
          return  <CardItem note = {note} key={note._id} ></CardItem>
        }
 
         
        }):<div>no item included by the shopkeeper </div>
      }
      </div>
    </div>
    </div>
  )
}

export default Card
