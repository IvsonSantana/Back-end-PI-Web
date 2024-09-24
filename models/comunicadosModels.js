const mongoose = require('mongoose');

const ComunicadoSchema = new mongoose.Schema({
  titulo: { type: String, required: true, unique: true },
  conteudo: {type: String, required: true},
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Comunicado', ComunicadoSchema);