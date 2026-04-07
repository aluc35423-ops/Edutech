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
            const resources = await Materiales.findById(req.params.id).select('-password');
            if (!resources) {
                return res.status(404).json({ error: "El material no encontrado" });
            };
            res.json(resources);
        } catch (error) {
            res.status(500).json({ msg: "ID no válido", error: error.message });
        }
    const resources = await Materiales.find(query);
    res.status(200).json({
        count: resources.length,
        data: resources
        });
};

// Añadimos nuevos materiales
exports.addMateriales = async (req, res) => {
    try {
        const { titulo, descripcion, ubicacion, estado } = req.body;

        const nuevoMaterial = new Materiales({
            titulo,
            descripcion,
            ubicacion,
            estado: estado || 'disponible',
            creadoPor: req.usuario.id
        });

        await nuevoMaterial.save();
        res.status(201).json({ msg: "Material creado con éxito", material: nuevoMaterial });
    } catch (error) {
        res.status(400).json({ error: "Error al crear el material", message: error.message });
    }
}

// Actualizar material (PUT)
exports.updateResource = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        // AQUÍ ESTÁ LA CLAVE: Debe decir "Materiales", no "Resource"
        const updatedResource = await Materiales.findByIdAndUpdate(
            id, 
            updateData, 
            { returnDocument: 'after', runValidators: true }
        );

        if (!updatedResource) {
            return res.status(404).json({ success: false, message: 'Material no encontrado. Verifica el ID.' });
        }

        res.status(200).json({ success: true, data: updatedResource });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Error processing resource update', error: error.message });
    }
};

// Eliminar material (DELETE)
exports.deleteResource = async (req, res) => {
    try {
        const { id } = req.params;
        
        // AQUÍ TAMBIÉN: Debe decir "Materiales", no "Resource"
        const deletedResource = await Materiales.findByIdAndDelete(id);

        if (!deletedResource) {
            return res.status(404).json({ success: false, message: 'Material no encontrado. No se pudo eliminar.' });
        }
        res.status(200).json({ success: true, message: 'Material eliminado correctamente', data: deletedResource });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Error trying to delete resource', error: error.message });
    }
};