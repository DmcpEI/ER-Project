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
        const processo = await db.processos.findOne({ userId: userId });
        return processo;
    } catch (error) {
        throw new Error(`Error fetching processo by user: ${error}`);
    }
}

module.exports = {
    getAllProcessos,
    getProcessoById,
    getProcessoByUser
}