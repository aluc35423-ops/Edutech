const solicitudes = require('../models/solicitudes');


//Create aone Solicitude
exports.createSolicitudes = async (req, res) => {
    try {
        const {titulo, descripcion, fecha_programada} = req.body;

        // Logic
        let prioridad = {
            
        }
        const desLower = descripcion.toLowerCase();
        if (desLower.includes(fecha_programada) || desLower.includes('laboratorio')){
            prioridad = "alta";
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

//GET ONE SOLICITUDE
exports.getOneSolicitud = async (req, res) => {
    try {
        const solicitud = await solicitudes.findById(req.params.id);
        
        if (!solicitud) {
            return res.status(404).json({ error: "Solicitud no encontrada" });
        }
        
        res.json(solicitud);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener la solicitud", message: error.message });
    }
};

// PUT ONE SOlicitude
exports.updateSolicitud = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const solicitudActualizada = await solicitudes.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!solicitudActualizada) {
            return res.status(404).json({ error: "Solicitud no encontrada para actualizar" });
        }

        res.status(200).json({ msg: "Solicitud actualizada con éxito", solicitud: solicitudActualizada });
    } catch (error) {
        res.status(400).json({ error: "Error al actualizar la solicitud", message: error.message });
    }
};

// DELETE ONE SOLICITUDE
exports.deleteSolicitud = async (req, res) => {
    try {
        const { id } = req.params;
        const solicitudEliminada = await solicitudes.findByIdAndDelete(id);

        if (!solicitudEliminada) {
            return res.status(404).json({ error: "Solicitud no encontrada para eliminar" });
        }

        res.status(200).json({ msg: "Solicitud eliminada correctamente", solicitud: solicitudEliminada });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar la solicitud", message: error.message });
    }
};