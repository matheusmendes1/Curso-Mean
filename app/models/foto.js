const mongoose = require('mongoose');

let schema = mongoose.Schema({
    
    titulo: { 
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    grupo: {
        type: Number,
        required: true
    }

});

mongoose.model('Foto', schema);