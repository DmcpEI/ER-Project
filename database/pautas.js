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

const getPautaByType = async (tipo) => {
    try {
        const pauta = await db.pautas.find({ tipo: tipo }).toArray();
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

const getPautaNotasByUser = async (userDisciplinas) => {
    try {
        let pautas = [];
        
        if (Array.isArray(userDisciplinas)) {
            const pautasPromises = userDisciplinas.map(async (disciplina) => {
                return await db.pautas.find({ disciplina: disciplina }).toArray();
            });

            pautas = await Promise.all(pautasPromises);
        } else if (typeof userDisciplinas === 'string') {
            pautas = await db.pautas.find({ disciplina: userDisciplinas }).toArray();
        } else {
            throw new Error('Invalid input for userDisciplinas');
        }

        return pautas.flat(); // Retorna um array único com todas as pautas das disciplinas
    } catch (error) {
        throw new Error(`Error fetching pauta by disciplina: ${error}`);
    }
};

const insertPautaNotas = async (pautaData) => {
    try {
        const result = await db.pautas.insertOne(pautaData);
        return result.insertedId; // Retorna o ID da pauta inserida
    } catch (error) {
        throw new Error(`Erro ao inserir processo: ${error}`);
    }
};

module.exports = {
    getAllPautas,
    getPautaById,
    getPautaByType,
    getPautaByDisciplina,
    getPautaNotasByUser,
    insertPautaNotas
};