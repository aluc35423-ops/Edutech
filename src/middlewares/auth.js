const jwt = require ('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.header('Authorization');

    if(!token){
        return res.status(401).json({ msg: ' No hay toke, permiso denegado' });
    };

    try {
        const cleanToken = token.startsWith('Bearer ') ? token.split(' ')[1] : token;

        const cifrado = jwt.verify(cleanToken, process.env.JWT_SECRET);
        
        req.usuario = cifrado.usuario;
        next(); // Pase usted a la siguiente capa
    } catch (error){
        console.error(error);
        return res.status(401).json({ mensaje: "Acceso denegado, token no válido o inexistente" });
    }
};