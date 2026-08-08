const express = require("express");
const router = express.Router();
const ticketController = require("../controllers/ticketController");
console.log("Rutas de Tickets cargadas");
// =======================================
// GET /tickets
// Listar todos los tickets
// =======================================
router.get("/", ticketController.listarTickets);

// =======================================
// GET /tickets/:id
// Buscar un ticket por ID
// =======================================
router.get("/:id", ticketController.obtenerTicket);

// =======================================
// POST /tickets
// Registrar un nuevo ticket
// =======================================
router.post("/", ticketController.crearTicket);

// =======================================
// PUT /tickets/:id
// Actualizar un ticket existente
// =======================================
router.put("/:id", ticketController.actualizarTicket);

// =======================================
// DELETE /tickets/:id
// Eliminar un ticket
// =======================================

router.delete("/:id", ticketController.eliminarTicket);
module.exports = router;