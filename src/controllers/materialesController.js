const Materiales = require('../models/materiales');

//Get all the materials
//req = request body {} params url?param1=datos123.
exports.getMateriales = async (req, res) => {
    try {
        const materiales = await Materiales.find();
        res.json(materiales);
    } catch (error) {
        //Error general
        res.status(500).json({error: "Error: Get Materials", message: error.message})
    }
};

//buscamos por nombre del material
exports.getResources = async (req, res) => {
    try {
        // 1. Extraemos el parámetro de la URL (Ej: /api/v1/resources?search=hdmi)
        const { search } = req.query;
        let query = {};

        if (search) {
            query.name = { 
                $regex: search, // Busca que la palabra esté contenida en el nombre
                $options: 'i' 
            };
        }
        const resources = await Resource.find(query);
        res.status(200).json({
            count: resources.length,
            data: resources
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error: Get Materials',
            error: error.message
        });
    }
};

//anadimos nuevos materiales
exports.addMateriales = async (req, res) => {
    try {
        const {titulo, descripcion, classroom} = req.body;

        const nuevoMaterial = new Materiales({
            titulo,
            descripcion,
            classroom
        });

        await nuevoMaterial.save();
        res.status(201).json({msg: "Successfully created material", material: nuevoMaterial});
    } catch (error) {
        //Error de envio
        res.status(400).json({error: "Error: Create materials", message: error.message})
    }
}

//actualizamos materiales
exports.updateResource = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        //Buscamos y actualizamos en una sola operación
        const updatedResource = await Resource.findByIdAndUpdate(
            id, 
            updateData, 
            { 
                new: true,           // Devuelve el documento modificado, no el original
                runValidators: true 
            }
        );

        // Validamos si el recurso realmente existía en la base de datos
        if (!updatedResource) {
            return res.status(404).json({
                success: false,
                message: 'Resource not found. Verify that the ID is correct.'
            });
        }

        //Si todo salió bien, respondemos con el contrato acordado
        res.status(200).json({
            success: true,
            data: updatedResource
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error processing resource update',
            error: error.message
        });
    }
};


exports.deleteResource = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedResource = await Resource.findByIdAndDelete(id);

        if (!deletedResource) {
            return res.status(404).json({
                success: false,
                message: 'Resource not found. Could not be deleted.'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Resource deleted successfully',
            data: deletedResource 
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error trying to delete resource',
            error: error.message
        });
    }
};