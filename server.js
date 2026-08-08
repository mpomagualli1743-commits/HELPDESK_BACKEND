const express = require("express");
const cors = require("cors");
const pool = require("./config/db");

const ticketRoutes = require("./routes/ticketRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/tickets", ticketRoutes);
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
    res.json({
        mensaje: "API Help Desk funcionando correctamente"
    });
});

// =============================
// PROBAR CONEXIÓN A POSTGRESQL
// =============================
app.get("/db", async (req, res) => {
    try {
        const resultado = await pool.query("SELECT NOW()");

        res.json({
            mensaje: "Conexión exitosa con PostgreSQL",
            fecha: resultado.rows[0]
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "No fue posible conectar con PostgreSQL"
        });
    }
});

// =============================
// CREAR TABLA TICKETS
// =============================
const crearTablaTickets = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS tickets (
                id SERIAL PRIMARY KEY,
                titulo VARCHAR(255) NOT NULL,
                descripcion TEXT NOT NULL,
                categoria VARCHAR(100) NOT NULL,
                prioridad VARCHAR(50) NOT NULL,
                estado VARCHAR(50) NOT NULL
            )
        `);

        console.log("Tabla tickets verificada correctamente");
    } catch (error) {
        console.error("Error al crear/verificar tabla tickets:", error);
    }
};

// =============================
// INICIAR SERVIDOR
// =============================
const PORT = process.env.PORT || 3001;

const iniciarServidor = async () => {
    await crearTablaTickets();

    app.listen(PORT, () => {
        console.log(`Servidor ejecutándose en el puerto ${PORT}`);
    });
};

iniciarServidor();