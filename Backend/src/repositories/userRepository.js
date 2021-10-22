import bcrypt from "bcryptjs";
import "dotenv/config";
import { User } from "../models/user";

const emailExists = async (theEmail) => {
    return await  User.findOne({email: theEmail});
}


const userRepository = {
    
    toDto(user) {
        return {
            id: user.id,
            nombre: user.nombre,
            apellidos: user.apellidos,
            nombreCompleto: user.nombre+" "+user.apellidos,
            email: user.email,
            provincia: user.provincia,
            ciudad: user.ciudad,
            direccion: user.direccion,
            codigoPostal: user.codigoPostal,
            role: user.role,
        }
    },
    async create(newUser) {
        // console.log(!await emailExists(newUser.email));
        if (await emailExists(newUser.email)) {
            return { mensaje: `Ya existe un usuario con ese email` };
        }
        else {
            let password = bcrypt.hashSync(
                newUser.password,
                parseInt(process.env.BCRYPT_ROUNDS)
            );
            const theUser = new User({
                nombre: newUser.nombre,
                apellidos: newUser.apellidos,
                email: newUser.email,
                provincia: newUser.provincia,
                ciudad: newUser.ciudad,
                direccion: newUser.direccion,
                codigoPostal: newUser.codigoPostal,
                password: password,
                role: newUser.role,
            });
            const result = await theUser.save();
            return result;
        }
    },
    async findById(id) {
        const users = await User.findOne({_id : id});
        return users;
    },
    async findByEmail(email) {
        return await User.findOne({ email: email });
    }
}
export {userRepository, emailExists}