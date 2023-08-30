const app = require("./src/app"); // Importar la instancia de la aplicación Express
const { sequelize } = require("./src/db"); // Importar la instancia de Sequelize para la base de datos

// Iniciar el servidor y sincronizar la base de datos
app.listen(3001, () => {
    sequelize.sync({ alter: true }); // Sincronizar la base de datos y aplicar alteraciones si es necesario
    console.log("Listening on port 3001");
});
