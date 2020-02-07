module.exports = function(uri){

    let mongoose = require('mongoose');
    
    mongoose
        .connect(uri)
        .connection
        .on('connected', () => {
            console.log('Conectado ao mongodb');
        })
        .on('error', (error) => {
            console.log(`Erro na conexão: ${error}`);
        })
        .on('disconnected', () => {
            console.log('Desconectado do MongoDB');
        });
    
    process.on('SIGINT', () => {
    
        mongoose.connection.close(() => {
            console.log("Aplicação desconectada do mongodb");
            process.exit(0);
        });
    
    });
}
