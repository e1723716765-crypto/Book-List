// Definición exacta de campos
export interface Book {
  id: number;
  title: string;
  author: string;
  year: number;
  genre: string;
}

// Tipo para crear (sin ID, se genera automático)
export interface NewBook {
  title: string;
  author: string;
  year: number;
  genre: string;
}

// Tipos navegación
export type RootStackParamList = {
  List: undefined;
  AddBook: undefined;
};