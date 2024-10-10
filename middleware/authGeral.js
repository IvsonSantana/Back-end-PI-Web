const jwt = require('jsonwebtoken');
const User = require('../models/userModels');
const config = require('../config/jwt');

module.exports = async (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return res.status(401).json({ message: 'Sem Token, autorização negada' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Sem Token, autorização negada' });
  }

  try {
    const decoded = jwt.verify(token, config.secret);
    req.user = await User.findById(decoded.id);
    if (!req.user) {
      return res.status(401).json({ message: 'Usuário não encontrado, autorização negada' });
    }

  
    if (req.user.tipo !== 'professor' && req.user.tipo !== 'coordenador') {
      return res.status(403).json({ message: 'Acesso negado. Apenas professores ou coordenadores têm permissão.' });
    }

    next();
  } catch (error) {
    res.status(401).json({ message: 'Token não é válido' });
  }
};