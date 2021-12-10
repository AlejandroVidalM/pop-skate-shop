import mongoose from 'mongoose';
const { Schema } = mongoose;

const lineaPedidoSchema = new Schema({
    producto: {
        type: mongoose.ObjectId,
        ref: 'Producto'
    },
    cantidad:Number,
    subtotal: Number,
    
});

const LineaPedido = mongoose.model('LineaPedido', lineaPedidoSchema);
export {LineaPedido}