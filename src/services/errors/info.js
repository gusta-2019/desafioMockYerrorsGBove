const generarInfoError = (prod) => {
    return ` Los datos estan incompletos o son invalidos. 
        Necesitamos recibir lo siguiente: 
        - Vino: String, pero recibimos ${prod.wine}
        - Vineria: String, pero recibimos ${prod.winery}
        - Ubicacion: String, pero recibimos ${prod.location}
        - Codigo: String, pero recibimos ${prod.code}
        - Imagen: String, pero recibimos ${prod.image}
        - Categoria: String, pero recibimos ${prod.category}
        - Stock: String, pero recibimos ${prod.stock}
        - Precio: String, recibimos ${prod.price}
        - Status: String, pero recibimos ${prod.status}
    `;
}

module.exports = {
    generarInfoError
}