const { ObjectId } = require('mongodb');
const db = require('./db');

const getAllPautas = async () => {
    return await db.pautas.find().toArray();
};

const getPautaById= async (id) => {
    try {
        const pauta = await db.pautas.findOne({ _id: new ObjectId(id) });
        return pauta;
    } catch (error) {
        throw new Error(`Error fetching pauta by ID: ${error}`);
    }
};

const getPautaByType= async (tipo) => {
    try {
        const pauta = await db.pautas.findOne({ tipo: tipo });
        return pauta;
    } catch (error) {
        throw new Error(`Error fetching pauta by type: ${error}`);
    }
};

const getPautaByDisciplina= async (disciplina) => {
    try {
        const pauta = await db.pautas.findOne({ disciplina: disciplina });
        return pauta;
    } catch (error) {
        throw new Error(`Error fetching pauta by disciplina: ${error}`);
    }
};


module.exports = {
    getAllPautas,
    getPautaById,
    getPautaByType,
    getPautaByDisciplina
};