const mongoose = require('mongoose');
const api = {};
/* Mesmo nome do model criado em foto.js de models */
const model = mongoose.model('Foto');

api.lista = (req, res) => {

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

    model
        .findById(req.params.id)
        .then((foto) => {
            if(!foto) throw Error('Foto não encontrada!');
            res.json(foto);
        }),
        (error) => {
            console.log(error);
            res.status(500).json(error)
        }
};

api.removePorId = (req, res) => {

    model
        .remove({_id: req.params.id})
        .then( () => {
            res.sendStatus(204);
        }),
        (error) => {
            console.log(error);
            res.status(500).json(error);
        }
};

api.adiciona = (req, res) => {

    model
        .create(req.body)
        .then( (foto) => {
            res.json(foto);
        }),
        (error) => {
            console.log(error);
            res.status(500).json(error);
        }
};

api.atualiza = (req, res) => {

    model
        .findByIdAndUpdate(req.params.id, req.body)
        .then( (foto) => {

            res.json(foto);
        }),
        (error) => {
            console.log(error);
            res.status(500).json(error);
        }
}

module.exports = api;