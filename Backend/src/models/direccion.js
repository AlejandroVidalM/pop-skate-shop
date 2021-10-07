import mongoose from 'mongoose';
const { Schema } = mongoose;

const direccionSchema = new Schema({
    latitude: String,
    longitude: String,
});

const Direccion = mongoose.model('Direccion', direccionSchema);
export {Direccion}