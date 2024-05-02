const generarInfoError = (prod) => {
    return ` Los datos estan incompletos o son invalidos. 
        Necesitamos recibir lo siguiente: 
        - Nombre: String, pero recibimos ${prod.wine}
        - Apellido: String, pero recibimos ${prod.winery}
        - Email: String, recibimos ${prod.price}
    `;
}

module.exports = {
    generarInfoError
}