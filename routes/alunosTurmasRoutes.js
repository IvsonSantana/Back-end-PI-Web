const express = require('express');
const router = express.Router();
const alunosTurmasController = require('../controllers/alunosTurmasController');

/**
 * @swagger
 * components:
 *   schemas:
 *     AlunosTurmas:
 *       type: object
 *       required:
 *         - user
 *         - turma
 *       properties:
 *         id:
 *           type: string
 *           description: ID gerado automaticamente pelo MongoDB.
 *         user:
 *           type: string
 *           description: ID do aluno (usuário).
 *         turma:
 *           type: string
 *           description: ID da turma.
 *       example:
 *         user: 612d1b7c8d870c4f8d9f8a3a
 *         turma: 612d1b7c8d870c4f8d9f8a3b
 */

/**
 * @swagger
 * tags:
 *   name: AlunosTurmas
 *   description: API de gerenciamento das turmas associadas aos alunos
 */

/**
 * @swagger
 * /alunosturmas:
 *   get:
 *     summary: Retorna todas as relações entre alunos e turmas
 *     tags: [AlunosTurmas]
 *     responses:
 *       200:
 *         description: Lista de todas as relações aluno-turma.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AlunosTurmas'
 */
router.get('/alunosturmas', alunosTurmasController.getAlunosTurma);

/**
 * @swagger
 * /alunosturmas/{id}:
 *   get:
 *     summary: Retorna uma relação aluno-turma por ID
 *     tags: [AlunosTurmas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da relação aluno-turma
 *     responses:
 *       200:
 *         description: Dados da relação aluno-turma.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AlunosTurmas'
 *       404:
 *         description: Aluno ou Turma não encontrado.
 */
router.get('/alunosturmas/:id', alunosTurmasController.getAlunosTurmaById);

/**
 * @swagger
 * /alunosturmas:
 *   post:
 *     summary: Cria uma nova relação aluno-turma
 *     tags: [AlunosTurmas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AlunosTurmas'
 *     responses:
 *       201:
 *         description: Relação aluno-turma criada com sucesso.
 *       400:
 *         description: Erro de validação ou requisição.
 */
router.post('/alunosturmas', alunosTurmasController.createAlunosTurma);

/**
 * @swagger
 * /alunosturmas/{id}:
 *   put:
 *     summary: Atualiza uma relação aluno-turma existente
 *     tags: [AlunosTurmas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da relação aluno-turma
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AlunosTurmas'
 *     responses:
 *       200:
 *         description: Relação aluno-turma atualizada com sucesso.
 *       404:
 *         description: Aluno ou Turma não encontrado.
 */
router.put('/alunosturmas/:id', alunosTurmasController.updateAlunosTurma);

/**
 * @swagger
 * /alunosturmas/{id}:
 *   delete:
 *     summary: Deleta uma relação aluno-turma
 *     tags: [AlunosTurmas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da relação aluno-turma
 *     responses:
 *       200:
 *         description: Relação aluno-turma deletada com sucesso.
 *       404:
 *         description: Aluno ou Turma não encontrado.
 */
router.delete('/alunosturmas/:id', alunosTurmasController.deleteAlunosTurma);

module.exports = router;
