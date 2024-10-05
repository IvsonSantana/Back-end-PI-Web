const express = require('express');
const turmaController = require('../controllers/turmaController');
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
 *                     type: string
 *                   serie:
 *                     type: string
 *                     enum:
 *                       - 1º Ano
 *                       - 2º Ano
 *                       - 3º Ano
 *                   created_at:
 *                     type: string
 *                     format: date-time
 */
router.get('/', turmaController.getTurmas);

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
 *                   type: string
 *                 serie:
 *                   type: string
 *                   enum:
 *                     - 1º Ano
 *                     - 2º Ano
 *                     - 3º Ano
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Turma não encontrada
 */
router.get('/:id', turmaController.getTurmaById);

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
 *                 type: string
 *               serie:
 *                 type: string
 *                 enum:
 *                   - 1º Ano
 *                   - 2º Ano
 *                   - 3º Ano
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
 *                   type: string
 *                 serie:
 *                   type: string
 *                   enum:
 *                     - 1º Ano
 *                     - 2º Ano
 *                     - 3º Ano
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Erro de validação
 */
router.post('/', turmaController.createTurma);

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
 *                 type: string
 *               serie:
 *                 type: string
 *                 enum:
 *                   - 1º Ano
 *                   - 2º Ano
 *                   - 3º Ano
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
 *                   type: string
 *                 serie:
 *                   type: string
 *                   enum:
 *                     - 1º Ano
 *                     - 2º Ano
 *                     - 3º Ano
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Turma não encontrada
 */
router.put('/:id', turmaController.updateTurma);

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
router.delete('/:id', turmaController.deleteTurma);

/**
 * @swagger
 * /api/turmas/{id}/alunos:
 *   put:
 *     summary: Adiciona alunos a uma turma
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
 *               alunos:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Alunos adicionados com sucesso
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
 *                   type: string
 *                 serie:
 *                   type: string
 *                   enum:
 *                     - 1º Ano
 *                     - 2º Ano
 *                     - 3º Ano
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Turma não encontrada
 *       400:
 *         description: ID de turma inválido
 */
router.put('/:id/alunos', turmaController.addAlunosToTurma);

/**
 * @swagger
 * /api/turmas/delete/alunos:
 *   delete:
 *     summary: Remove alunos de uma turma
 *     tags: [Turmas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               turmaId:
 *                 type: string
 *               alunosIds:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Aluno(s) removido(s) da turma com sucesso
 *       404:
 *         description: Turma não encontrada
 */
router.delete('/delete/alunos', turmaController.deleteAlunosTurma);

/**
 * @swagger
 * /api/turmas/{id}/disciplinas:
 *   put:
 *     summary: Adiciona disciplinas a uma turma
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
 *               disciplinas:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Disciplinas adicionadas com sucesso
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
 *                   type: string
 *                 serie:
 *                   type: string
 *                   enum:
 *                     - 1º Ano
 *                     - 2º Ano
 *                     - 3º Ano
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Turma não encontrada
 *       400:
 *         description: ID de turma inválido
 */
router.put('/:id/disciplinas', turmaController.addDisciplinasToTurma);

/**
 * @swagger
 * /api/turmas/delete/disciplinas:
 *   delete:
 *     summary: Remove disciplinas de uma turma
 *     tags: [Turmas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               turmaId:
 *                 type: string
 *               disciplinasIds:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Disciplina(s) removida(s) da turma com sucesso
 *       404:
 *         description: Turma não encontrada
 */
router.delete('/delete/disciplinas', turmaController.deleteDisciplinasTurma);

module.exports = router;
