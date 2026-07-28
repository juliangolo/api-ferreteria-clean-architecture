// PASO 1: Importar los elementos necesarios del driver nativo de MongoDB (Sintaxis ESM)
// Pista: Necesitas el cliente principal y la clase para manejar IDs de MongoDB
import { ObjectId } from "mongodb";

// PASO 2: Importar la función de conexión Singleton desde db.js
import { connectDB } from "./db.js";

class ProductRepository {
  // Método auxiliar para obtener la colección  usando la conexión Singleton
  async getCollection() {
    // Obtenemos la instancia de la DB llamando a nuestra función de conexión
    const db = await connectDB();
    return db.collection("products");
  }

  // Buscar productos que cuesten igual o más que un precio dado
  async findByMinPrice(minPrice) {
    const collection = await this.getCollection();
    // $gte es un operador de MongoDB que significa "Greater Than or Equal" (mayor o igual que)
    return collection.find({ price: { $gte: minPrice } }).toArray();
  }

  // Aplicar un multiplicador de descuento a todos los productos de una categoría
  async updateDiscountByCategory(category, multiplier) {
    const collection = await this.getCollection();
    // $mul es un operador nativo de Mongo que multiplica el valor por el multiplicador
    await collection.updateMany(
      { category: category },
      { $mul: { price: multiplier } },
    );
    // Devolvemos los productos tras ser actualizados
    return collection.find({ category: category }).toArray();
  }

  async findAll() {
    const collection = await this.getCollection();
    // Pista: find() devuelve un cursor, debes convertirlo a Array
    return collection.find().toArray();
  }

  // 2. Buscar un producto por su ID único de MongoDB (_id)
  async findById(id) {
    const collection = await this.getCollection();
    // Pista: Recuerda convertir el string 'id' al tipo de dato identificador de MongoDB
    return collection.findOne({ _id: new ObjectId(id) });
  }

  // 3. Crear un nuevo producto
  async create(productData) {
    const collection = await this.getCollection();
    // Pista: Inserta un solo documento
    return collection.insertOne(productData);
  }

  // 4. Eliminar un producto por su ID
  async delete(id) {
    const collection = await this.getCollection();
    // Pista Eliminar un solo documento filtrando por su _id
    return collection.deleteOne({ _id: new ObjectId(id) });
  }
}

export default new ProductRepository();
