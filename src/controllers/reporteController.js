const Reporte = require('../models/reporte');

//Get all reports
//req = request body {} params url?param1=datos123.
exports.getReportes = async (req, res) => {
    try {
        const reportes = await Reporte.find();
        res.json(reportes);
    } catch (error) {
        //Error general
        res.status(500).json({error: "Error: Get Reports", message: error.message})
    }
};

exports.createReportes = async (req, res) => {
    try {
        const {titulo, descripcion, ubicacion} = req.body;

        // Logic
        let prioridad = "Media";
        const desLower = descripcion.toLowerCase();
        if (desLower.includes('fuego') || desLower.includes('incendio')){
            prioridad = "Alta";
        }

        const nuevoReporte = new Reporte({
            titulo,
            descripcion,
            ubicacion,
            prioridad
        });

        await nuevoReporte.save();
        res.status(201).json({msg: "Reporte creado con éxito", reporte: nuevoReporte});
    } catch (error) {
        //Error de envio
        res.status(400).json({error: "Error: Create reports", message: error.message})
    }
}