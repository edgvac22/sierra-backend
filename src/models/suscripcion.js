const { Schema, model } = require('mongoose');

const SuscripcionSchema = Schema({
    email:{
        type: String,
        required: true,
        unique: true
    }
});

SuscripcionSchema.method('toJSON', function(){
    const {__v, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
})

module.exports = model('Suscripcion', SuscripcionSchema);