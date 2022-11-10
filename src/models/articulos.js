const { Decimal128 } = require('mongodb');
const { Schema, model } = require('mongoose');

const ArticulosSchema = Schema({
    codigo:{
        type: String,
        required: true,
        unique: true
    },
    nombre:{
        type: String,
        required: true
    },
    descripcion:{
        type: String,
        required: true
    },
    empaque:{
        type: String,
        required: true
    },
    precio:{
        type: Number,
        required: true
    },
    precio_oferta:{
        type: Number,
        required: true
    },
    categoria:{
        type: String,
        required: true
    },
    marca:{
        type: String,
        required: true
    },
    inventario:{
        type: String,
        required: true
    },
    imagen:{
        type: String,
        required: true
    }
});

ArticulosSchema.method('toJSON', function(){
    const {__v, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
})

module.exports = model('Articulo', ArticulosSchema);