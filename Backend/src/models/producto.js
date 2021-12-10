import mongoose from 'mongoose';
const { Schema } = mongoose;

const productoSchema = new Schema({
    nombre: String,
    marca: String,
    precio: Number,
    categoria: {
        type: mongoose.ObjectId,
        ref: 'Categoria'
    },
    disponible: Boolean,
    stock: Number,
    descuento: Number,
    imgUrl: String,
    precioRebajado: Number,
});

const Producto = mongoose.model('Producto', productoSchema);
export {Producto}