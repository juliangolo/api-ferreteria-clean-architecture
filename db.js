// PASO 1: Importar y configurar dotenv (Sintaxis ESM)
import dotenv from "dotenv";
dotenv.config();

import { MongoClient } from "mongodb";

// Lectura de variables de entorno desde Node.js
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017";
const DB_NAME = process.env.DB_NAME || "la_ferreteria_db";

// Variables globales al módulo para mantener la instancia única (Singleton)
let dbInstance = null;
let client = null;

export async function connectDB() {
  // Patrón Singleton: Si la instancia de la DB ya existe, la devolvemos directamente
  if (dbInstance) {
    return dbInstance;
  }

  try {
    // Si no existe, creamos el cliente y nos conectamos
    client = new MongoClient(MONGO_URI);
    await client.connect();

    dbInstance = client.db(DB_NAME);
    console.log("⚡️ Conexión exitosa a MongoDB (Instancia Singleton)");

    return dbInstance;
  } catch (error) {
    console.error("❌ Error al conectar a MongoDB:", error);
    throw error;
  }
}

export async function closeDB() {
  if (client) {
    await client.close();
    client = null;
    dbInstance = null;
    console.log("🔒 Conexión a MongoDB cerrada limpiamente");
  }
}
