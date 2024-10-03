const express = require('express');
const {
  getTurmas,
  getTurmaById,
  createTurma,
  updateTurma,
  deleteTurma
} = require('../controllers/turmaController');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Turmas
 *   description: Rotas de gerenciamento de turmas
 */

/**
 * @swagger
 * /api/turmas:
 *   get:
 *     summary: Retorna todas as turmas
 *     tags: [Turmas]
 *     responses:
 *       200:
 *         description: Lista de turmas
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
 *                   ano:
 *                     type: number
 *                   serie:
 *                     type: string
 *                     enum:
 *                       - 1º Ano
 *                       - 2º Ano
 *                       - 3º Ano 
 *                     description: Tipo de usuário (1º Ano, 3º Ano, 3º Ano).
 *                   created_at:
 *                     type: string
 *                     format: date-time
 */
router.get('/', getTurmas);

/**
 * @swagger
 * /api/turmas/{id}:
 *   get:
 *     summary: Retorna uma turma pelo ID
 *     tags: [Turmas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da turma
 *     responses:
 *       200:
 *         description: Detalhes da turma
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 nome:
 *                   type: string
 *                 ano:
 *                   type: number
 *                 serie:
 *                   type: string
 *                   enum:
 *                     - 1º Ano
 *                     - 2º Ano
 *                     - 3º Ano 
 *                   description: Tipo de usuário (1º Ano, 3º Ano, 3º Ano).
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Turma não encontrada
 */
router.get('/:id', getTurmaById);

/**
 * @swagger
 * /api/turmas:
 *   post:
 *     summary: Cria uma nova turma
 *     tags: [Turmas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               ano:
 *                 type: number
 *               serie:
 *                 type: string
 *                 enum:
 *                   - 1º Ano
 *                   - 2º Ano
 *                   - 3º Ano 
 *                 description: Tipo de usuário (1º Ano, 3º Ano, 3º Ano).
 *     responses:
 *       201:
 *         description: Turma criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 nome:
 *                   type: string
 *                 ano:
 *                   type: number
 *                 serie:
 *                   type: string
 *                   enum:
 *                     - 1º Ano
 *                     - 2º Ano
 *                     - 3º Ano 
 *                   description: Tipo de usuário (1º Ano, 3º Ano, 3º Ano).
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Erro de validação
 */
router.post('/', createTurma);

/**
 * @swagger
 * /api/turmas/{id}:
 *   put:
 *     summary: Atualiza uma turma
 *     tags: [Turmas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da turma
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               ano:
 *                 type: number
 *               serie:
 *                 type: string
 *                 enum:
 *                   - 1º Ano
 *                   - 2º Ano
 *                   - 3º Ano 
 *                 description: Tipo de usuário (1º Ano, 3º Ano, 3º Ano).
 *     responses:
 *       200:
 *         description: Turma atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 nome:
 *                   type: string
 *                 ano:
 *                   type: number
 *                 semestre:
 *                   type: string
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Turma não encontrada
 */
router.put('/:id', updateTurma);

/**
 * @swagger
 * /api/turmas/{id}:
 *   delete:
 *     summary: Deleta uma turma
 *     tags: [Turmas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da turma
 *     responses:
 *       200:
 *         description: Turma deletada com sucesso
 *       404:
 *         description: Turma não encontrada
 */
router.delete('/:id', deleteTurma);

module.exports = router;
