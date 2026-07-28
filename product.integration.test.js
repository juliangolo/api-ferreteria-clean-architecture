// HUECO 1: Importar la función/módulo 'request' desde la librería supertest
import request from "supertest";

// Importamos la aplicación Express refactorizada (sin servidor escuchando)
import app from "./app.js";
import { closeDB } from "./db.js";

describe("Pruebas de Integración - API de Productos", () => {
  it("GET /api/products/filter debería devolver estado 200 al filtrar por precio mínimo", async () => {
    // HUECO 2 y HUECO 3: Lanzamos la petición GET usando supertest y el endpoint de filtro
    // Pista: La URL debe incluir el parámetro query minPrice (ejemplo: /api/products/filter?minPrice=100)
    const response = await request(app).get(
      "/api/products/filter?minPrice=100",
    );

    // HUECO 4: Comprobamos que el código de estado HTTP devuelto por la API sea 200
    // Pista: Compara response.status con el valor 200
    expect(response.status).toBe(200);
  });

  afterAll(async () => {
    // HUECO 5: Cerramos la conexión a la base de datos después de todas las pruebas
    await closeDB();
  });
});
