import React from 'react'

import Navbar from './components/Navbar';

import Card from './components/Card';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import SignUp from './components/SignUp';
import SkSignUp from './components/SkSignUp';
import SKLogin from './components/SKLogin';
import ShopItem from "./components/ShopItem"
import CartPage from './components/CartPage';
import Home from './components/Home';
import Item from './components/Item';
import Profile from './components/Profile';
import Search from './components/Search';
import { useEffect } from 'react';
import { useDispatch} from 'react-redux';
import { setKeeperDetails } from './redux/keeperDetailsSlice';
import AdminOrderPage from './components/AdminOrderPage';
import OrderTrackingPage from './components/OrderTrackingPage';
import Success from './components/Success';
import Failed from './components/Failed';


function App() {
const dispatch =  useDispatch()

  const getKeeperDetails =  async ()=>{
    const res1 = await fetch("http://localhost:5000/api/keeperDetails")
    const response1 = await res1.json()
    const res2 = await fetch("http://localhost:5000/api/categoryimage")
    const response2 = await res2.json()
    
    
    dispatch(setKeeperDetails({details:response1.details,categoryimg:response2.categoryimg}))
   }
  
  useEffect(()=>{
   getKeeperDetails()
   
  },[]) 
  return (
    <div className="App">
      <BrowserRouter>
 
  <Routes>
  <Route path='/success' element={<Success></Success>}></Route>
  <Route path='/fail' element={<Failed></Failed>}></Route>
    <Route path='/skLogin' element={<SKLogin></SKLogin>}></Route>
    <Route path='/skSignup' element={<SkSignUp></SkSignUp>}></Route>
    <Route path='/login' element={<Login></Login>}></Route>
    <Route path='/signup' element={<SignUp></SignUp>}></Route>
    <Route path='/includeitems' element={<ShopItem></ShopItem>}></Route>
    <Route path='/profile' element={<Profile></Profile>}></Route>
    <Route path='/usercart' element={<><Navbar ></Navbar><CartPage></CartPage></>}></Route>
    <Route path='/adminorder' element={<AdminOrderPage></AdminOrderPage>}></Route>
    <Route path='/trackingorder' element={<><Navbar></Navbar><OrderTrackingPage></OrderTrackingPage></>}></Route>
    <Route path='/card' element={<><Navbar ></Navbar>
      <Card></Card></> }></Route>
    <Route path='/itempage' element={<><Navbar ></Navbar><Item></Item></>}></Route>
    <Route path="/search" element={     <> <Navbar></Navbar><Search></Search></>}></Route>
    <Route path='/' element={
     <>
       <Navbar ></Navbar>
  <Home></Home>
    </>
    }></Route>
  </Routes>
  </BrowserRouter>

    </div>
  );
}

export default App;
