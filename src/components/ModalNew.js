import React, { useState } from 'react'
import axios from 'axios'

function ModalNew(props) {

    const [categoryImage,setCategoryImage] = useState(null)
    const [ctype,setcType] = useState(null)
    const [loading,setLoading] = useState(false)
   const handleOnChange = (e)=>{
    setcType({cat:e.target.value})
   }

    const changeImage = (e)=>{
            setCategoryImage(e.target.files[0])
        
    }
   
   const handleOnSubmit = async (e)=>{
    e.preventDefault()
    
 setLoading(true)
       const file = new FormData()

       file.append("file",categoryImage)
      
       const imageResponse = await axios({
        url:"http://localhost:5000/api/categoryimage",
      
        params:{category:ctype},
        withCredentials: true,
        method:"POST",
        data: file,
   
      })
      if( imageResponse.status == 200){
        props.setShowAlert({show:true,text:"successfully updated",colour:"success"})
       }
       const {data} =  imageResponse
       setLoading(false)

   }

    return (
        <div>

            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalNew">
              update category img
            </button>


            <div className="modal fade" id="modalNew" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleOnSubmit}>
                              <span>category for image</span>
                                <select className="form-select" aria-label="Default select example " onChange={handleOnChange}>
                                    <option defaultValue={"others"}>Open this select menu</option>
                                    <option value="men">men</option>
                                    <option value="women">women</option>
                                    <option value="kids">kids</option>
                                    <option value="others">others</option>

                                </select>
                                <input type="file" className="form-control" id="image" required={true} onChange={changeImage}/>
                               { !loading?<button type="submit" className="btn  btn-outline-primary">Submit</button>:<button class="btn btn-primary" type="button" disabled>
  <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
  <span class="visually-hidden" role="status">Loading...</span>
</button>}
                            </form>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalNew
