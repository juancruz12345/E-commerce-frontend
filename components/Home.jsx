import { useEffect, useState } from "react"
import { ProductsList } from "./ProductsList"

import { Link } from "react-router-dom"
import { Header } from "./Header"
import { useToken } from "../hooks/useToken"
import './Home.css'

export function Home(){

    const [user,setUser]= useState({})
    const {fetchProtectedData, logout} = useToken()

    async function FetchData(){
        const response = await fetch('https://e-commerce-backend-zh4k.onrender.com/user',{
            method : 'GET',
            credentials: 'include'
        })
     
        const data = await response.json()
        setUser(data)
    }

    useEffect(()=>{
        
        FetchData()
      
    },[])

   

    return(
        <div>
           
            {
                user!==null
                ? 
                <div>
                    <Header logout={logout}></Header>
                    <h1>Hola {user.username}</h1>
                    <ProductsList user={user}></ProductsList>
                   
                </div>

                : 
                <div className="home-no-user">
                    <h3>Debes iniciar sesion para visitar nuestra web</h3>
                    <Link className="link-no-user" to='/login'>Iniciar sesion</Link>
                    <h4>¿No tienes una cuenta? Registrate</h4>
                    <Link className="link-no-user" to='/register'>Registrar</Link>
                </div>
                
            }
           
            
        </div>
    )
}