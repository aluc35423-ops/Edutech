const Usuario = require('../models/usuarios');

const bcrypt = require ('bcrypt');

const jwt = require ('jsonwebtoken');

const generarJWT = require('../middlewares/auth');
  
exports.registerUsuario = async (req, res) => {
    try {
        const {email, password, nombre, apellido, role} = req.body;

        const usuario = await Usuario.findOne({ email });
        if (usuario) {
            return res.status(401).json({ error: "El usuario ya existe" });
        }

        const salt = await bcrypt.genSalt(10);
        const newpassword = await bcrypt.hash(password, salt);

        const nuevoUsuario = new Usuario({
            nombre,
            apellido,
            email,
            password: newpassword,
            role: role || 'alumno'
        });

        await nuevoUsuario.save();
        res.status(201).json({ msg: "Usuario creado con éxito", nuevoUsuario}); //carga exitosa

    } catch (error) {
        //Error general
        res.status(500).json({error: "Error: Create usuario", message: error})
    }
};

exports.loginUsuario = async (req, res) => {
    try{
        const {email, password} = req.body;

        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(401).json({ error: "El usuario no encontrado" });
        };

        const isMatch = await bcrypt.compare(password, usuario.password);
        if (!isMatch) {
            return res.status(400).json({ error: "La contraseña no es correcta. Credenciales denegadas" });
        };

        const payload = {usuario: {id: usuario.id, email: usuario.email, role: usuario.role} };

        // firmar JWT
        jwt.sign(
            payload, 
            process.env.JWT_SECRET, 
            { expiresIn: '2h' },
            (err,token) =>{ //devolver un callback de error
            if(err) throw err;
            res.json({token, user: { nombre: usuario.nombre, role: usuario.role } });
        });

    } catch(error) {
        res.status(500).json( {msg: 'Error en el servidor', message: error} );
    }
};

exports.GetAll = async (req, res) => {
    try {
        const usuarios = await Usuario.find().select('-password'); // Excluir password por seguridad
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ msg: "Error al obtener usuarios", error: error.message });
    }
};

exports.GetOne = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id).select('-password');
        if (!usuario) {
            return res.status(404).json({ error: "El usuario no encontrado" });
        };
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ msg: "ID no válido", error: error.message });
    }
};

exports.UpdateOneUser = async (req, res) => {
    try {
        const { password, ...updateData } = req.body;

        // Si intentan actualizar password, hay que re-encriptarla
        if (password) {
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(password, salt);
        }

        const usuario = await Usuario.findByIdAndUpdate(
            req.params.id,
            { $set: updateData },
            { returnDocument: 'after', runValidators: true }
        ).select('-password');
        
        if (!usuario) {
            return res.status(404).json({ error: "El usuario no encontrado" });
        };
        res.json({ msg: "Usuario actualizado", usuario });
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar", message: error });
    }
};

exports.DeleteOne = async (req, res) => {
    try {
        const usuario = await Usuario.findByIdAndDelete(req.params.id);
        if (!usuario) {
            return res.status(404).json({ error: "El usuario no encontrado" });
        };
        res.json({ msg: "Usuario eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar", message: error });
    }
};