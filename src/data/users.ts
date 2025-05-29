// This file contains the mock user data
// In a production environment, this would be stored on a server
// and accessed via an API

export interface User {
  username: string;
  password: string;
  // Keeping region for backward compatibility
  region: {
    id: number;
    name: string;
  };
  // New property for municipality-based access control
  municipio: string;
}

export const users: User[] = [
  {
    username: "chiclana",
    password: "password1",
    region: {
      id: 1,
      name: "Chiclana de Segura"
    },
    municipio: "Chiclana de Segura"
  },
  {
    username: "santa_elena",
    password: "password2",
    region: {
      id: 2,
      name: "Santa Elena"
    },
    municipio: "Santa Elena"
  },
  {
    username: "carboneros",
    password: "password3",
    region: {
      id: 3,
      name: "Carboneros"
    },
    municipio: "Carboneros"
  },
  {
    username: "admin",
    password: "admin123",
    region: {
      id: 0,
      name: "Todos"
    },
    municipio: "*" // Special value to indicate admin can see all municipalities
  }
];
