export interface User {
  id: string;
  nombre: string;
  apellidos: string;
  nombreCompleto: string;
  email: string;
  provincia: string;
  // password: string;
  ciudad: string;
  direccion: string;
  codigoPostal: string;
  role: { type: string, default:'user'},
}
