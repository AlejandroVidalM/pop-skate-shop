import 'dotenv/config';
import express from "express";
import cors from "cors";
import bodyParser from 'body-parser';
import mongoose from "mongoose"
import passport from './services/passport';
import morgan from "morgan";
import morganBody from "morgan-body";
import routes from './routes/index';
import { inicializacion } from './services/inicializacion';
import { getProvinces, getCities} from 'spanishcities'

const app = express();
app.use(cors());


app.use(passport.initialize());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('dev'));
morganBody(app);

app.use(passport.initialize());

app.use('/auth', routes.auth);
app.use('/perfil', routes.user);
app.use('/categoria', routes.categoria);
app.use('/producto', routes.producto);
app.use('/carrito', routes.carrito);
app.use('/pedido', routes.pedido);

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true }, err => {
  
    if (err) {
      console.log(`Error de conexión a la base de datos: ${JSON.stringify(err)}`);
    } else {
      console.log(`Conexión correcta a la base de datos en la URI ${process.env.DB_URI}`);
      app.listen(process.env.PORT, () =>
        console.log(
          `¡Aplicación de ejemplo escuchando en el puerto ${process.env.PORT}!`
        )
      );
      inicializacion.createAdmin();
      inicializacion.createCategoryOther();
    }
  
  });