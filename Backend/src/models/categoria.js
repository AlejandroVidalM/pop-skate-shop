import mongoose from 'mongoose';
const { Schema } = mongoose;

const categoriaSchema = new Schema({
    nombre: String,
    categoriaPadre: {
        type: mongoose.ObjectId,
        ref: 'Categoria'
    },
    esParteObligatoria: { type: Boolean, default:'false'},
});

const Categoria = mongoose.model('Categoria', categoriaSchema);
export {Categoria}