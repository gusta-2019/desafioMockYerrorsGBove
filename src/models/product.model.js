//product.model.js
const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const productSchema = new mongoose.Schema({
    winery: {
        type: String, 
        required: true
    },
    wine: {
        type: String, 
        required: true
    },
    location: {
        type: String, 
        required: true
    },
    code: {
        type: String, 
        required: true,
        unique: true
    },
    image: {
        type: String, 
    },
    category: {
        type: String, 
        required: true
    },
    stock: {
        type: Number, 
        required: true
    },
    price: {
        type: Number, 
        required: true
    },
    status: {
        type: Boolean, 
        required: true
    },
    thumbnails: {
        type: [String], 
    }
})

productSchema.plugin(mongoosePaginate);

const ProductModel = mongoose.model("Productos", productSchema);

module.exports = ProductModel;
