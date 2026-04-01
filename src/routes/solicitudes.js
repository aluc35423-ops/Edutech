const express = require('express');
const router = express.Router();
const solicitudesController = require('../controllers/solicitudesController');
const { auth, checkRole } = require("../middlewares/auth");

/**
 * @swagger
 * tags:
 * - name: Solicitudes
 * description: Gestión de pedidos y reportes
 */

/**
 * @swagger
 * /api/solicitude/NewSolicitude:
 * post:
 * summary: Crear una nueva solicitud
 * tags: [Solicitudes]
 * security:
 * - bearerAuth: []
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * titulo:
 * type: string
 * example: "Pedido especial"
 * descripcion:
 * type: string
 * example: "Diseño de graffiti"
 * fecha_programada:
 * type: string
 * example: "2026-04-15"
 * responses:
 * 201:
 * description: Solicitud creada
 */
router.get("/", auth, checkRole(['staff']), solicitudesController.getSolicitudes);

/**
 * @swagger
 * /api/solicitude/NewSolicitude:
 * post:
 * summary: Crear una nueva solicitud
 * tags: [Solicitudes]
 * security:
 * - bearerAuth: []
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * titulo:
 * type: string
 * example: "Pedido especial: Mural Sala"
 * descripcion:
 * type: string
 * example: "Se requiere diseño de graffiti con temática urbana"
 * fecha_programada:
 * type: string
 * format: date
 * example: "2026-04-15"
 * responses:
 * 201:
 * description: Solicitud creada exitosamente
 */
router.post("/NewSolicitude", auth, checkRole(['staff', 'profesor', 'alumno']), solicitudesController.createSolicitudes);

module.exports = router;