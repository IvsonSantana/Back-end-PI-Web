# Portal do Aluno API - Mediotec

Uma API REST para gerenciamento de dados do Portal do Aluno.

## Descrição

Esta API fornece funcionalidades para o gerenciamento de usuários, notas e comunicados no Portal do Aluno. O sistema foi desenvolvido com foco em segurança, escalabilidade e documentação acessível.

## Tecnologias Utilizadas

- **Node.js**: Plataforma de desenvolvimento backend.
- **Express.js**: Framework web para Node.js.
- **MongoDB (com Mongoose)**: Banco de dados NoSQL, com Mongoose como ODM.
- **JWT**: Para autenticação e autorização.
- **Helmet**: Middleware de segurança.
- **Swagger**: Para geração de documentação da API.
- **Bcrypt**: Para hashing de senhas.
- **Dotenv**: Para gerenciamento de variáveis de ambiente.

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão mínima recomendada: 16.x)
- **MongoDB** (localmente ou em um serviço como MongoDB Atlas)

Para configurar o MongoDB:

1. Crie um banco de dados local com `mongod`.
2. Configure o arquivo `.env` para incluir a URI do MongoDB.

## Instalação

1. Clone o repositório para seu ambiente local:
   ```bash
   git clone https://github.com/IvsonSantana/Back-end-PI-Web.git

2. Instale as dependências do projeto: 
   npm install

3. Configure as variáveis de ambiente criando um arquivo .env com as seguintes variáveis:
   MONGODB_URI=mongodb://localhost:27017/nome_do_banco
   JWT_SECRET=sua_chave_secreta
   PORT: 3000

## USO:
node app.js

## Colaboradores

Agradecimentos a todos que contribuíram para este projeto:

- [Ivson Santana](https://github.com/IvsonSantana) - Desenvolvedor BackEnd
- [Edson Nasciemento](https://github.com/Edson-N-Silva) - Desenvolvedor FullStack
- [Ruan Ribeiro] - Designer
- [João Guilherme](https://github.com/JotaaLm) - Product Owner
- [Gian Lira](https://github.com/GVlira) - Product Owner
- [Diego Silva]

Se você deseja contribuir, sinta-se à vontade para fazer um pull request ou abrir uma issue!