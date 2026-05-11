import * as SQLite from "expo-sqlite";

// ✅ Variable global para la conexión
let db: SQLite.SQLiteDatabase | null = null;

/**
 * ✅ TIPOS: AQUÍ LOS DECLARAMOS Y LOS EXPORTAMOS
 * Para que ListScreen y AddBookScreen puedan usarlos
 */
export interface Book {
  id: number;
  title: string;
  author: string;
  year: number;
  genre: string;
}

export interface NewBook {
  title: string;
  author: string;
  year: number;
  genre: string;
}

export type RootStackParamList = {
  List: undefined;
  AddBook: undefined;
};

/**
 * ✅ Obtener conexión única (Singleton)
 */
export const getDatabase = (): SQLite.SQLiteDatabase => {
  if (!db) {
    db = SQLite.openDatabaseSync("booklist.db");
  }
  return db;
};

/**
 * ✅ INICIALIZAR BASE DE DATOS
 */
export const initDatabase = async (): Promise<void> => {
  try {
    const database = getDatabase();

    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS books (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        author TEXT NOT NULL,
        year INTEGER NOT NULL,
        genre TEXT NOT NULL
      );
    `);

    console.log("✅ Base de datos BookList inicializada correctamente");
  } catch (error) {
    console.error("❌ Error al inicializar BD:", error);
    throw error;
  }
};

// ==================================================
// ✅ OPERACIÓN CREATE: Agregar nuevo libro
// ==================================================
export const addBook = async (bookData: NewBook): Promise<void> => {
  try {
    const database = getDatabase();

    await database.runAsync(
      `INSERT INTO books (title, author, year, genre)
       VALUES (?, ?, ?, ?);`,
      [
        bookData.title.trim(),
        bookData.author.trim(),
        bookData.year,
        bookData.genre.trim()
      ]
    );

    console.log("✅ Libro guardado:", bookData.title);
  } catch (error) {
    console.error("❌ Error al guardar libro:", error);
    throw error;
  }
};

// ==================================================
// ✅ OPERACIÓN READ: Obtener TODOS los libros
// ==================================================
export const getAllBooks = async (): Promise<Book[]> => {
  try {
    const database = getDatabase();

    const result = await database.getAllAsync<Book>(
      `SELECT * FROM books ORDER BY title ASC;`
    );

    return result;
  } catch (error) {
    console.error("❌ Error al leer libros:", error);
    throw error;
  }
};