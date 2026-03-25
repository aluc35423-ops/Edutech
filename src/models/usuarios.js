const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true,
    },
    apellido:{
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['staff', 'profesor', 'alumno'],
        default: 'alumno'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Usuario', usuarioSchema);