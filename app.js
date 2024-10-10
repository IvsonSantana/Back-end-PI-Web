const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const swaggerSetup = require('./docs/swagger');
const userRoutes = require('./routes/userRoutes');
const turmaRoutes = require('./routes/turmaRoutes');
const disciplinaRoutes = require('./routes/disciplinaRoutes');
const conceitoRoutes = require('./routes/conceitoRoutes');
const comunicadosRoutes = require('./routes/comunicadosRoutes');  
const authRoutes = require('./routes/authRoutes');//

dotenv.config();

connectDB();

const app = express();

app.use(helmet());

app.use(cors());

app.use(morgan('dev'));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/turmas', turmaRoutes);
app.use('/api/disciplinas', disciplinaRoutes);
app.use('/api/conceitos', conceitoRoutes);
app.use('/api/comunicados', comunicadosRoutes);

swaggerSetup(app);
// http://localhost:3000/api/portal-aluno-medio-tec

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta: ${PORT}`);
});
