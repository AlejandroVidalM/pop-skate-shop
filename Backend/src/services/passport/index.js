import 'dotenv/config';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { userRepository } from '../../repositories/userRepository';
import bcrypt from 'bcryptjs';

passport.use(new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    session: false
}, async (email, password, done) => {
    const user = await userRepository.findByEmail( email );
    if (user == undefined){
        return done(null, false);
    }else if (!bcrypt.compareSync(password, user.password)){
        return done(null, false);
    }else{
        return done(null, userRepository.toDto(user));
    }

}));

const opts = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : process.env.JWT_SECRET,
    algorithms : [process.env.JWT_ALGORITHM]
};

passport.use('token', new JwtStrategy(opts, async (jwt_payload, done)=>{
    
    const user_id = jwt_payload.sub;

    const user = await userRepository.findById(user_id);
    if (user == undefined)
        return done(null, false);
    else
        return done(null, user);

}));

export const password = () => (req, res, next) =>
    passport.authenticate('local', {session: false}, (err, user, info) => {
        if (err)
            return res.status(400).json(err)
        else if (err || !user)
            return res.status(401).json(err)
        req.logIn(user, { session: false }, (err) => {
            if (err) return res.status(401).json(err)
            next()
        })
    })(req, res, next);

    const checkRole = (role, userRole) => {

        if (userRole == 'admin')
            return true;
    
        return userRole == role;
    
    }

export const token = (role = 'user') => (req, res, next) =>
    passport.authenticate('token', { session: false }, (err, user, info) => {

    if (err ||  !user) {
        return res.status(401).send("401: Necesitas adjuntar un token para poder acceder a esta función.");
    }
    
    if (!checkRole(role, user.role)) {
        return res.status(403).json({mensaje: "403: No tienes permisos para acceder a esta función"});
    }
    req.logIn(user, { session: false }, (err) => {
        if (err) return res.status(401).end()
        next()
    })
})(req, res, next);


export default passport;