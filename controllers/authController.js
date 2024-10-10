const jwt = require('jsonwebtoken');
const User = require('../models/userModels');
const config = require('../config/jwt');

exports.register = async (req, res) => {
    try {
      const { nome, password, email, tipo  } = req.body;
      const user = new User({ nome, password, email, tipo });
      await user.save();
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    
    const token = jwt.sign({ id: user._id, tipo: user.tipo, nome: user.nome }, config.secret, { expiresIn: '1h' });

    
    res.json({ token, userId: user._id, userType: user.tipo, userName: user.nome });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
