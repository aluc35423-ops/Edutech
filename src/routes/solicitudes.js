const express = require('express');
const router = express.Router();
const solicitudesController = require('../controllers/solicitudesController');
const { auth, checkRole } = require("../middlewares/auth");

/**
 * @swagger
 * tags:
 *   - name: Solicitudes
 *     description: Gestión de reservas y solicitudes
 */

/**
 * @swagger
 * /api/solicitudes:
 *   get:
 *     summary: Obtener todas las solicitudes
 *     tags: [Solicitudes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de solicitudes
 */
router.get("/", auth, checkRole(['staff']), solicitudesController.getSolicitudes);

/**
 * @swagger
 * /api/solicitudes:
 *   post:
 *     summary: Crear una solicitud
 *     tags: [Solicitudes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: "Reserva de proyector"
 *               descripcion:
 *                 type: string
 *                 example: "Para presentación final"
 *               fecha_programada:
 *                 type: string
 *                 format: date
 *                 example: "2026-05-10"
 *     responses:
 *       201:
 *         description: Solicitud creada
 */
router.post("/", auth, checkRole(['staff','profesor','alumno']), solicitudesController.createSolicitudes);

/**
 * @swagger
 * /api/solicitudes/{id}:
 *   get:
 *     summary: Obtener solicitud por ID
 *     tags: [Solicitudes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Solicitud encontrada
 */
router.get("/:id", auth, checkRole(['staff','profesor','alumno']), solicitudesController.getOneSolicitud);

/**
 * @swagger
 * /api/solicitudes/{id}:
 *   put:
 *     summary: Actualizar solicitud
 *     tags: [Solicitudes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               fecha_programada:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Solicitud actualizada
 */
router.put("/:id", auth, checkRole(['staff']), solicitudesController.updateSolicitud);

/**
 * @swagger
 * /api/solicitudes/{id}:
 *   delete:
 *     summary: Eliminar solicitud
 *     tags: [Solicitudes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Solicitud eliminada
 */
router.delete("/:id", auth, checkRole(['staff']), solicitudesController.deleteSolicitud);

module.exports = router;