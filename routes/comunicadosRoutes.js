const express = require('express');
const router = express.Router();
const comunicadoController = require('../controllers/comunicadosController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Comunicado:
 *       type: object
 *       required:
 *         - titulo
 *         - conteudo
 *         - user
 *       properties:
 *         id:
 *           type: string
 *           description: ID gerado automaticamente pelo MongoDB.
 *         titulo:
 *           type: string
 *           description: Título do comunicado.
 *         conteudo:
 *           type: string
 *           description: Conteúdo do comunicado.
 *         user:
 *           type: string
 *           description: ID do usuário associado ao comunicado.
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Data de criação do comunicado.
 *       example:
 *         titulo: Aviso importante
 *         conteudo: Aulas suspensas amanhã.
 *         user: 612d1b7c8d870c4f8d9f8a3a
 */

/**
 * @swagger
 * tags:
 *   name: Comunicados
 *   description: API de gerenciamento de comunicados
 */

/**
 * @swagger
 * /comunicados:
 *   get:
 *     summary: Retorna todos os comunicados
 *     tags: [Comunicados]
 *     responses:
 *       200:
 *         description: Lista de todos os comunicados.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comunicado'
 */
router.get('/comunicados', comunicadoController.getComunicados);

/**
 * @swagger
 * /comunicados/{id}:
 *   get:
 *     summary: Retorna um comunicado por ID
 *     tags: [Comunicados]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do comunicado
 *     responses:
 *       200:
 *         description: Dados do comunicado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comunicado'
 *       404:
 *         description: Comunicado não encontrado.
 */
router.get('/comunicados/:id', comunicadoController.getComunicadoById);

/**
 * @swagger
 * /comunicados/user/{userId}:
 *   get:
 *     summary: Retorna comunicados por ID de usuário
 *     tags: [Comunicados]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Lista de comunicados relacionados a um usuário.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comunicado'
 *       404:
 *         description: Usuário não encontrado.
 */
router.get('/comunicados/user/:userId', comunicadoController.getComunicadoByUserId);

/**
 * @swagger
 * /comunicados:
 *   post:
 *     summary: Cria um novo comunicado
 *     tags: [Comunicados]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comunicado'
 *     responses:
 *       201:
 *         description: Comunicado criado com sucesso.
 *       400:
 *         description: Erro de validação ou requisição.
 */
router.post('/comunicados', comunicadoController.createComunicado);

/**
 * @swagger
 * /comunicados/{id}:
 *   put:
 *     summary: Atualiza um comunicado existente
 *     tags: [Comunicados]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do comunicado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comunicado'
 *     responses:
 *       200:
 *         description: Comunicado atualizado com sucesso.
 *       404:
 *         description: Comunicado não encontrado.
 */
router.put('/comunicados/:id', comunicadoController.updateComunicado);

/**
 * @swagger
 * /comunicados/{id}:
 *   delete:
 *     summary: Deleta um comunicado
 *     tags: [Comunicados]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do comunicado
 *     responses:
 *       200:
 *         description: Comunicado deletado com sucesso.
 *       404:
 *         description: Comunicado não encontrado.
 */
router.delete('/comunicados/:id', comunicadoController.deleteComunicado);

module.exports = router;
