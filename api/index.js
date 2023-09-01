const app = require("./src/app"); // Importar la instancia de la aplicación Express
const { sequelize } = require("./src/db"); // Importar la instancia de Sequelize para la base de datos
const { loadProductsInDB } = require("./src/utils/loadData");

// Iniciar el servidor y sincronizar la base de datos
app.listen(3001, () => {
    sequelize.sync({ force: true }); // Sincronizar la base de datos y aplicar alteraciones si es necesario

    setTimeout(loadProductsInDB,3000)
    console.log("Listening on port 3001");
});

