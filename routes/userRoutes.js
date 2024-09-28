const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - nome
 *         - login
 *         - email
 *         - password
 *         - tipo
 *       properties:
 *         id:
 *           type: string
 *           description: ID gerado automaticamente pelo MongoDB.
 *         nome:
 *           type: string
 *           description: Nome do usuário.
 *         email:
 *           type: string
 *           description: E-mail do usuário, único.
 *         password:
 *           type: string
 *           description: Senha do usuário (será criptografada).
 *         tipo:
 *           type: string
 *           enum:
 *             - coordenador
 *             - professor
 *             - aluno 
 *           description: Tipo de usuário (coordenador, professor, aluno).
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Data de criação do usuário.
 *      
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API de gerenciamento de usuários
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retorna todos os usuários
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de todos os usuários.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get('/users', userController.getUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Retorna um usuário por ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Dados do usuário.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuário não encontrado.
 */
router.get('/users/:id', userController.getUserById);

/**
 * @swagger
 * /coordenadores:
 *   get:
 *     summary: Retorna todos os coordenadores
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de coordenadores.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */

router.get('/coordenadores', userController.getCoordenadores)

/**
 * @swagger
 * /alunos:
 *   get:
 *     summary: Retorna todos os alunos
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de alunos.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */

router.get('/alunos', userController.getAlunos)

/**
 * @swagger
 * /professores:
 *   get:
 *     summary: Retorna todos os professores
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de professores.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get('/professores', userController.getProfessores);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso.
 *       400:
 *         description: Erro de validação ou requisição.
 */
router.post('/users', userController.createUser);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Atualiza um usuário existente
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso.
 *       404:
 *         description: Usuário não encontrado.
 */
router.put('/users/:id', userController.updateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Deleta um usuário
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário deletado com sucesso.
 *       404:
 *         description: Usuário não encontrado.
 */
router.delete('/users/:id', userController.deleteUser);

module.exports = router;
