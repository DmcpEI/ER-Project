const { ObjectId } = require('mongodb');
const db = require('./db');

const getAllProcessos = async () => {
    return await db.processos.find().toArray();
};

const getProcessoById= async (id) => {
    try {
        const processo = await db.processos.findOne({ _id: new ObjectId(id) });
        return processo;
    } catch (error) {
        throw new Error(`Error fetching processo by ID: ${error}`);
    }
};

const getProcessoByUser = async (userId) => {
    try {
        const processos = await db.processos.find().toArray(); // Fetch all processes
        const userProcessos = processos.filter(processo => {
            return String(processo.userId) === String(userId); // Convert both to strings for comparison
        });
        return userProcessos;
    } catch (error) {
        throw new Error(`Error fetching processo by user: ${error}`);
    }
}

const insertProcesso = async (processoData) => {
    try {
        const result = await db.processos.insertOne(processoData);
        return result.insertedId; // Retorna o ID do processo inserido
    } catch (error) {
        throw new Error(`Erro ao inserir processo: ${error}`);
    }
};

const updateProcessoEstadoById = async (processoId, newEstado) => {
    try {
        await db.processos.updateOne(
            { _id: new ObjectId(processoId) },
            { $set: { estado: newEstado } }
        );
    } catch (error) {
        throw new Error(`Error updating processo estado: ${error}`);
    }
};

module.exports = {
    getAllProcessos,
    getProcessoById,
    getProcessoByUser,
    insertProcesso,
    updateProcessoEstadoById
}