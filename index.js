require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/database');

//RUTAS
const usuariosRoutes = require('./src/routes/usuarios');
const materialesRoutes = require('./src/routes/materiales');
const solicitudesRoutes = require('./src/routes/solicitudes');

//SWAGGER
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./src/config/swagger');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Communication

// DB connection
connectDB();

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

//Rutas base de Edutech
app.use("/api/usuarios", usuariosRoutes);
app.use("/api/materials", materialesRoutes);
app.use("/api/solicitudes", solicitudesRoutes);

app.listen(PORT, () => {
    console.log(`Servidor de EDUTECH corriendo en: http://localhost:${PORT}`);
    console.log(`Revisa la documentación en: http://localhost:${PORT}/api-docs`);
});