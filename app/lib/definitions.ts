export type Patients = {
  id: string;
  n_documento: string;
  tipo_documento: string;
  nombres: string;
  apellidos: string;
  genero:string;
  fecha_nacimiento: Date;
  telefono: string;
  correo: string;
  user_id: string;
}

export type User = {
  id: string;
  mane: string;
  email: string;
  password: string;
};
export type AuthUser={
  user: {
    name: string,
    email: string
  },
  expires: string
}

export type Message={
  message:string
}

