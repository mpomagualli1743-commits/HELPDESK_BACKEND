const User = require("../models/userModel");
const iniciarSesion = async (req, res) => {
    try {
        const {
            usuario,
            password
        } = req.body;
        const user = await User.login(usuario, password);
        if (!user) {
            return res.status(401).json({
                mensaje: "Credenciales incorrectas"
            });
        }
        res.status(200).json({
            mensaje: "Inicio de sesión exitoso",
            usuario: user.usuario
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: "Error en el servidor"
        });
    }
};

module.exports = {
    iniciarSesion
};