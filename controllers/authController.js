const jwt = require('jsonwebtoken');
const User = require('../models/userModels');
const config = require('../config/jwt');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Credenciais Invalidas' });
    }
    const token = jwt.sign({ id: user._id }, config.secret, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};