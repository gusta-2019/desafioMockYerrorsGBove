//product.controller.js
const ProductRepository = require("../repositories/product.repository.js");
const productRepository = new ProductRepository();

class ProductController {

    async addProduct(req, res) {
        const nuevoProducto = req.body;
        try {
            // Verificar si los datos del formulario se están recibiendo correctamente
            console.log("Datos del nuevo producto recibidos:", nuevoProducto);

            const resultado = await productRepository.agregarProducto(nuevoProducto);

            // Verificar si el producto se ha agregado correctamente
            console.log("Producto agregado correctamente:", resultado);

            res.json(resultado);

        } catch (error) {

            // Manejar cualquier error que ocurra durante el proceso
            console.error("Error al agregar el producto:", error);

            res.status(500).send("Error");
        }
    }

    async getProducts(req, res) {
        try {
            let { limit = 10, page = 1, sort, query } = req.query;

            const productos = await productRepository.obtenerProductos(limit, page, sort, query);
           
            res.json(productos);
        } catch (error) { 
            res.status(500).send("Error");
        }
    }

    async getProductById(req, res) {
        const id = req.params.pid;
        try {
            const buscado = await productRepository.obtenerProductoPorId(id);
            if (!buscado) {
                return res.json({
                    error: "Producto no encontrado"
                });
            }
            res.json(buscado);
        } catch (error) {
            res.status(500).send("Error");
        }
    }

    async updateProduct(req, res) {
        try {
            const id = req.params.pid;
            const productoActualizado = req.body;

            const resultado = await productRepository.actualizarProducto(id, productoActualizado);
            res.json(resultado);
        } catch (error) {
            res.status(500).send("Error al actualizar el producto");
        }
    }

    async deleteProduct(req, res) {
        const id = req.params.pid;
        try {
            let respuesta = await productRepository.eliminarProducto(id);

            res.json(respuesta);
        } catch (error) {
            res.status(500).send("Error al eliminar el producto");
        }
    }
}

module.exports = ProductController; 