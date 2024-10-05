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
 *       properties:
 *         id:
 *           type: string
 *           description: ID gerado automaticamente pelo MongoDB.
 *         nome:
 *           type: string
 *           description: Nome da disciplina.
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Data de criação da disciplina.
 *       example:
 *         nome: Matemática
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
 * /api/disciplinas/professor/{professorId}:
 *   get:
 *     summary: Retorna todas as disciplinas de um professor pelo ID
 *     tags: [Disciplinas]
 *     parameters:
 *       - in: path
 *         name: professorId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do professor
 *     responses:
 *       200:
 *         description: Lista de disciplinas do professor
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   nome:
 *                     type: string
 *                   turma:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       nome:
 *                         type: string
 *       404:
 *         description: Professor não encontrado ou nenhuma disciplina encontrada
 */
router.get('/professor/:professorId', disciplinaController.getDisciplinaByProfessorId);

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

/**
 * @swagger
 * /disciplinas/{id}/professor:
 *   put:
 *     summary: Adiciona um professor à disciplina
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
 *             type: object
 *             properties:
 *               professorId:
 *                 type: string
 *             required:
 *               - professorId
 *     responses:
 *       200:
 *         description: Professor adicionado à disciplina com sucesso.
 *       404:
 *         description: Disciplina não encontrada ou professor não encontrado.
 */
router.put('/disciplinas/:id/professor', disciplinaController.addProfessorToDisciplina);

/**
 * @swagger
 * /disciplinas/{id}/professor:
 *   delete:
 *     summary: Remove um professor da disciplina
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
 *         description: Professor removido da disciplina com sucesso.
 *       404:
 *         description: Disciplina não encontrada.
 */
router.delete('/disciplinas/:id/professor', disciplinaController.removeProfessorFromDisciplina);

/**
 * @swagger
 * /disciplinas/{id}/turma:
 *   put:
 *     summary: Adiciona uma turma à disciplina
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
 *             type: object
 *             properties:
 *               turmaId:
 *                 type: string
 *             required:
 *               - turmaId
 *     responses:
 *       200:
 *         description: Turma adicionada à disciplina com sucesso.
 *       404:
 *         description: Disciplina não encontrada ou turma não encontrada.
 */
router.put('/disciplinas/:id/turma', disciplinaController.addTurmaToDisciplina);

/**
 * @swagger
 * /disciplinas/{id}/turma:
 *   delete:
 *     summary: Remove uma turma da disciplina
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
 *         description: Turma removida da disciplina com sucesso.
 *       404:
 *         description: Disciplina não encontrada.
 */
router.delete('/disciplinas/:id/turma', disciplinaController.removeTurmaFromDisciplina);

module.exports = router;
