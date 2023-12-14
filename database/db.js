const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://Diogo:projetoER@sgau.us5kutf.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);

const database = client.db('SGAU');
const users = database.collection('Users');
const processos = database.collection('Processos');
const pautas = database.collection('Pautas');

module.exports = {
    users,
    processos,
    pautas
};