const express = require('express');
const router = express.Router();
const materialesController = require('../controllers/materialesController');
const { auth, checkRole } = require("../middlewares/auth");

/**
 * @swagger
 * tags:
 *   - name: Materiales
 *     description: Gestión de inventario educativo
 */

/**
 * @swagger
 * /api/materials:
 *   get:
 *     summary: Obtener materiales
 *     tags: [Materiales]
 *     security:
 *       - bearerAuth: []
 *         name: search
 *         schema:
 *           type: string
 *         description: Buscar por nombre
 *     responses:
 *       200:
 *         description: Lista de materiales
 */
router.get("/", auth, materialesController.getMateriales);

/**
 * @swagger
 * /api/materials:
 *   post:
 *     summary: Crear material
 *     tags: [Materiales]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo: { type: "string", example: "Proyector EPSON" }
 *               descripcion: { type: "string", example: "HDMI incluido" }
 *               ubicacion: { type: "string", example: "Sala 3" }
 *               estado: { type: "string", example: "disponible" }
 *     responses:
 *       201:
 *         description: Material creado
 */
router.post("/", auth, checkRole(['staff']), materialesController.addMateriales);

/**
 * @swagger
 * /api/materials/{id}:
 *   get:
 *     summary: Obtener material por ID
 *     tags: [Materiales]
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
 *         description: Material encontrado
 */
router.get("/:id", auth, materialesController.getResources);

/**
 * @swagger
 * /api/materials/{id}:
 *   put:
 *     summary: Actualizar material
 *     tags: [Materiales]
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
 *               titulo: { type: "string", example: "Proyector EPSON 4K" }
 *               descripcion: { type: "string", example: "Cable HDMI y control incluidos" }
 *               ubicacion: { type: "string", example: "Sala de Maestros" }
 *               estado: { type: "string", example: "disponible" }
 *     responses:
 *       200:
 *         description: Material actualizado
 */
router.put("/:id", auth, checkRole(['staff']), materialesController.updateResource);

/**
 * @swagger
 * /api/materials/{id}:
 *   delete:
 *     summary: Eliminar material
 *     tags: [Materiales]
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
 *         description: Material eliminado
 */
router.delete("/:id", auth, checkRole(['staff']), materialesController.deleteResource);

module.exports = router;