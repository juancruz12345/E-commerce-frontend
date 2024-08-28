import { useEffect, useState } from "react";

export function useProducts(){

    const [products, setProducts] = useState([]);

    useEffect(() => {
      const fetchProducts = async () => {
        const response = await fetch('http://localhost:5000/products');
        const data = await response.json();
        console.log(data)
        setProducts(data);
      };
  
      fetchProducts()
     
    }, []);

    return{products}

}