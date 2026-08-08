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

//=============================
// PROBAR CONEXIÓN A POSTGRESQL
//=============================
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
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});