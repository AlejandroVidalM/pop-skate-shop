import 'dotenv/config';
import express from "express";
import cors from "cors";
import bodyParser from 'body-parser';
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.listen(process.env.PORT, () =>
    console.log(`¡Aplicación de ejemplo escuchando en el puerto ${process.env.PORT}!`)
); 