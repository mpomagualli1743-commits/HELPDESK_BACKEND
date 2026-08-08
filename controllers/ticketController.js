const pool = require("../config/db");
const Ticket = require("../models/ticketModel");

// GET /tickets
const listarTickets = async (req, res) => {
    try {
        const tickets = await Ticket.getTickets();
        res.status(200).json(tickets);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: "Error al obtener los tickets"
        });
    }
};

// GET /tickets/:id
const obtenerTicket = async (req, res) => {
    try {
        const { id } = req.params;
        const ticket = await Ticket.getTicketById(id);
        if (!ticket) {
            return res.status(404).json({
                mensaje: "Ticket no encontrado"
            });
        }
        res.status(200).json(ticket);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: "Error al buscar el ticket"
        });
    }
};

// POST /tickets
const crearTicket = async (req, res) => {
    try {
        const nuevoTicket = await Ticket.createTicket(req.body);
        res.status(201).json({
            mensaje: "Ticket registrado correctamente",
            ticket: nuevoTicket
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: "Error al registrar el ticket"
        });
    }
};

// Actualizar un ticket
const actualizarTicket = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            titulo,
            descripcion,
            categoria,
            prioridad,
            estado
        } = req.body;
        const resultado = await pool.query(
            `UPDATE tickets
             SET titulo=$1,
                 descripcion=$2,
                 categoria=$3,
                 prioridad=$4,
                 estado=$5
             WHERE id=$6
             RETURNING *`,
            [
                titulo,
                descripcion,
                categoria,
                prioridad,
                estado,
                id
            ]
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                mensaje: "Ticket no encontrado"
            });
        }
        res.json({
            mensaje: "Ticket actualizado correctamente",
            ticket: resultado.rows[0]
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: "Error al actualizar el ticket"
        });
    }
};

// DELETE /tickets/:id
const eliminarTicket = async (req, res) => {
    try {
        const { id } = req.params;
        const ticket = await Ticket.deleteTicket(id);
        if (!ticket) {
            return res.status(404).json({
                mensaje: "Ticket no encontrado"
            });
        }

        res.status(200).json({
            mensaje: "Ticket eliminado correctamente",
            ticket
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: "Error al eliminar el ticket"
        });
    }
};

module.exports = {
    listarTickets,
    obtenerTicket,
    crearTicket,
    actualizarTicket,
    eliminarTicket
};