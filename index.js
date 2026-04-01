require('dotenv').config();
// Tools
const express = require('express');
//const {createClient}= require('@supabase/supabase-js');
const connectDB = require('./src/config/database');
const usuariosRoutes = require('./src/routes/usuarios');
const materialesRoutes = require('./src/routes/materiales');
const solicitudesRoutes = require('./src/routes/solicitudes');
//const swaggerUi = require('swagger-ui-express');
//const swaggerSpecs = require('./src/config/swagger');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Communication

// Swagger UI
//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// DB connection
connectDB();

app.use("/api/usuarios", usuariosRoutes);
app.use("/api/materials", materialesRoutes);
app.use("/api/solicitude", solicitudesRoutes);

// Supabase connection
//const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)

app.listen(PORT, () => {
    console.log(`Port connection running in: http://localhost:${PORT}`)
});