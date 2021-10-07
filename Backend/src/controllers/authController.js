import { userRepository } from "../repositories/userRepository";
import { JwtService } from "../services/jwt";

const AuthController = {
    register: async (req, res, next) => {
        try {
            if (req.body.password == req.body.password2) {
                let usuarioCreado = await userRepository.create({
                    nombre: req.body.nombre,
                    apellidos: req.body.apellidos,
                    email: req.body.email,
                    password: req.body.password,
                    role: "user",
                });
                res.status(201).json(usuarioCreado);
            } else {
                res.status(400).json({ mensaje: `Las contraseñas no coinciden` });
            }
        } catch (error) {
            res.status(404).json({
                Error: `Ha ocurrido un error en la petición: ${error.message}`,
            });
        }
    },
    login: (req, res, next) => {
        const token = JwtService.sign(req.user);
        res.status(201).json({
            user: req.user,
            token: token,
        });
    },
};
export { AuthController };
