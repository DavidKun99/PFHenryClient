const { Router } = require("express");
const { getAllProducts, getBrands, getProductBySKU, getProductsByBrand, getProductsByCategory, getCategories, createProduct } = require("../handlers/productsHandler");

const productsRouter = Router();

productsRouter.get('/sku/:sku', getProductBySKU);
productsRouter.get('/',  getAllProducts);
productsRouter.get('/brands/:id_brand', getProductsByBrand);
productsRouter.get('/brands', getBrands);
productsRouter.get('/categories/:id_category', getProductsByCategory);
productsRouter.get('/categories', getCategories); 
productsRouter.post('/', createProduct);

module.exports = productsRouter; 
