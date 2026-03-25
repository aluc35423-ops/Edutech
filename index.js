require('dotenv').config();
// Tools
const express = require('express');
//const {createClient}= require('@supabase/supabase-js');
const connectDB = require('./src/config/database');
const reportesRoutes = require('./src/routes/reportes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./src/config/swagger');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Communication

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// DB connection
connectDB();

app.use("/api/reportes", reportesRoutes);

// Supabase connection
//const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)

app.listen(PORT, () => {
    console.log(`Port connection running in: http://localhost:${PORT}`)
});