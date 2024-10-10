const express = require('express');
const router = express.Router();
const disciplinaController = require('../controllers/disciplinaController');
const authCoordenador = require('../middleware/coordenadorMiddleware');
const authProfessor  = require('../middleware/professorMiddleware');
const  authGeral = require('../middleware/authGeral');

/**
 * @swagger
 * components:
 *   schemas:
 *     Disciplina:
 *       type: object
 *       required:
 *         - nome
 *         - professor
 *         - turma
 *       properties:
 *         id:
 *           type: string
 *           description: ID gerado automaticamente pelo MongoDB.
 *         nome:
 *           type: string
 *           description: Nome da disciplina.
 *         professor:
 *           type: string
 *           description: ID do professor associado à disciplina.
 *         turma:
 *           type: string
 *           description: ID da turma associada à disciplina.
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Data de criação da disciplina.
 *       example:
 *         nome: Matemática
 *         professor: "63f84c9e3b1f1d4e20c64c62"  # Exemplo de ID de professor
 *         turma: "63f84c9e3b1f1d4e20c64c63"    # Exemplo de ID de turma
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
 *         description: Lista de disciplinas
 *       500:
 *         description: Erro ao buscar disciplinas
 */
router.get('/disciplinas', authGeral, disciplinaController.getDisciplinas);

/**
 * @swagger
 * /disciplinas/{id}:
 *   get:
 *     summary: Retorna uma disciplina específica pelo ID
 *     tags: [Disciplinas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da disciplina
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Disciplina encontrada
 *       404:
 *         description: Disciplina não encontrada
 *       500:
 *         description: Erro ao buscar disciplina
 */
router.get('/disciplinas/:id', authGeral, disciplinaController.getDisciplinaById);

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
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Nome da disciplina
 *               professor:
 *                 type: string
 *                 description: ID do professor
 *               turma:
 *                 type: string
 *                 description: ID da turma
 *     responses:
 *       201:
 *         description: Disciplina criada com sucesso
 *       404:
 *         description: Turma não encontrada
 *       500:
 *         description: Erro ao criar disciplina
 */
router.post('/disciplinas', authCoordenador,disciplinaController.createDisciplina);

/**
 * @swagger
 * /disciplinas/{id}:
 *   put:
 *     summary: Atualiza uma disciplina existente pelo ID
 *     tags: [Disciplinas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da disciplina
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Nome da disciplina
 *               professor:
 *                 type: string
 *                 description: ID do professor
 *               turma:
 *                 type: string
 *                 description: ID da turma
 *     responses:
 *       200:
 *         description: Disciplina atualizada com sucesso
 *       404:
 *         description: Disciplina não encontrada
 *       500:
 *         description: Erro ao atualizar disciplina
 */
router.put('/disciplinas/:id', authCoordenador,disciplinaController.updateDisciplina);

/**
 * @swagger
 * /disciplinas/{id}:
 *   delete:
 *     summary: Deleta uma disciplina pelo ID
 *     tags: [Disciplinas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da disciplina
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Disciplina deletada com sucesso
 *       404:
 *         description: Disciplina não encontrada
 *       500:
 *         description: Erro ao deletar disciplina
 */
router.delete('/disciplinas/:id', authCoordenador, disciplinaController.deleteDisciplina);

module.exports = router;
