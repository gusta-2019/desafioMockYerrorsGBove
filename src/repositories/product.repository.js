//product.repository.js
const ProductModel = require("../models/product.model.js");

class ProductRepository {
    async agregarProducto({ winery, wine, location, code, image, category, stock, price, status, thumbnails }) {
        try {
            console.log("Datos del producto recibidos en el repositorio:", { winery, wine, location, code, image, category, stock, price, status, thumbnails });
            
            if (!winery || !wine || !location || !code || !image || !category|| !stock || !price ||!status) {
                console.log("Todos los campos son obligatorios");
                return;
            }

            const existeProducto = await ProductModel.findOne({ code: code });

            if (existeProducto) {
                console.log("¡El código ya existe en la base de datos!");
                throw new Error("El código debe ser único!!!");
                // return;
            }

            const newProduct = new ProductModel({
                winery,
                wine,
                location,
                code,
                image,
                category,
                stock,
                price,
                status: true,
                thumbnails: thumbnails || []
            });

            await newProduct.save();

            console.log("Producto guardado en la base de datos correctamente:", newProduct);

            return newProduct;

        } catch (error) {
            throw new Error("Error al agregar el producto");
        }
    }

    async obtenerProductos(limit = 10, page = 1, sort, query) {
        try {
            const skip = (page - 1) * limit;

            let queryOptions = {};

            if (query) {
                queryOptions = { category: query };
            }

            const sortOptions = {};
            if (sort) {
                if (sort === 'asc' || sort === 'desc') {
                    sortOptions.price = sort === 'asc' ? 1 : -1;
                }
            }

            const productos = await ProductModel
                .find(queryOptions)
                .sort(sortOptions)
                .skip(skip)
                .limit(limit);

            const totalProducts = await ProductModel.countDocuments(queryOptions);
            
            const totalPages = Math.ceil(totalProducts / limit);
            
            const hasPrevPage = page > 1;
            const hasNextPage = page < totalPages;
            

            return {
                docs: productos,
                totalPages,
                prevPage: hasPrevPage ? page - 1 : null,
                nextPage: hasNextPage ? page + 1 : null,
                page,
                hasPrevPage,
                hasNextPage,
                prevLink: hasPrevPage ? `/api/products?limit=${limit}&page=${page - 1}&sort=${sort}&query=${query}` : null,
                nextLink: hasNextPage ? `/api/products?limit=${limit}&page=${page + 1}&sort=${sort}&query=${query}` : null,
            };
        } catch (error) {
            throw new Error("Error");
        }
    }

    async obtenerProductoPorId(id) {
        try {
            const producto = await ProductModel.findById(id);

            if (!producto) {
                console.log("Producto no encontrado");
                return null;
            }

            console.log("Producto encontrado!!");
            return producto;
        } catch (error) {
            throw new Error("Error");
        }
    }

    async actualizarProducto(id, productoActualizado) {
        try {
            const actualizado = await ProductModel.findByIdAndUpdate(id, productoActualizado);
            if (!actualizado) {
                console.log("No se encuentra el producto");
                return null;
            }

            console.log("Producto actualizado con exito");
            return actualizado;
        } catch (error) {
            throw new Error("Error");
        }
    }

    async eliminarProducto(id) {
        try {
            const deleteado = await ProductModel.findByIdAndDelete(id);

            if (!deleteado) {
                console.log("No se encuentra!");
                return null;
            }

            console.log("Producto eliminado correctamente!");
            return deleteado;
        } catch (error) {
            throw new Error("Error");
        }
    }
}

module.exports = ProductRepository;