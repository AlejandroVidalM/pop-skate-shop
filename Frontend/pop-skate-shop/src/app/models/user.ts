export interface User {

  nombre: string;
  apellidos: string;
  email: string;
  password: string;
  password2: string;
  provincia: string;
  ciudad: string;
  direccion: string;
  codigoPostal: string;
  role: { type: string, default:'user'},
}
