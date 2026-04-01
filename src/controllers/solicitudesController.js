const solicitudes = require('../models/solicitudes');

//Get all reports
//req = request body {} params url?param1=datos123.
exports.getSolicitudes = async (req, res) => {
    try {
        const solicitudes = await solicitudes.find();
        res.json(solicitudes);
    } catch (error) {
        //Error general
        res.status(500).json({error: "Error: Get solicitudes", message: error.message})
    }
};

exports.createSolicitudes = async (req, res) => {
    try {
        const {titulo, descripcion, fecha_programada} = req.body;

        // Logic
        let prioridad = {
            
        }
        const desLower = descripcion.toLowerCase();
        if (desLower.includes(fecha_programada) || desLower.includes('incendio')){
            prioridad = "Alta";
        }

        const nuevosolicitudes = new solicitudes({
            titulo,
            descripcion
        });

        await nuevosolicitudes.save();
        res.status(201).json({msg: "Solicitud creada con éxito", solicitud: nuevaSolicitud});
    } catch (error) {
        //Error de envio
        res.status(400).json({error: "Error: Create requests", message: error.message})
    };
};