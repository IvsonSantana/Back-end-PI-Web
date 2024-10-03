const Disciplina = require('../models/disciplinaModels');
const Turma = require('../models/turmaModels');

// Função para criar uma nova disciplina
exports.createDisciplina = async (req, res) => {
    try {
        const { nome, professor, turma } = req.body;

        // Cria a nova disciplina
        const novaDisciplina = new Disciplina({
            nome,
            professor,
            turma,
        });

        // Salva a disciplina no banco de dados
        const disciplinaSalva = await novaDisciplina.save();

        // Atualiza a turma para adicionar a nova disciplina
        const turmaAtualizada = await Turma.findByIdAndUpdate(
            turma,
            { $push: { disciplinas: disciplinaSalva._id } }, // Adiciona o ID da nova disciplina ao array de disciplinas da turma
            { new: true } // Retorna a turma atualizada
        );

        if (!turmaAtualizada) {
            return res.status(404).json({ message: 'Turma não encontrada' });
        }

        res.status(201).json({ message: 'Disciplina criada com sucesso!', disciplina: disciplinaSalva });
    } catch (error) {
        console.error('Erro ao criar disciplina:', error);
        res.status(500).json({ message: 'Erro ao criar disciplina' });
    }
};

// Buscar todas as disciplinas com populate
exports.getDisciplinas = async (req, res) => {
  try {
    const disciplinas = await Disciplina.find()
      .populate('professor', 'nome')
      .populate('turma', 'nome');
    res.json(disciplinas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Buscar disciplina por ID
exports.getDisciplinaById = async (req, res) => {
  try {
    const disciplina = await Disciplina.findById(req.params.id)
      .populate('professor', 'nome')
      .populate('turma', 'nome');

    if (!disciplina) {
      return res.status(404).json({ message: 'Disciplina não encontrada' });
    }

    res.json(disciplina);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Criar nova disciplina

// Atualizar disciplina
exports.updateDisciplina = async (req, res) => {
  try {
    const disciplina = await Disciplina.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate('professor', 'nome')
      .populate('turma', 'nome');

    if (!disciplina) {
      return res.status(404).json({ message: 'Disciplina não encontrada' });
    }

    res.json(disciplina);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Deletar disciplina
exports.deleteDisciplina = async (req, res) => {
  try {
    const disciplina = await Disciplina.findByIdAndDelete(req.params.id);
    
    if (!disciplina) {
      return res.status(404).json({ message: 'Disciplina não encontrada' });
    }

    res.json({ message: 'Disciplina deletada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
