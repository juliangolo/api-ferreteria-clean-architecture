// PASO 1: Importaciones (Sintaxis ESM)
import express from "express";
import ProductController from "./product.controller.js";

// PASO 2: Inicialización de la aplicación y middlewares
const app = express();

// Middleware obligatorio para procesar JSON en req.body
app.use(express.json());

// PASO 3: Instanciar el controlador
const productController = new ProductController();

// PASO 4: Definición de Rutas (Endpoints HTTP)
// 1. Crear un producto
app.post("/api/products", productController.create);

// 2. Filtrar por precio mínimo (Query param)
app.get("/api/products/filter", productController.filterByPrice);

// 3. Aplicar descuento por categoría
app.put("/api/products/discounts", productController.updateDiscounts);

// 4. Eliminar un producto por ID (Route param)
app.delete("/api/products/:id", productController.deleted);

// PASO 5: Iniciar el servidor
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
});
