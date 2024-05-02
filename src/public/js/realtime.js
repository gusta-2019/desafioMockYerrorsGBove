//realtime.js
const socket = io(); 

socket.on("productos", (data) => {
    renderProductos(data);
})


const renderProductos = (productos) => {
    const contenedorProductos = document.getElementById("contenedorProductos");
    contenedorProductos.innerHTML = "";
    
    productos.docs.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("cardreal");

        card.innerHTML = ` 
                        <p> ${item.winery} </p>
                        <p> ${item.wine} </p> 
                        <p> ${item.location} </p>
                        <p> ${item.image} </p>
                        <p> ${item.category} </p>
                        <p> ${item.price} </p>
                        <button> Eliminar </button>
                        `;

        contenedorProductos.appendChild(card);
        card.querySelector("button").addEventListener("click", ()=> {
            eliminarProducto(item._id);
        })
    })
}


const eliminarProducto = (id) =>  {
    socket.emit("eliminarProducto", id);
}


document.getElementById("btnEnviar").addEventListener("click", () => {
    console.log("Botón 'Enviar' clickeado."); // Verifica si el evento de clic se está registrando correctamente
    agregarProducto();
})


const agregarProducto = () => {
    console.log("Agregando producto..."); // Verifica si la función se ejecuta correctamente
    const producto = {
        winery: document.getElementById("winery").value,
        wine: document.getElementById("wine").value,
        location: document.getElementById("location").value,
        price: document.getElementById("price").value,
        image: document.getElementById("image").value,
        code: document.getElementById("code").value,
        stock: document.getElementById("stock").value,
        category: document.getElementById("category").value,
        status: document.getElementById("status").value === "true",
    };

    console.log("Producto a enviar:", producto); // Verifica si los datos del producto son correctos

    socket.emit("agregarProducto", producto);
}
