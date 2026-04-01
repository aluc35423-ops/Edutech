const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { auth } = require("../middlewares/auth");

/**
 * @swagger
 * tags:
 * name: Usuarios
 * description: Gestión de cuentas para Tinta & Asfalto
 */

/**
 * @swagger
 * /api/usuarios/register:
 * post:
 * summary: Registrar un nuevo usuario
 * tags: [Usuarios]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * nombre: { type: string, example: "Ulises" }
 * apellido: { type: string, example: "Alucard" }
 * email: { type: string, example: "ulises@tinta.com" }
 * password: { type: string, example: "admin123" }
 * role: { type: string, enum: [staff, profesor, alumno], example: "staff" }
 */
router.post("/register", usuarioController.registerUsuario);

/**
 * @swagger
 * /api/usuarios/login:
 * post:
 * summary: Iniciar sesión
 * tags: [Usuarios]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * email: { type: string, example: "ulises@tinta.com" }
 * password: { type: string, example: "admin123" }
 */
router.post("/login", usuarioController.loginUsuario);

/**
 * @swagger
 * /api/usuarios:
 * get:
 * summary: Obtener todos los usuarios
 * tags: [Usuarios]
 * security:
 * - bearerAuth: []
 */
router.get("/", auth, usuarioController.GetAll);

/**
 * @swagger
 * /api/usuarios/{id}:
 * get:
 * summary: Obtener un usuario por ID
 * tags: [Usuarios]
 * security:
 * - bearerAuth: []
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema: { type: string }
 */
router.get("/:id", auth, usuarioController.GetOne);

/**
 * @swagger
 * /api/usuarios/{id}:
 * put:
 * summary: Actualizar datos de usuario
 * tags: [Usuarios]
 * security:
 * - bearerAuth: []
 * parameters:
 * - in: path
 * name: id
 * required: true
 */
router.put("/:id", auth, usuarioController.UpdateOneUser);

/**
 * @swagger
 * /api/usuarios/{id}:
 * delete:
 * summary: Eliminar un usuario
 * tags: [Usuarios]
 * security:
 * - bearerAuth: []
 * parameters:
 * - in: path
 * name: id
 * required: true
 */
router.delete("/:id", auth, usuarioController.DeleteOne);

module.exports = router;