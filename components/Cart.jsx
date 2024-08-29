/* eslint-disable react/prop-types */

import { useEffect, useState } from "react"
import { Button, ListGroup, Container } from "react-bootstrap"
import { CheckoutMP } from "./CheckoutMP";
import './Cart.css'
import { IconShoppingCart } from '@tabler/icons-react';
import { IconShoppingCartX } from '@tabler/icons-react';

export function Cart({cartProducts, setCartProducts,user}){
    
    const [hidden, setHidden] = useState(true)
   
   
    function deleteProduct(product){
      
      if(cartProducts.some(item=>item.id===product.id)){
        const updatedItems = cartProducts.filter(item => item.id !== product.id);
        setCartProducts(updatedItems)
       }
    }
    
    useEffect(()=>{

     if(cartProducts?.length>0 ){
      setHidden(false)
     }else{
      setHidden(true)
     }
       console.log('change')
    },[cartProducts.length])

   let total = 0

   if(cartProducts.length>0){
    cartProducts.forEach((e)=>{
      let totalProducto = e.price*e.quantity
      total =totalProducto+total
 
    })
   }

    return(
        <div className="aside-container">
          <Button onClick={()=>{setHidden(!hidden)}}><IconShoppingCart/></Button>
          {
            cartProducts?.length>0
            ? <Container hidden={hidden} className="aside">
   
            {
              cartProducts?.length>0 
              ?
              <h3>Total: {total}</h3>
              : 
              <div></div>
            }


            {
          cartProducts?.length>0 
          ?
        <div>
            <ListGroup className="cart-list">
            {
              cartProducts?.map((e,i)=>
                <ListGroup.Item variant="light" className="cart-item" key={i} >
                  
                  <div>Nombre: {e.title}</div>
                  <div>Precio: {e.price}</div>
                  <div>Cantidad: {e.quantity}</div>
                  <Button className="cancel-btn" variant="danger" onClick={()=>{deleteProduct(e)}}><IconShoppingCartX className="cancel-btn-icon" /></Button>
                </ListGroup.Item>
              )
            }
          </ListGroup>
    
          <div >
          <CheckoutMP cartProducts={cartProducts} user={user}></CheckoutMP> 
          </div>
        </div>
        
            :
            <></>
        }
        </Container>

        :
        <></>
          }
        </div>
    )

}