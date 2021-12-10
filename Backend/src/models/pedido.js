import mongoose from 'mongoose';
const { Schema } = mongoose;

const pedidoSchema = new Schema({
    estaEnviado: Boolean,
    estaEntregado:Boolean,
    fechaPedido:Date,
    fechaEntrega:Date,
    total:Number,
    esPersonalizado:Boolean,
    provincia:String,
    ciudad:String,
    direccion:String,
    codigoPostal:String,
    estaPedido:Boolean,
    usuario: {
        type: mongoose.ObjectId,
        ref: 'User'
    },
    
    lineasPedido: [{
        type: mongoose.ObjectId,
        ref: 'LineaPedido'
    }],

});

const Pedido = mongoose.model('Pedido', pedidoSchema);
export {Pedido}