const mongoose = require('mongoose');

const materialesSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    descripcion:{
        type: String,
        required: true
    },
    ubicacion:{
        type: String,
        required: true
    },
    estado:{
        type: String,
        enum: ['disponible','no disponible'],
        default: 'diponible'
    },
    creadoPor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuarios',
        required: true
    },
    fecha: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Materiales', materialesSchema);