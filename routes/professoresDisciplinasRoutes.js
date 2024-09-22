const express = require('express');
const router = express.Router();
const professoresDisciplinasController = require('../controllers/professoresDisciplinasController');

/**
 * @swagger
 * components:
 *   schemas:
 *     ProfessoresDisciplinas:
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
 *           description: ID do professor (usuário).
 *         disciplina:
 *           type: string
 *           description: ID da disciplina.
 *       example:
 *         user: 612d1b7c8d870c4f8d9f8a3a
 *         disciplina: 612d1b7c8d870c4f8d9f8a3b
 */

/**
 * @swagger
 * tags:
 *   name: ProfessoresDisciplinas
 *   description: API de gerenciamento das disciplinas associadas aos professores
 */

/**
 * @swagger
 * /professoresdisciplinas:
 *   get:
 *     summary: Retorna todas as relações entre professores e disciplinas
 *     tags: [ProfessoresDisciplinas]
 *     responses:
 *       200:
 *         description: Lista de todas as relações professor-disciplina.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProfessoresDisciplinas'
 */
router.get('/professoresdisciplinas', professoresDisciplinasController.getProfessoresDisciplina);

/**
 * @swagger
 * /professoresdisciplinas/{id}:
 *   get:
 *     summary: Retorna uma relação professor-disciplina por ID
 *     tags: [ProfessoresDisciplinas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da relação professor-disciplina
 *     responses:
 *       200:
 *         description: Dados da relação professor-disciplina.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProfessoresDisciplinas'
 *       404:
 *         description: Professor ou Disciplina não encontrado.
 */
router.get('/professoresdisciplinas/:id', professoresDisciplinasController.getProfessoresDisciplinaById);

/**
 * @swagger
 * /professoresdisciplinas:
 *   post:
 *     summary: Cria uma nova relação professor-disciplina
 *     tags: [ProfessoresDisciplinas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProfessoresDisciplinas'
 *     responses:
 *       201:
 *         description: Relação professor-disciplina criada com sucesso.
 *       400:
 *         description: Erro de validação ou requisição.
 */
router.post('/professoresdisciplinas', professoresDisciplinasController.createProfessoresDisciplina);

/**
 * @swagger
 * /professoresdisciplinas/{id}:
 *   put:
 *     summary: Atualiza uma relação professor-disciplina existente
 *     tags: [ProfessoresDisciplinas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da relação professor-disciplina
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProfessoresDisciplinas'
 *     responses:
 *       200:
 *         description: Relação professor-disciplina atualizada com sucesso.
 *       404:
 *         description: Professor ou Disciplina não encontrado.
 */
router.put('/professoresdisciplinas/:id', professoresDisciplinasController.updateProfessoresDisciplina);

/**
 * @swagger
 * /professoresdisciplinas/{id}:
 *   delete:
 *     summary: Deleta uma relação professor-disciplina
 *     tags: [ProfessoresDisciplinas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da relação professor-disciplina
 *     responses:
 *       200:
 *         description: Relação professor-disciplina deletada com sucesso.
 *       404:
 *         description: Professor ou Disciplina não encontrado.
 */
router.delete('/professoresdisciplinas/:id', professoresDisciplinasController.deleteProfessoresDisciplina);

/**
 * @swagger
 * /professoresdisciplinas/por-user/{userId}:
 *   get:
 *     summary: Retorna todas as disciplinas associadas a um professor
 *     tags: [ProfessoresDisciplinas]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do professor (usuário)
 *     responses:
 *       200:
 *         description: Lista de disciplinas associadas ao professor.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProfessoresDisciplinas'
 *       404:
 *         description: Nenhuma disciplina encontrada para esse professor.
 */
router.get('/professoresdisciplinas/por-user/:userId', professoresDisciplinasController.getProfessoresDisciplinaByUserId);

module.exports = router;
