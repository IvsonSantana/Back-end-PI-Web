const User = require('../models/userModels');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario não encontrado' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { nome, login, password, email, tipo  } = req.body;
    const user = new User({ nome,login, password, email, tipo });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'Usuario não encontrado' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'Usuario deletado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProfessores = async (req, res) => {
  try {
    const professores = await User.find({ tipo: 'professor' });
    if (!professores) {
      return res.status(404).json({ message: 'Professor não encontrado' });
    }
    res.json(professores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCoordenadores = async (req, res) => {
  try {
    const coordenador = await User.find({ tipo: 'coordenador' });
    if (!coordenador) {
      return res.status(404).json({ message: 'Coordenador não encontrado' });
    }
    res.json(coordenador);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAlunos = async (req, res) => {
  try {
    const alunos = await User.find({ tipo: 'aluno' });
    if (!alunos) {
      return res.status(404).json({ message: 'Aluno não encontrado' });
    }
    res.json(alunos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};