const { ObjectId } = require('mongodb');
const db = require('./db');

const getAllUsers = async () => {
    return await db.users.find().toArray();
};

const getUserById = async (id) => {
    try {
        const user = await db.users.findOne({ _id: new ObjectId(id) });
        return user;
    } catch (error) {
        throw new Error(`Error fetching user by ID: ${error}`);
    }
};

const getUserByEmail = async (email) => {
    let user = await db.users.findOne({ emailUniversitario: email });
    if (!user) {
        user = await db.users.findOne({ emailPessoal: email });
    }
    return user;
};

const insertUser = async (userData) => {
    try {
        const result = await db.users.insertOne(userData);
        return result.insertedId; // Retorna o ID do usuário inserido
    } catch (error) {
        throw new Error(`Erro ao inserir usuário: ${error}`);
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    getUserByEmail,
    insertUser
};