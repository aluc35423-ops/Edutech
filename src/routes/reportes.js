const express = require('express');
const router = express.Router();
const reporteController = require('../controllers/reportecontroller');
const usuarioController = require('../controllers/usuarioController');
const auth = require("../middlewares/auth");

/**
 * @swagger
 * tags:
 *   name: Reportes
 *   description: Endpoints de reportes
 */

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Endpoints de usuarios
 */


/**
 * @swagger
 * /api/reportes/getAllReports:
 *   get:
 *     summary: Obtener todos los reportes
 *     tags: [Reportes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de reportes
 */
router.get("/getAllReports", auth, reporteController.getReportes);


/**
 * @swagger
 * /api/reportes/createReports:
 *   post:
 *     summary: Crear un reporte
 *     tags: [Reportes]
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
 *                 example: "Fuga de agua"
 *               descripcion:
 *                 type: string
 *                 example: "Hay una fuga en la calle principal"
 *               ubicacion:
 *                 type: string
 *                 example: "Av. Juárez #123"
 *               fecha:
 *                 type: string
 *                 example: "2026-03-23"
 *     responses:
 *       200:
 *         description: Reporte creado correctamente
 */
router.post("/createReports", auth, reporteController.createReportes);


/**
 * @swagger
 * /api/reportes/register:
 *   post:
 *     summary: Registrar usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Juan Pérez"
 *               email:
 *                 type: string
 *                 example: "juan@gmail.com"
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Usuario registrado
 */
router.post("/register", usuarioController.registerUsuario);


/**
 * @swagger
 * /api/reportes/loging:
 *   post:
 *     summary: Login de usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "juan@gmail.com"
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Usuario autenticado
 */
router.post("/loging", usuarioController.loginUsuario);

module.exports = router;