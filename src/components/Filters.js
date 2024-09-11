
import { useEffect } from 'react'
import { useDispatch} from 'react-redux'
import { setCardType } from '../redux/cardTypeSlice'


function Filters(props) {


  const dividePrice = (e)=>{
    // let a = Math.max(...props.prices)
    let c   = []
 
    
    let  num = e/1000
  for(let i = 0;i<num;i++  ){
      c[i] = `${i*1000} - ${(i+1)*1000}`
  }

 return c
  }
// const [defaults,setDefaults]= {clothingTypes:[],sizes:[],prices:[]}

  
  const Dispatch = useDispatch()


const filterItems = (item)=>{
  
  const re = new RegExp(item)

  Dispatch(setCardType({cardType: item}))


}


  


  return (
    <div className='m-2 '>
   <ul className="list-group l">
        
  <li className="list-group-item d-flex justify-content-between align-items-start">
    <div className="ms-2 me-auto">     <div className="fw-bold">clothingCategory: </div>
    <ol>
        {(props.clothingCategory).map((item)=>{return <li key={item} style={{cursor:"pointer"}} onClick={()=>{filterItems(item)}}>{item}</li>})}
      </ol>
      </div>
  </li>

  <li className="list-group-item d-flex justify-content-between align-items-start">
    <div className="ms-2 me-auto">     <div className="fw-bold">prices: </div>
    <ol>
        {(dividePrice(props.prices)).map((item)=>{return <li key={item} style={{cursor:"pointer"}} onClick={()=>{ Dispatch(setCardType({cardType:{priceRange:item}}))}}>{item}</li>})}
      </ol>
      </div>
  </li>
  
  
</ul>


    </div>
  )
}

export default Filters
