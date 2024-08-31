/* eslint-disable react/prop-types */

import {initMercadoPago} from '@mercadopago/sdk-react'
import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'


export function CheckoutMP({cartProducts, user}){
 
  const [direccion, setDireccion] = useState('')
 

  if(!initMercadoPago){
    initMercadoPago(import.meta.env.VITE_MP_TEST_PUBLIC_KEY,{
      locale: "es-AR"
     })
   }
   
   const getPreference = async(cartProducts, user, direccion)=>{
     
      const items = cartProducts
      const orderData = {
        userId: user?.id,
        shippingAddress:direccion,
        items:items,
      };

  
     try{

       const response = await fetch('https://e-commerce-backend-oluv.onrender.com/create-order',{
         method: 'POST',
         headers: {
           "Content-Type": "application/json"
         },
         body: JSON.stringify(orderData)
       })

       if (!response.ok) {
        const errorDetails = await response.text(); // Captura el texto de error
        console.error("Error details:", errorDetails);
        console.log(response)
        
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    window.location.href = data.init_point; 

   
     }catch(e){
      console.log(e)
       throw new Error(e.message)
       
     }
   }

    async function setPreference(){
    
      await getPreference(cartProducts,user, direccion)
      
    }
  
    return(
      
         <Form onSubmit={async(e)=>{e.preventDefault(),setPreference()}}>
          <Form.Group>
            <Form.Label>Direccion</Form.Label>
            <Form.Control required placeholder='calle falsa 1234' pattern="[a-zA-Z]{2,}\s[0-9]{1,}"  onChange={(e) => setDireccion(e.target.value)}>
            </Form.Control>
          </Form.Group>
          <Button type='submit'>Continuar con el pago</Button>
         </Form>
 
          )
         
   
    
          
        
        
        
        
        
        
        
        
        
        
          
    
}