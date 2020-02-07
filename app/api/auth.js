const mongoose = require('mongoose');
const model = mongoose.model('Usuário');
let api = {};

api.autentica = (req, res) => {

    model
        .findOne( { login: req.body.login, senha: req.body.senha } )
        .then( (usuario) => {

            if(!usuario){
                console.log('Login e senha inválidos!');
                res.sendStatus(401);
            }

            
        }),
        (error) => {
            console.log(error);
        }
};

api.verificaToken = (req, res) => {

};

// PAREI NO 5:50