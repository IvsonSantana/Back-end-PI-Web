const mongoose = require('mongoose');

const ComunicadoSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  conteudo: {type: String, required: true},
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Comunicado', ComunicadoSchema);