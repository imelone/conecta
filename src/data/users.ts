export interface User {
  username: string;
  password: string;
  municipio: string; // "*" means admin access to all municipalities
}

export const users: User[] = [
  { username: "chiclana", password: "password1", municipio: "Chiclana de Segura" },
  { username: "santa_elena", password: "password2", municipio: "Santa Elena" },
  { username: "carboneros", password: "password3", municipio: "Carboneros" },
  { username: "admin", password: "admin123", municipio: "*" },
];
