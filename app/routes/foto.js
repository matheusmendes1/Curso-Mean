module.exports = (app) => {
    //Verbos: POST PUT GET DELETE

    const api = app.api.foto;

    app.get('/v1/fotos', api.lista);

    /* rota generica do tipo get recebendo um coringa */
    app.get("/v1/fotos/:id", api.buscaPorId);
}
