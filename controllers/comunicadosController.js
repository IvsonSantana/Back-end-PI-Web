const Comunicado = require('../models/comunicadosModels');
const User = require('../models/userModels');

exports.getComunicados = async (req, res) => {
  try {
    const comunicados = await Comunicado.find();
    res.json(comunicados);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getComunicadoById = async (req, res) => {
  try {
    const comunicado = await Comunicado.findById(req.params.id);
    if (!comunicado) {
      return res.status(404).json({ message: 'Comunicado não encontrada' });
    }
    res.json(comunicado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createComunicado = async (req, res) => {
  try {
    const comunicado = new Comunicado(req.body);
    await comunicado.save();
    res.status(201).json(comunicado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateComunicado = async (req, res) => {
  try {
    const comunicado = await Comunicado.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!comunicado) {
      return res.status(404).json({ message: 'Comunicado não encontrada' });
    }
    res.json(comunicado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteComunicado = async (req, res) => {
  try {
    await Comunicado.findByIdAndDelete(req.params.id);
    res.json({ message: 'Comunicado deletada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getComunicadoByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

  
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

   
    const comunicados = await Comunicado.find({ user: userId });

    res.status(200).json(comunicados);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
