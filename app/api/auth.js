let mongoose = require('mongoose');
let jwt  = require('jsonwebtoken'); // importando o módulo

module.exports = function(app) {

    let api = {};
    const model = mongoose.model('Usuario');

    api.autentica = function(req, res) {

        model.findOne({
            login: req.body.login,
            senha: req.body.senha
        })
        .then(function(usuario) {
            if (!usuario) {
                console.log('Login/senha inválidos');
                res.sendStatus(401);
            } else {
                console.log(usuario.login)
                let token = jwt.sign( {login: usuario.login}, app.get('secret'), {
                    expiresIn: 86400 // valor em segundo, aqui temos um total de 24 horas
                });
                console.log('Autenticado: token adicionado na resposta');
                res.set('x-access-token', token);// adicionando token no cabeçalho de resposta
                res.end(); // enviando a resposta
            }
        });
    };
    
    api.verificaToken = (req, res, next) => {

        let token = req.headers['x-access-token'];

        if(token){
            console.log('Token recebido, decodificando');
            jwt.verify(token, app.get('secret'), function(err, decoded) {
    
                if(err){
                    console.log('Token rejeitado');
                    return res.sendStatus(401);
                }
                req.usuario = decoded;
                next();
            });
        }else{
            console.log('Token não foi enviado');
            return res.sendStatus(401);
        }
    };

    return api;
};