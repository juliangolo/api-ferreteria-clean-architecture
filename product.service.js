import productRepository from "./product.repository.js";

class ProductService {
  // 1. Obtener todos los productos de la base de datos
  async getAllProducts() {
    // Pedimos los documentos al repositorio (operación asíncrona)
    return await productRepository.findAll();
  }

  // 2. Obtener un producto por su ID único de MongoDB
  async getProductById(id) {
    // Pista: En MongoDB los IDs son strings/ObjectId, ¡ya no hacemos Number(id)!
    return productRepository.findById(id);
  }

  // 3. Crear un nuevo producto aplicando la regla de negocio del IVA (21%)
  async createNewProduct({ name, category, basePrice }) {
    if (!name || !basePrice) {
      throw new Error("El nombre y el precio base son obligatorios.");
    }

    // Lógica de negocio: Cálculo de 21% de IVA
    const totalPrice = basePrice * 1.21;

    // Preparamos el objeto para guardar.
    // ¡OJO! Ya NO añadimos el campo 'id' con Date.now(), MongoDB asignará el '_id'
    const productData = {
      name,
      category,
      price: totalPrice,
    };

    // Enviamos el objeto al repositorio y esperamos a que lo inserte
    const result = await productRepository.create(productData);
    return result;
  }

  // Filtrar por precio
  async getProductByMinPrice(minPrice) {
    return await productRepository.findByMinPrice(minPrice);
  }

  // Aplicar descuentos matemáticos
  async applyCategoryDiscount(category, percentage) {
    if (percentage <= 0 || percentage >= 100) {
      throw new Error("El porcentaje debe estar entre 1 y 99");
    }

    // Lógica de negocio: si el descuento es del 20%, multiplicamos el precio por 0.80
    const multiplier = 1 - percentage / 100;

    // Mandamos el multiplicador al almacén para que aplique los cambios
    return await productRepository.updateDiscountByCategory(
      category,
      multiplier,
    );
  }

  // 4. Eliminar un producto por su ID
  async removeProduct(id) {
    // Pasamos el 'id' al repositorio (él se encarga de convertirlo a ObjectId)
    const result = await productRepository.delete(id);

    // Pista: MongoDB devuelve un objeto { acknowledged: true, deletedCount: 1 }
    // Comprobamos si el número de documentos borrado fue 0 para lanzar un error

    if (result.deletedCount === 0) {
      throw new Error("PRODUCT_NOT_FOUND");
    }

    return result;
  }
}

export default ProductService;
