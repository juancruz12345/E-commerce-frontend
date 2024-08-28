

export function AddProduct(){

    ////const form = document.getElementById('add-product-form')
   //console.log(form.getElementsByTagName('input'))
   async function agregarProducto(event) {
    event.preventDefault();
    
    let name = event.target[0].value;
    let price = event.target[1].value
    let description = event.target[2].value;
    let imageUrl = event.target[3].value;
    let category = event.target[4].value;
    let stock = event.target[5].value;

    try {
        const response = await fetch('http://localhost:5000/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, price, description, imageUrl, category, stock }), // Asegúrate de que todos los valores son válidos
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        //const data = await response.json();
        console.log(response);
    } catch (error) {
        console.error("Error en la solicitud:", error);
    }
}

    return(
        <div>
            <form id="add-product-form" onSubmit={(event)=>{agregarProducto(event)}}>
                <label htmlFor="nombre">Nombre</label>
                <input name="nombre" ></input>
                <label htmlFor="precio">Precio</label>
                <input name="precio" ></input>
                <label htmlFor="descripcion">Descripcion</label>
                <input name="descripcion" ></input>
                <label htmlFor="img">ImgUrl</label>
                <input name="img" ></input>
                <label htmlFor="categoria">Categoria</label>
                <input name="categoria" ></input>
                <label htmlFor="stock">Stock</label>
                <input name="stock"></input>
                <button type="submit">Crear</button>
            </form>
        </div>
    )

}