const express = require('express');
const router = express.Router();
const conceitoController = require('../controllers/conceitoController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Conceito:
 *       type: object
 *       required:
 *         - user
 *         - disciplina
 *       properties:
 *         id:
 *           type: string
 *           description: ID gerado automaticamente pelo MongoDB.
 *         user:
 *           type: string
 *           description: ID do usuário.
 *         disciplina:
 *           type: string
 *           description: ID da disciplina.
 *         conceito1:
 *           type: number
 *           description: Nota do conceito 1.
 *         conceito2:
 *           type: number
 *           description: Nota do conceito 2.
 *         conceitoParcial:
 *           type: number
 *           description: Nota parcial.
 *         conceitoRec:
 *           type: number
 *           description: Nota de recuperação.
 *         conceitoFinal:
 *           type: number
 *           description: Nota final.
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Data de criação do conceito.
 *       example:
 *         user: 612d1b7c8d870c4f8d9f8a3a
 *         disciplina: 612d1b7c8d870c4f8d9f8a3b
 *         conceito1: 8.5
 *         conceito2: 7.5
 *         conceitoParcial: 8
 *         conceitoRec: 9
 *         conceitoFinal: 8.5
 */

/**
 * @swagger
 * tags:
 *   name: Conceitos
 *   description: API de gerenciamento de conceitos
 */

/**
 * @swagger
 * /conceitos:
 *   get:
 *     summary: Retorna todos os conceitos
 *     tags: [Conceitos]
 *     responses:
 *       200:
 *         description: Lista de todos os conceitos.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Conceito'
 */
router.get('/conceitos', conceitoController.getAllConceitos);

/**
 * @swagger
 * /conceitos/{id}:
 *   get:
 *     summary: Retorna um conceito por ID
 *     tags: [Conceitos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do conceito
 *     responses:
 *       200:
 *         description: Dados do conceito.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Conceito'
 *       404:
 *         description: Conceito não encontrado.
 */
router.get('/conceitos/:id', conceitoController.getConceitoById);

/**
 * @swagger
 * /conceitos/user/{userId}:
 *   get:
 *     summary: Retorna conceitos por ID de usuário
 *     tags: [Conceitos]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Lista de conceitos relacionados a um usuário.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Conceito'
 *       404:
 *         description: Usuário ou conceitos não encontrados.
 */
router.get('/conceitos/user/:userId', conceitoController.getConceitoByUserId);

/**
 * @swagger
 * /conceitos:
 *   post:
 *     summary: Cria um novo conceito
 *     tags: [Conceitos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Conceito'
 *     responses:
 *       201:
 *         description: Conceito criado com sucesso.
 *       400:
 *         description: Erro de validação ou requisição.
 */
router.post('/conceitos', conceitoController.createConceito);

/**
 * @swagger
 * /conceitos/{id}:
 *   put:
 *     summary: Atualiza um conceito existente
 *     tags: [Conceitos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do conceito
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Conceito'
 *     responses:
 *       200:
 *         description: Conceito atualizado com sucesso.
 *       404:
 *         description: Conceito não encontrado.
 */
router.put('/conceitos/:id', conceitoController.updateConceito);

/**
 * @swagger
 * /conceitos/{id}:
 *   delete:
 *     summary: Deleta um conceito
 *     tags: [Conceitos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do conceito
 *     responses:
 *       200:
 *         description: Conceito deletado com sucesso.
 *       404:
 *         description: Conceito não encontrado.
 */
router.delete('/conceitos/:id', conceitoController.deleteConceito);

module.exports = router;
