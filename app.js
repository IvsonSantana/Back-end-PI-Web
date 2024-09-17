const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const swaggerSetup = require('./docs/swagger');

dotenv.config();

connectDB();

const app = express();

app.use(helmet());

app.use(cors());

app.use(morgan('dev'));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));


swaggerSetup(app);
// http://localhost:3000/api/portal-aluno-medio-tec

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta: ${PORT}`);
});
