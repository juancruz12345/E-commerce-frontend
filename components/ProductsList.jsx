/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { useProducts } from "../hooks/useProducts"
import { Cart } from "./Cart"
import  Card  from "react-bootstrap/Card"
import { Button, InputGroup, Form } from "react-bootstrap"
import './Products.css'


export function ProductsList({user}){
 
  const {products} = useProducts()
  const [change,setChange] = useState(false)
  const [cartProducts, setCartProducts] =  useState([])
 
  useEffect(()=>{
    
  },[])



  function setProducts(product){
    

    let cantidad = document.getElementById(`${product[0]}`).value
    
     if(cantidad>0 && !cartProducts.some(item=>item.id===product[0])){
       let newProduct = {
        id: product[0],
        title: product[1],
        price: product[2],
        quantity: cantidad
        
      }

    cartProducts.push(newProduct)

    setChange(!change)
     }
     else if(cantidad>0 && cartProducts.some(item=>item.id===product[0])){
      let reemplazo = cartProducts.filter(item => item.id!==product[0])
      
      let newProduct = {
        id: product[0],
        title: product[1],
        price: product[2],
        quantity: cantidad
        
      }
      reemplazo.push(newProduct)
      setCartProducts(reemplazo)
 

    setChange(!change)
   
     }

     else{
      return
     }
   
  }
  

    return(
        <div className="central">
            
      <div className="products-list">
        {
          products?.rows?.length>0 
          ? products?.rows?.map((e)=>
           

              <Card variant="dark" key={e[0]} className="product">
                <Card.Img src={e[4]}></Card.Img>
                <Card.Body>
                <Card.Title>{e[1]}</Card.Title>
                <Card.Subtitle>${e[2]} x unidad</Card.Subtitle>
                <Card.Text>{e[5]}</Card.Text>
                </Card.Body>
                <Card.Text>Cantidad</Card.Text>
                <InputGroup  className="input">
               
               <Form.Control type="number" id={e[0]} min={0} />
              </InputGroup>
                <Button variant="dark" onClick={()=>{setProducts(e)}}>Agregar al carrito</Button>
              </Card>
            

          )
          : <h1>no produto</h1>
        }
      </div>
     
      <div>
      <Cart cartProducts={cartProducts} setCartProducts={setCartProducts} user={user}/>
      </div>
        </div>
    )
}