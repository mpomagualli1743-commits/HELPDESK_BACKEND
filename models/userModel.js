const pool = require("../config/db");
const login = async (usuario, password) => {
    const resultado = await pool.query(
        `SELECT *
         FROM usuarios
         WHERE usuario = $1
         AND password = $2`,
        [usuario, password]
    );
    return resultado.rows[0];
};

module.exports = {
    login
};