


import {lazy, useEffect } from 'react'
import {Home} from '../components/Home'
import { AddProduct } from '../components/AddProduct'
import { Route, Routes } from 'react-router-dom'
import { Register } from '../components/Register'
import { Login } from '../components/Login'

/*const Home = lazy(()=> import('../components/Home'))
const AddProduct = lazy(()=> import('../components/AddProduct'))*/


function App() {
  
  const html = document.querySelector('html')

  useEffect(()=>{

  },[html.dataset.bsTheme])

  return (
   <div>
    
    <Routes>
      <Route path='/' element={<Home/>}  />
      <Route path='/register' element={<Register/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/addproduct' element={<AddProduct/>}  />
    </Routes>
   </div>
  )
}

export default App
