const Usuario = require('../models/usuarios');

const bcrypt = require ('bcrypt');

const jwt = require ('jsonwebtoken');

const generarJWT = require('../middlewares/auth');
  
exports.registerUsuario = async (req, res) => {
    try {
        const {email, password} = req.body;
        const usuario = await Usuario.findOne({ email });
        if (usuario) {
            return res.status(401).json({ error: "El usuario ya existe" });
        }

        const salt = await bcrypt.genSalt(10);
        const newpassword = await bcrypt.hash(password, salt);

        const nuevoUsuario = new Usuario({
            email,
            password: newpassword
        });

        await nuevoUsuario.save();
        res.status(201).json(nuevoUsuario); //carga exitosa

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

        const payload = {usuario: {id: usuario.id, email: usuario.email} };

        // firmar JWT
        jwt.sign(
            payload, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' },
            (err,token) =>{ //devolver un callback de error
            if(err) throw err;
            res.json({token});
        });

    } catch(error) {
        res.status(500).json( {msg: 'Error en el servidor', message: error} );
    }
};