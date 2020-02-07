module.exports = function(app) {

    const api = app.api.auth;

    /*  A ordem que vc define essas rotas é importante */
    app.post('/autenticar', api.autentica);

    app.use('/*', api.verificaToken); // app.use não faz distinção de verbo http. Qualquer um ele vai tratar
};