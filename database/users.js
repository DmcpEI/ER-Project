const { ObjectId } = require('mongodb');
const db = require('./db');

const getAllUsers = async () => {
    return await db.users.find().toArray();
};

const getUserByNumeroAluno = async (numeroAluno) => {
    return await db.users.findOne({ numeroAluno: numeroAluno });
}

const getUserByEmail = async (email) => {
    return await db.users.findOne({ emailUniversitario: email });
};

module.exports = {
getAllUsers,
getUserByNumeroAluno,
getUserByEmail
};