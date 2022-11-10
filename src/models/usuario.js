const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    direccion:{
        type: String,
        required: true
    },
    telefono:{
        type: String,
        required: true
    },
    role:{
        type: String,
        required: true,
        default: 'CLIENTES'
    }
});

UsuarioSchema.method('toJSON', function(){
    const {__v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
})

module.exports = model('Usuario', UsuarioSchema);