const { Product, Brand, Category} = require("../db");

const listProducts = require("../data/productsDb");


const brands= Array.from(new Set(listProducts.map(product => product.id_brand)));
const categories= Array.from(new Set(listProducts.map(product => product.id_category)));
const loadProductsInDB = async (req, res, next) => {
  for(const brandid of brands){
    const brand = listProducts.find(product => product.id_brand === brandid);
    if(brand){
      await Brand.upsert({id_brand:brandid, brand_name:brand.brand_name})
    }
  }
  for(const categoryid of categories){
    const category = listProducts.find(product => product.id_category === categoryid);
    if(category){
      await Category.upsert({id_category:categoryid, category_name:category.category_name, father_category:category.father_category? category.father_category:category.category_name})
    }
  }

  const fillProductDb = await Product.bulkCreate(listProducts.map((p) => p));

  if (!fillProductDb) {
    throw new Error("Error loading the products ");
  } else {
    {
      console.log("Products successfully loaded");
    }
  }
};

module.exports = {
  loadProductsInDB,
};
