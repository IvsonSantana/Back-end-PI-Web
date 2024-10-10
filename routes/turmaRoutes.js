const express = require('express');
const turmaController = require('../controllers/turmaController');
const router = express.Router();
const authCoordenador = require('../middleware/coordenadorMiddleware');
const  authGeral = require('../middleware/authGeral');

/**
 * @swagger
 * components:
 *   schemas:
 *     Turma:
 *       type: object
 *       required:
 *         - nome
 *         - ano
 *         - serie
 *       properties:
 *         id:
 *           type: string
 *           description: ID gerado automaticamente pelo MongoDB.
 *         nome:
 *           type: string
 *           description: Nome da turma.
 *         ano:
 *           type: string
 *           description: Ano da turma.
 *         serie:
 *           type: string
 *           enum:
 *             - 1º Ano
 *             - 2º Ano
 *             - 3º Ano
 *           description: Série da turma.
 *         aluno:
 *           type: array
 *           items:
 *             type: string
 *           description: Lista de IDs dos alunos associados à turma.
 *         disciplinas:
 *           type: array
 *           items:
 *             type: string
 *           description: Lista de IDs das disciplinas associadas à turma.
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Data e hora em que a turma foi criada.
 */

/**
 * @swagger
 * tags:
 *   name: Turmas
 *   description: Rotas de gerenciamento de turmas
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retorna todas as turmas
 *     tags: [Turmas]
 *     responses:
 *       200:
 *         description: Uma lista de turmas
 *       500:
 *         description: Erro ao buscar turmas
 */
router.get('/',authCoordenador, turmaController.getTurmas);

/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Retorna uma turma pelo ID
 *     tags: [Turmas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da turma
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Turma encontrada
 *       404:
 *         description: Turma não encontrada
 *       500:
 *         description: Erro ao buscar a turma
 */
router.get('/:id', authCoordenador, turmaController.getTurmaById);

/**
 * @swagger
 * /alunos/{turmaId}:
 *   get:
 *     summary: Retorna alunos de uma turma pelo ID
 *     tags: [Turmas]
 *     parameters:
 *       - in: path
 *         name: turmaId
 *         required: true
 *         description: ID da turma
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de alunos
 *       404:
 *         description: Turma não encontrada
 *       500:
 *         description: Erro ao buscar alunos da turma
 */
router.get('/alunos/:turmaId', authGeral, turmaController.getAlunosTurma);

/**
 * @swagger
 * /:
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
 *               aluno:
 *                 type: array
 *                 items:
 *                   type: string
 *               disciplinas:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Turma criada com sucesso
 *       400:
 *         description: Erro ao criar turma
 */
router.post('/', authCoordenador , turmaController.createTurma);

/**
 * @swagger
 * /{id}:
 *   put:
 *     summary: Atualiza uma turma pelo ID
 *     tags: [Turmas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da turma
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
 *               ano:
 *                 type: string
 *               serie:
 *                 type: string
 *     responses:
 *       200:
 *         description: Turma atualizada com sucesso
 *       404:
 *         description: Turma não encontrada
 *       500:
 *         description: Erro ao atualizar a turma
 */
router.put('/:id', authCoordenador , turmaController.updateTurma);

/**
 * @swagger
 * /{id}:
 *   delete:
 *     summary: Deleta uma turma pelo ID
 *     tags: [Turmas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da turma
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Turma deletada com sucesso
 *       404:
 *         description: Turma não encontrada
 *       500:
 *         description: Erro ao deletar a turma
 */
router.delete('/:id', authCoordenador , turmaController.deleteTurma);

/**
 * @swagger
 * /delete/alunos:
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
 *               alunosIds:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Alunos removidos da turma com sucesso
 *       404:
 *         description: Turma não encontrada
 *       500:
 *         description: Erro ao remover alunos
 */
router.delete('/delete/alunos', authCoordenador , turmaController.deleteAlunosTurma);

/**
 * @swagger
 * /{id}/disciplinas:
 *   put:
 *     summary: Adiciona disciplinas a uma turma
 *     tags: [Turmas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da turma
 *         schema:
 *           type: string
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
 *         description: Disciplinas adicionadas à turma com sucesso
 *       404:
 *         description: Turma não encontrada
 *       500:
 *         description: Erro ao adicionar disciplinas
 */
router.put('/:id/disciplinas',  authCoordenador, turmaController.addDisciplinasToTurma);

/**
 * @swagger
 * /turmas/{turmaId}/alunos:
 *   put:
 *     summary: Adiciona alunos a uma turma
 *     tags: [Turmas]
 *     parameters:
 *       - in: path
 *         name: turmaId
 *         required: true
 *         description: ID da turma
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               aluno:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Alunos adicionados à turma com sucesso
 *       404:
 *         description: Turma não encontrada
 *       500:
 *         description: Erro ao adicionar alunos
 */
router.put('/turmas/:turmaId/alunos', authCoordenador, turmaController.adicionarAlunos);

/**
 * @swagger
 * /delete/disciplinas:
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
 *         description: Disciplinas removidas da turma com sucesso
 *       404:
 *         description: Turma não encontrada
 *       500:
 *         description: Erro ao remover disciplinas
 */
router.delete('/delete/disciplinas', authCoordenador, turmaController.deleteDisciplinasFromTurma);

/**
 * @swagger
 * /delete/{id}:
 *   delete:
 *     summary: Remove alunos de uma turma
 *     tags: [Turmas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da turma
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Aluno(s) removido(s) da turma com sucesso
 *       404:
 *         description: Turma não encontrada
 *       500:
 *         description: Erro ao remover aluno(s)
 */
router.delete('/delete/:id', authCoordenador, turmaController.deleteAlunosTurma);

/**
 * @swagger
 * /turmas/{id}:
 *   put:
 *     summary: Atualiza alunos de uma turma
 *     tags: [Turmas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da turma
 *         schema:
 *           type: string
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
 *         description: Alunos atualizados com sucesso
 *       404:
 *         description: Turma não encontrada
 *       500:
 *         description: Erro ao atualizar alunos
 */
router.get('/alunos/:turmaId', authGeral,turmaController.getAlunosTurma);

/**
 * @swagger
 * /turmas/{id}:
 *   put:
 *     summary: Atualiza alunos de uma turma
 *     tags: [Turmas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da turma
 *         schema:
 *           type: string
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
 *         description: Alunos atualizados com sucesso
 *       404:
 *         description: Turma não encontrada
 *       500:
 *         description: Erro ao atualizar alunos
 */
router.put('/turmas/:id', authGeral, turmaController.attAlunoFromTurma);

module.exports = router;
