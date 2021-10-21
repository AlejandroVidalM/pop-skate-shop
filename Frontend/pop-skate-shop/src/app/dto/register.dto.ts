export class RegistroDto {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  password2: string;
  provincia: String;
  ciudad: String;
  direccion: String;
  codigoPostal: String;
  constructor(
    // nombre: string,
    // apellido: string,
    // email: string,
    // password: string,
    // password2: string,
    // provincia: String,
    // ciudad: String,
    // direccion: String,
    // codigoPostal: String,
  ) {
    // this.nombre = nombre;
    // this.apellido = apellido;
    // this.email = email;
    // this.password = password;
    // this.password2 = password2;
    // this.provincia = provincia;
    // this.ciudad = ciudad;
    // this.direccion = direccion;
    // this.codigoPostal = codigoPostal;
    this.nombre = "";
    this.apellido = "";
    this.email = "";
    this.password = "";
    this.password2 = "";
    this.provincia = "";
    this.ciudad = "";
    this.direccion = "";
    this.codigoPostal = "";
  }
}
