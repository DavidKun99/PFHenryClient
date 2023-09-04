const { Product } = require("../db");
const { Op } = require("sequelize");

const getProducts = async () => {
  return await Product.findAll();
};

const getProductByNameAndStatus = async (name, status) => {
  return await Product.findAll({
    where: {
      name: {
        [Op.iLike]: `%${name}%`,
      },
      product_status: status,
    },
  });
};

const getProductByBrandAndStatus = async (brand, status) => {
  return await Product.findAll({
    where: {
      brand: {
        [Op.iLike]: `%${brand}%`,
      },
      product_status: status,
    },
  });
};

const getProductByCategoryAndStatus = async (category, status) => {
  return await Product.findAll({
    where: {
      category: {
        [Op.iLike]: `%${category}%`,
      },
      product_status: status,
    },
  });
};

const getProductByCategoryAndBrand = async (category, brand) => {
  return await Product.findAll({
    where: {
         category: category,
         brand: brand,
    }
  });
};

const getProductByCategoryAndMinimunAge = async (category, minimun_age) => {
  return await Product.findAll({
    where: {
         category: category,
         minimun_age: {[Op.gte]: minimun_age},
    }
  });
};

const getProductByBrandAndMinimunAge = async (brand, minimun_age) => {
  return await Product.findAll({
    where: {
         brand: brand,
         minimun_age: {[Op.gte]: minimun_age},
    }
  });
};

const getProductByPriceAndMinimunAge = async (price, minimun_age) => {
  return await Product.findAll({
    where: {
         price:{[Op.lte]: price},
         minimun_age: {[Op.gte]: minimun_age},
    }
  });
};

const getProductByBrandAndPrice = async (brand, price) => {
  return await Product.findAll({
    where: {
         brand: brand,
         price:{[Op.lte]: price},
    }
  });
};

const getProductByCategoryAndPrice = async (category, price) => {
  return await Product.findAll({
    where: {
         category: category,
         price:{[Op.lte]: price},
    }
  });
};

const getProductByCategoryBrandAndAge = async (category, brand, minimun_age) => {
  return await Product.findAll({
    where: {
         category: category,
         brand: brand,
         minimun_age: {[Op.gte]: minimun_age},
    }
  });
};

const getProductByCategoryBrandAgeAndPrice = async (category, brand, minimun_age, price) => {
  return await Product.findAll({
    where: {
         category: category,
         brand: brand,
         minimun_age: {[Op.gte]: minimun_age},
         price: {[Op.lte]: price},
    }
  });
};

const getProductByName = async (name) => {
  return await Product.findAll({
    where: {
      name: {
        [Op.iLike]: `%${name}%`,
      },
    },
  });
};

const getProductByBrand = async (brand) => {
  return await Product.findAll({
    where: {
      brand: {
        [Op.iLike]: `%${brand}%`,
      },
    },
  });
};

const getProductByAge = async (minimun_age) => {
  return await Product.findAll({
    where: {
      minimun_age: {[Op.gte]: minimun_age},
      },
  });
};

const getProductByPrice = async (price) => {
  return await Product.findAll({
    where: {
      price: {[Op.lte]: price},
      },
  });
};

const getProductsByStatus = async (status) => {
  return await Product.findAll({
    where: {
      product_status: status,
    },
  });
};

const getProductsByCategory = async (category) => {
  return await Product.findAll({
    where: {
      category: {
        [Op.iLike]: `%${category}%`, //trae la categoria de forma no case sensitive
      },
    },
  });
};

module.exports = {
  getProducts,
  getProductByNameAndStatus,
  getProductByName,
  getProductByBrandAndStatus,
  getProductByBrand,
  getProductsByStatus,
  getProductsByCategory,
  getProductByCategoryAndStatus,
  getProductByAge,
  getProductByPrice,
  getProductByCategoryAndBrand,
  getProductByCategoryBrandAgeAndPrice,
  getProductByCategoryBrandAndAge,
  getProductByCategoryAndMinimunAge,
  getProductByCategoryAndPrice,
  getProductByBrandAndMinimunAge,
  getProductByBrandAndPrice,
  getProductByPriceAndMinimunAge,
};
