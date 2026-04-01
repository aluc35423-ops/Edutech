const express = require('express');
const router = express.Router();
const materialesController = require('../controllers/materialesController');
const { auth, checkRole } = require("../middlewares/auth");

/**
 * @swagger
 * tags:
 * - name: Materiales
 * description: Gestión de inventario de Tinta & Asfalto
 */

/**
 * @swagger
 * /api/materials:
 * get:
 * summary: Obtener todos los materiales
 * tags: [Materiales]
 * security:
 * - bearerAuth: []
 * responses:
 * 200:
 * description: Lista de materiales obtenida con éxito
 */
router.get("/", auth, materialesController.getMateriales);

/**
 * @swagger
 * /api/materials/search:
 * get:
 * summary: Buscar materiales por nombre
 * tags: [Materiales]
 * security:
 * - bearerAuth: []
 * parameters:
 * - in: query
 * name: search
 * schema:
 * type: string
 * description: Palabra clave para buscar
 * responses:
 * 200:
 * description: Resultados de la búsqueda
 */
router.get("/search", auth, materialesController.getResources);

/**
 * @swagger
 * /api/materials/NewMaterial:
 * post:
 * summary: Agregar nuevo material de graffiti
 * tags: [Materiales]
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
 * example: "Aerosol Montana Black"
 * descripcion:
 * type: string
 * example: "Color Negro mate"
 * ubicacion:
 * type: string
 * example: "Estante A1"
 * responses:
 * 201:
 * description: Material creado
 */
router.post("/NewMaterial", auth, checkRole(['staff']), materialesController.addMateriales);

/**
 * @swagger
 * /api/materials/{id}:
 * put:
 * summary: Actualizar un material por ID
 * tags: [Materiales]
 * security:
 * - bearerAuth: []
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: string
 * responses:
 * 200:
 * description: Material actualizado
 */
router.put("/:id", auth, checkRole(['staff']), materialesController.updateResource);

/**
 * @swagger
 * /api/materials/{id}:
 * delete:
 * summary: Eliminar un material
 * tags: [Materiales]
 * security:
 * - bearerAuth: []
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: string
 * responses:
 * 200:
 * description: Material eliminado
 */
router.delete("/:id", auth, checkRole(['staff']), materialesController.deleteResource);

module.exports = router;