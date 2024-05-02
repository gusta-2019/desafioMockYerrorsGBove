const express = require("express");
const { generarInfoError } = require("../services/errors/info.js");
const { EErrors } = require("../services/errors/enums.js");
const CustomError = require("../services/errors/custom-error.js");
const router = express.Router(); 

//Array de productos: 
const arrayProd = [];

router.post("/prod", async (req, res, next) => {
    
    const {wine, winery, price} = req.body; 
    
    try {
        if(!wine || !winery || !price) {
            
            throw CustomError.crearError({
                
                nombre: "Producto Nuevo", 
                causa: generarInfoError({wine, winery, price}),
                mensaje: "Error al intentar crear un Producto",
                codigo: EErrors.TIPO_INVALIDO
            })
        };
        
        const prod = {
            wine,
            winery, 
            price
        }

        arrayProd.push(prod);
        console.log(arrayProd);
        res.send({status: "success", payload: prod});
     } catch (error) {
        next(error);
    }
})

module.exports = router; 
