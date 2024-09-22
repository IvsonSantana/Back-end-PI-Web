const Conceito = require('../models/conceitoModels');

// Criar um novo conceito
exports.createConceito = async (req, res) => {
    try {
        const { user, disciplina, conceito1, conceito2, conceitoParcial, conceitoRec, conceitoFinal } = req.body;

        const novoConceito = new Conceito({
            user,
            disciplina,
            conceito1,
            conceito2,
            conceitoParcial,
            conceitoRec,
            conceitoFinal
        });

        const conceitoSalvo = await novoConceito.save();
        res.status(201).json(conceitoSalvo);
    } catch (error) {
        res.status(400).json({ error: 'Erro ao criar conceito', details: error.message });
    }
};

// Obter todos os conceitos
exports.getAllConceitos = async (req, res) => {
    try {
        const conceitos = await Conceito.find().populate('user').populate('disciplina');
        res.status(200).json(conceitos);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar conceitos', details: error.message });
    }
};

// Obter um conceito por ID
exports.getConceitoById = async (req, res) => {
    try {
        const conceito = await Conceito.findById(req.params.id).populate('user').populate('disciplina');
        if (!conceito) {
            return res.status(404).json({ error: 'Conceito não encontrado' });
        }
        res.status(200).json(conceito);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar conceito', details: error.message });
    }
};

// Atualizar um conceito
exports.updateConceito = async (req, res) => {
    try {
        const { conceito1, conceito2, conceitoParcial, conceitoRec, conceitoFinal } = req.body;

        const conceito = await Conceito.findByIdAndUpdate(
            req.params.id,
            { conceito1, conceito2, conceitoParcial, conceitoRec, conceitoFinal },
            { new: true } // Retorna o documento atualizado
        );

        if (!conceito) {
            return res.status(404).json({ error: 'Conceito não encontrado' });
        }

        res.status(200).json(conceito);
    } catch (error) {
        res.status(400).json({ error: 'Erro ao atualizar conceito', details: error.message });
    }
};

// Deletar um conceito
exports.deleteConceito = async (req, res) => {
    try {
        const conceito = await Conceito.findByIdAndDelete(req.params.id);
        if (!conceito) {
            return res.status(404).json({ error: 'Conceito não encontrado' });
        }
        res.status(200).json({ message: 'Conceito deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar conceito', details: error.message });
    }
};

exports.getConceitoByUserId = async (req, res) => {
    try {
      const { userId } = req.params;
  
      // Verifique se o usuário existe
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
  
      // Encontre todas os conceito associadas a esse usuário (aluno)
      const conceito = await Conceito.find({ user: userId }).populate('disciplina');
  
      if (conceito.length === 0) {
        return res.status(404).json({ message: 'Nenhuma conceito encontrada para esse aluno' });
      }
  
      res.status(200).json(conceito);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };