const express = require("express");
const { generarInfoError } = require("../services/errors/info.js");
const { EErrors } = require("../services/errors/enums.js");
const CustomError = require("../services/errors/custom-error.js");
const router = express.Router(); 

//Array de productos: 
const arrayProd = [];

router.post("/prod", async (req, res, next) => {
    
    const {wine, winery, location, code, image, category, stock, price, status } = req.body; 
    
    try {
        if(!wine || !winery || !location || !code || !image || !category || !stock || !price || !status ) {
            
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
            location, 
            code, 
            image, 
            category, 
            stock, 
            price,
            status
        }

        arrayProd.push(prod);
        console.log(arrayProd);
        res.send({status: "success", payload: prod});
     } catch (error) {
        next(error);
    }
})

module.exports = router; 
