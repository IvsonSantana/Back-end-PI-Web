const express = require('express');
const router = express.Router();
const conceitoController = require('../controllers/conceitoController');
const authCoordenador = require('../middleware/coordenadorMiddleware');
const authProfessor  = require('../middleware/professorMiddleware');
const  authGeral = require('../middleware/authGeral');



/**
 * @swagger
 * components:
 *   schemas:
 *     Conceito:
 *       type: object
 *       required:
 *         - aluno
 *         - disciplina
 *       properties:
 *         id:
 *           type: string
 *           description: ID gerado automaticamente pelo MongoDB.
 *         aluno:
 *           type: string
 *           description: ID do aluno (referência para o modelo User).
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
 *         aluno: 612d1b7c8d870c4f8d9f8a3a
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
router.get('/conceitos', authGeral,conceitoController.getAllConceitos);

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
router.get('/conceitos/:id', authGeral, conceitoController.getConceitoById);

/**
 * @swagger
 * /conceitos/aluno/{alunoId}:
 *   get:
 *     summary: Retorna conceitos de um aluno para uma disciplina específica
 *     tags: [Conceitos]
 *     parameters:
 *       - in: path
 *         name: alunoId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do aluno
 *       - in: query
 *         name: disciplina
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da disciplina
 *     responses:
 *       200:
 *         description: Lista de conceitos relacionados ao aluno e disciplina.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Conceito'
 *       404:
 *         description: Conceitos não encontrados.
 */
router.get('/conceitos/aluno/:alunoId', authGeral, conceitoController.getConceitosPorAlunoEDisciplina);

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
router.get('/conceitos/user/:userId', authGeral, conceitoController.getConceitoByUserId);

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
router.post('/conceitos', authGeral, conceitoController.createConceito);

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
router.put('/conceitos/:id', authGeral, conceitoController.updateConceito);

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
router.delete('/conceitos/:id', authGeral, conceitoController.deleteConceito);

/**
 * @swagger
 * /conceitos/aluno/{alunoId}:
 *   get:
 *     summary: Obter conceitos de um aluno por ID e disciplina
 *     description: Retorna todos os conceitos associados a um aluno específico e a uma disciplina específica.
 *     parameters:
 *       - name: alunoId
 *         in: path
 *         required: true
 *         description: ID do aluno para o qual os conceitos devem ser retornados.
 *         schema:
 *           type: string
 *       - name: disciplina
 *         in: query
 *         required: true
 *         description: ID da disciplina para a qual os conceitos devem ser retornados.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de conceitos do aluno na disciplina especificada.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   aluno:
 *                     type: string
 *                     description: ID do aluno.
 *                   disciplina:
 *                     type: string
 *                     description: ID da disciplina.
 *                   conceito1:
 *                     type: number
 *                     description: Primeiro conceito.
 *                   conceito2:
 *                     type: number
 *                     description: Segundo conceito.
 *                   conceitoParcial:
 *                     type: number
 *                     description: Conceito parcial.
 *                   conceitoRec:
 *                     type: number
 *                     description: Conceito de recuperação.
 *                   conceitoFinal:
 *                     type: number
 *                     description: Conceito final.
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                     description: Data de criação do conceito.
 *       404:
 *         description: Conceitos não encontrados.
 *       500:
 *         description: Erro interno do servidor.
 */
router.get('/conceitos/aluno/:alunoId', conceitoController.getConceitosPorAlunoEDisciplina);

module.exports = router;
