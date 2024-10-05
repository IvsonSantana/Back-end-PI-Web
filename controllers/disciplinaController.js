const Disciplina = require('../models/disciplinaModels');
const Turma = require('../models/turmaModels');
const User = require('../models/userModels')


exports.createDisciplina = async (req, res) => {
    try {
        const { nome, professor, turma } = req.body;
        const novaDisciplina = new Disciplina({
            nome,
            professor,
            turma,
        });

        const disciplinaSalva = await novaDisciplina.save();
        const turmaAtualizada = await Turma.findByIdAndUpdate(
            turma,
            { $push: { disciplinas: disciplinaSalva._id } }, 
            { new: true }
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

exports.getDisciplinaByProfessorId = async (req, res) => {
  try {
    const { professorId } = req.params; 

    // Busca todas as disciplinas que têm o professor especificado
    const disciplinas = await Disciplina.find({ professor: professorId })
      .populate('turma', 'nome'); // Popula o campo da turma para retornar o nome da turma

    if (!disciplinas.length) {
      return res.status(404).json({ message: 'Nenhuma disciplina encontrada para este professor' });
    }

    res.status(200).json(disciplinas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


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

exports.removeProfessorFromDisciplina = async (req, res) => {
  try {
    const { id } = req.params;

    
    const disciplina = await Disciplina.findByIdAndUpdate(
      id,
      { $unset: { professor: '' } }, 
      { new: true }
    )
    .populate('turma', 'nome'); 

    if (!disciplina) {
      return res.status(404).json({ message: 'Disciplina não encontrada' });
    }

    res.json({ message: 'Professor removido da disciplina com sucesso!', disciplina });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addProfessorToDisciplina = async (req, res) => {
  try {
    const { id } = req.params; 
    const { professorId } = req.body; 

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID de disciplina inválido' });
    }

    const professor = await User.findById(professorId);
    if (!professor) {
      return res.status(404).json({ message: 'Professor não encontrado' });
    }

    const disciplina = await Disciplina.findByIdAndUpdate(
      id,
      { professor: professorId }, 
      { new: true }
    ).populate('professor', 'nome'); 

    if (!disciplina) {
      return res.status(404).json({ message: 'Disciplina não encontrada' });
    }

    res.json({ message: 'Professor adicionado à disciplina com sucesso', disciplina });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.removeTurmaFromDisciplina = async (req, res) => {
  try {
    const { id } = req.params; 
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID de disciplina inválido' });
    }

    const disciplina = await Disciplina.findByIdAndUpdate(
      id,
      { turma: null }, 
      { new: true }
    );

    if (!disciplina) {
      return res.status(404).json({ message: 'Disciplina não encontrada' });
    }

    res.json({ message: 'Turma removida da disciplina com sucesso', disciplina });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addTurmaToDisciplina = async (req, res) => {
  try {
    const { id } = req.params; 
    const { turmaId } = req.body; 
    if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(turmaId)) {
      return res.status(400).json({ message: 'ID de disciplina ou turma inválido' });
    }

    const turma = await Turma.findById(turmaId);
    if (!turma) {
      return res.status(404).json({ message: 'Turma não encontrada' });
    }

    const disciplina = await Disciplina.findByIdAndUpdate(
      id,
      { turma: turmaId }, 
      { new: true }
    );

    if (!disciplina) {
      return res.status(404).json({ message: 'Disciplina não encontrada' });
    }

    res.json({ message: 'Turma adicionada à disciplina com sucesso', disciplina });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};