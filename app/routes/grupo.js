module.exports = (app) => {

    const api = app.api.grupo;

    app.get('/v1/grupos', api.lista);
}