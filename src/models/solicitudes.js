const mongoose = require('mongoose');

const solicitudesSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true,
    },
    prioridad: {
        type: String,
        enum: ['baja', 'media', 'alta'],
        default: 'media'
    },
    estado: {
        type: String,
        enum: ['abierto', 'cerrado'],
        default: 'abierto'
    },
    creadoPor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuarios',
        required: true
    },
    fecha_programada: {
        type: Date,
        required: true,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Solicitudes', solicitudesSchema);