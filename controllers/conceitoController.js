const Conceito = require('../models/conceitoModels');

exports.createConceito = async (req, res) => {
    try {
        const conceitos = req.body;
        if (!Array.isArray(conceitos) || conceitos.length === 0) {
            return res.status(400).json({ error: 'Corpo da requisição deve ser um array de conceitos.' });
        }

        const conceitosSalvos = [];

        for (const conceitoData of conceitos) {
            let conceitoExistente = await Conceito.findOne({
                aluno: conceitoData.aluno,
                disciplina: conceitoData.disciplina,
            });

            if (conceitoExistente) {
                conceitoExistente.conceito1 = conceitoData.conceito1;
                conceitoExistente.conceito2 = conceitoData.conceito2;
                conceitoExistente.conceitoParcial = conceitoData.conceitoParcial;
                conceitoExistente.conceitoRec = conceitoData.conceitoRec;
                conceitoExistente.conceitoFinal = conceitoData.conceitoFinal;
                await conceitoExistente.save();
                conceitosSalvos.push(conceitoExistente);
            } else {
                const novoConceito = new Conceito({
                    aluno: conceitoData.aluno,
                    disciplina: conceitoData.disciplina,
                    conceito1: conceitoData.conceito1,
                    conceito2: conceitoData.conceito2,
                    conceitoParcial: conceitoData.conceitoParcial,
                    conceitoRec: conceitoData.conceitoRec,
                    conceitoFinal: conceitoData.conceitoFinal
                });

                const conceitoSalvo = await novoConceito.save();
                conceitosSalvos.push(conceitoSalvo);
            }
        }

        res.status(201).json(conceitosSalvos);
    } catch (error) {
        res.status(400).json({ error: 'Erro ao criar ou atualizar conceitos', details: error.message });
    }
};

exports.getConceitosPorAlunoEDisciplina = async (req, res) => {
    const { alunoId } = req.params; 
    const { disciplina } = req.query; 

    try {
        const conceitos = await Conceito.find({ aluno: alunoId, disciplina: disciplina }); 
        if (!conceitos.length) {
            return res.status(404).json({ message: 'Conceitos não encontrados' });
        }
        res.json(conceitos); 
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar conceitos', error }); 
    }
};



exports.getAllConceitos = async (req, res) => {
    try {
        const conceitos = await Conceito.find().populate('user').populate('disciplina');
        res.status(200).json(conceitos);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar conceitos', details: error.message });
    }
};


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


exports.updateConceito = async (req, res) => {
    try {
        const { conceito1, conceito2, conceitoParcial, conceitoRec, conceitoFinal } = req.body;

        const conceito = await Conceito.findByIdAndUpdate(
            req.params.id,
            { conceito1, conceito2, conceitoParcial, conceitoRec, conceitoFinal },
            { new: true } 
        );

        if (!conceito) {
            return res.status(404).json({ error: 'Conceito não encontrado' });
        }

        res.status(200).json(conceito);
    } catch (error) {
        res.status(400).json({ error: 'Erro ao atualizar conceito', details: error.message });
    }
};


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
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      const conceito = await Conceito.find({ user: userId }).populate('disciplina');
      if (conceito.length === 0) {
        return res.status(404).json({ message: 'Nenhuma conceito encontrada para esse aluno' });
      }
  
      res.status(200).json(conceito);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };