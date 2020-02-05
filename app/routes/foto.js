module.exports = (app) => {
    //Verbos: POST PUT GET DELETE

    const api = app.api.foto;
    app.get('/v1/fotos', api.lista);

}
