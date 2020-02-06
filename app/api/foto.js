const mongoose = require('mongoose');
const api = {};

api.lista = (req, res) => {

    /* Mesmo nome do model criado em foto.js de models */
    let model = mongoose.model('Foto');

    model
        .find({})
        .then((fotos) => {
            res.json(fotos);
        }),
        ((error) => {
            console.log(error);
            res.status(500).json(error);
        })
};

api.buscaPorId = (req, res) => {

    
};

api.removePorId = (req, res) => {


};

api.adiciona = (req, res) => {

};

api.atualiza = (req, res) => {


}

module.exports = api;