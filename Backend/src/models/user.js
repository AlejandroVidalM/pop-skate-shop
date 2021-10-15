import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    nombre: String,
    apellidos: String,
    email: String,
    password: String,
    provincia: String,
    ciudad: String,
    direccion: String,
    codigoPostal: String,
    role: { type: String, default:'user'},
});

const User = mongoose.model('User', userSchema);
// const password = bcrypt.hashSync('12345678', parseInt(process.env.BCRYPT_ROUNDS));

// const userAdmin = new User("El Administrador", "administrador", "admin@administrador.com", password, true)

export {User}