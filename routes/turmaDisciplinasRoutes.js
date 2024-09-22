const express = require('express');
const router = express.Router();
const turmasDisciplinasController = require('../controllers/turmasDisciplinasController');

/**
 * @swagger
 * components:
 *   schemas:
 *     TurmaDisciplinas:
 *       type: object
 *       required:
 *         - turma
 *         - disciplina
 *       properties:
 *         id:
 *           type: string
 *           description: ID gerado automaticamente pelo MongoDB.
 *         turma:
 *           type: string
 *           description: ID da turma.
 *         disciplina:
 *           type: string
 *           description: ID da disciplina.
 *       example:
 *         turma: 612d1b7c8d870c4f8d9f8a3a
 *         disciplina: 612d1b7c8d870c4f8d9f8a3b
 */

/**
 * @swagger
 * tags:
 *   name: TurmaDisciplinas
 *   description: API de gerenciamento das disciplinas das turmas
 */

/**
 * @swagger
 * /turmasdisciplinas:
 *   get:
 *     summary: Retorna todas as turmas e disciplinas
 *     tags: [TurmaDisciplinas]
 *     responses:
 *       200:
 *         description: Lista de todas as relações turma-disciplina.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TurmaDisciplinas'
 */
router.get('/turmasdisciplinas', turmasDisciplinasController.getTurmasDisciplina);

/**
 * @swagger
 * /turmasdisciplinas/{id}:
 *   get:
 *     summary: Retorna uma turma-disciplina por ID
 *     tags: [TurmaDisciplinas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da turma-disciplina
 *     responses:
 *       200:
 *         description: Dados da turma-disciplina.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TurmaDisciplinas'
 *       404:
 *         description: Turma ou disciplina não encontrada.
 */
router.get('/turmasdisciplinas/:id', turmasDisciplinasController.getTurmasDisciplinaById);

/**
 * @swagger
 * /turmasdisciplinas:
 *   post:
 *     summary: Cria uma nova relação turma-disciplina
 *     tags: [TurmaDisciplinas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TurmaDisciplinas'
 *     responses:
 *       201:
 *         description: Turma-disciplina criada com sucesso.
 *       400:
 *         description: Erro de validação ou requisição.
 */
router.post('/turmasdisciplinas', turmasDisciplinasController.createTurmasDisciplina);

/**
 * @swagger
 * /turmasdisciplinas/{id}:
 *   put:
 *     summary: Atualiza uma relação turma-disciplina existente
 *     tags: [TurmaDisciplinas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da turma-disciplina
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TurmaDisciplinas'
 *     responses:
 *       200:
 *         description: Turma-disciplina atualizada com sucesso.
 *       404:
 *         description: Turma ou disciplina não encontrada.
 */
router.put('/turmasdisciplinas/:id', turmasDisciplinasController.updateTurmasDisciplina);

/**
 * @swagger
 * /turmasdisciplinas/{id}:
 *   delete:
 *     summary: Deleta uma relação turma-disciplina
 *     tags: [TurmaDisciplinas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da turma-disciplina
 *     responses:
 *       200:
 *         description: Relação turma-disciplina deletada com sucesso.
 *       404:
 *         description: Turma ou disciplina não encontrada.
 */
router.delete('/turmasdisciplinas/:id', turmasDisciplinasController.deleteTurmasDisciplina);

/**
 * @swagger
 * /turmasdisciplinas/por-disciplina/{disciplinaId}:
 *   get:
 *     summary: Retorna todas as turmas associadas a uma disciplina
 *     tags: [TurmaDisciplinas]
 *     parameters:
 *       - in: path
 *         name: disciplinaId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da disciplina
 *     responses:
 *       200:
 *         description: Lista de turmas associadas à disciplina.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TurmaDisciplinas'
 *       404:
 *         description: Nenhuma turma encontrada para essa disciplina.
 */
router.get('/turmasdisciplinas/por-disciplina/:disciplinaId', turmasDisciplinasController.getTurmasDisciplinaByUserId);

module.exports = router;
