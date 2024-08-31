import { useEffect, useState } from "react";

export function useProducts(){

    const [products, setProducts] = useState([]);

    useEffect(() => {
      const fetchProducts = async () => {
        const response = await fetch('https://e-commerce-backend-oluv.onrender.com/products');
        const data = await response.json();
        console.log(data)
        setProducts(data);
      };
  
      fetchProducts()
     
    }, []);

    return{products}

}