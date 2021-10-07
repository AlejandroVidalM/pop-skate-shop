
import {userRepository, emailExists} from '../repositories/userRepository';
import {User} from '../models/user';
import bcrypt from "bcryptjs";
import "dotenv/config";
const inicializacion  = {
    async createAdmin() {
        let password = bcrypt.hashSync(
            "12345678",
            parseInt(process.env.BCRYPT_ROUNDS)
        );
        const admin = new User({
            nombre: "Administrador",
            apellidos: "apellidos",
            email: "admin@administrador.com",
            password: password,
            role: 'admin',
        });
        if( !await emailExists(admin.email) ){
            console.log("admin creado");
            await userRepository.create(admin);
        }
    }
}
export {inicializacion}