
import {userRepository, emailExists} from '../repositories/userRepository';
import {User} from '../models/user';
import bcrypt from "bcryptjs";
import "dotenv/config";
import { Categoria } from '../models/categoria';
import { categoriaRepository, categoryNameExists } from '../repositories/categoriaRepository';
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
    },
    
    async createCategoryOther() {
        const categoryOther = new Categoria({
            nombre: "Otros"
        });
        
        if( !await categoryNameExists(categoryOther.nombre) ){
            console.log("Categoría creada");
            await categoriaRepository.create(categoryOther);

        }
    }
}
export {inicializacion}