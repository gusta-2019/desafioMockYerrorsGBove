//prod.router.js
const express = require("express");
const router = express.Router();
const generarProd = require("../utils/util.js");


router.get("/mockingproducts", (req, res)=>{
    const prod = [];

    for(let i = 0; i < 100; i++) {
        prod.push(generarProd());
    }
    res.json(prod);
})



module.exports = router;