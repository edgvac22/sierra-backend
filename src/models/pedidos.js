const { Schema, model } = require('mongoose');

const PedidosSchema = Schema({

    pedido:{
        type: String,
        required: true,
        unique: true
    },
    fecha:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    metodo_pago:{
        type: String,
        required: true
    },
    metodo_envio:{
        type: String,
        required: true
    },
    subtotal:{
        type: String,
        required: true
    },
    itbm:{
        type: String,
        required: true
    },
    flete:{
        type: String,
        required: true
    },
    total:{
        type: String,
        required: true
    },
    articulos:{
        type: Object,
        required: true
    }
});

PedidosSchema.method('toJSON', function(){
    const {__v, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
})

module.exports = model('Pedido', PedidosSchema);