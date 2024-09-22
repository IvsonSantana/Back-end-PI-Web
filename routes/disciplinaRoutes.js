const express = require('express');
const router = express.Router();
const disciplinaController = require('../controllers/disciplinaController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Disciplina:
 *       type: object
 *       required:
 *         - nome
 *         - descricao
 *       properties:
 *         id:
 *           type: string
 *           description: ID gerado automaticamente pelo MongoDB.
 *         nome:
 *           type: string
 *           description: Nome da disciplina.
 *         descricao:
 *           type: string
 *           description: Descrição da disciplina.
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Data de criação da disciplina.
 *       example:
 *         nome: Matemática
 *         descricao: Disciplina de matemática básica.
 */

/**
 * @swagger
 * tags:
 *   name: Disciplinas
 *   description: API de gerenciamento de disciplinas
 */

/**
 * @swagger
 * /disciplinas:
 *   get:
 *     summary: Retorna todas as disciplinas
 *     tags: [Disciplinas]
 *     responses:
 *       200:
 *         description: Lista de todas as disciplinas.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Disciplina'
 */
router.get('/disciplinas', disciplinaController.getDisciplinas);

/**
 * @swagger
 * /disciplinas/{id}:
 *   get:
 *     summary: Retorna uma disciplina por ID
 *     tags: [Disciplinas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da disciplina
 *     responses:
 *       200:
 *         description: Dados da disciplina.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Disciplina'
 *       404:
 *         description: Disciplina não encontrada.
 */
router.get('/disciplinas/:id', disciplinaController.getDisciplinaById);

/**
 * @swagger
 * /disciplinas:
 *   post:
 *     summary: Cria uma nova disciplina
 *     tags: [Disciplinas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Disciplina'
 *     responses:
 *       201:
 *         description: Disciplina criada com sucesso.
 *       400:
 *         description: Erro de validação ou requisição.
 */
router.post('/disciplinas', disciplinaController.createDisciplina);

/**
 * @swagger
 * /disciplinas/{id}:
 *   put:
 *     summary: Atualiza uma disciplina existente
 *     tags: [Disciplinas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da disciplina
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Disciplina'
 *     responses:
 *       200:
 *         description: Disciplina atualizada com sucesso.
 *       404:
 *         description: Disciplina não encontrada.
 */
router.put('/disciplinas/:id', disciplinaController.updateDisciplina);

/**
 * @swagger
 * /disciplinas/{id}:
 *   delete:
 *     summary: Deleta uma disciplina
 *     tags: [Disciplinas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da disciplina
 *     responses:
 *       200:
 *         description: Disciplina deletada com sucesso.
 *       404:
 *         description: Disciplina não encontrada.
 */
router.delete('/disciplinas/:id', disciplinaController.deleteDisciplina);

module.exports = router;
