const pool = require("../config/db");

// Obtener todos los tickets
const getTickets = async () => {
    const resultado = await pool.query(
        "SELECT * FROM tickets ORDER BY id"
    );
    return resultado.rows;
};

// Obtener un ticket por ID
const getTicketById = async (id) => {
    const resultado = await pool.query(
        "SELECT * FROM tickets WHERE id = $1",
        [id]
    );
    return resultado.rows[0];
};

// Crear un nuevo ticket
const createTicket = async (ticket) => {
    const {
        titulo,
        descripcion,
        categoria,
        prioridad,
        estado
    } = ticket;
    const resultado = await pool.query(
        `INSERT INTO tickets
        (titulo, descripcion, categoria, prioridad, estado)
        VALUES ($1,$2,$3,$4,$5)
        RETURNING *`,
        [
            titulo,
            descripcion,
            categoria,
            prioridad,
            estado
        ]
    );
    return resultado.rows[0];
};

// Eliminar un ticket
const deleteTicket = async (id) => {
    const resultado = await pool.query(
        `DELETE FROM tickets
         WHERE id = $1
         RETURNING *`,
        [id]
    );
    return resultado.rows[0];
};

module.exports = {
    getTickets,
    getTicketById,
    createTicket,
    deleteTicket
};