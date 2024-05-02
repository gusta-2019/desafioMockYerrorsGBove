const {faker} = require("@faker-js/faker");


const generarProd = () => {
    return {
        id: faker.database.mongodbObjectId(), 
        wine: faker.commerce.product(),
        winery: faker.commerce.productName(),
        price: faker.commerce.price(),
        stock: parseInt(faker.string.numeric()), 
        category: faker.commerce.productDescription(),
        location: faker.location.country(),
        image: faker.image.url()
    }
}

module.exports = generarProd;