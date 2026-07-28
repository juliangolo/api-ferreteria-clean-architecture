import ProductService from "./product.service.js";

class ProductController {
  constructor() {
    this.productService = new ProductService();
  }

  create = async (req, res) => {
    try {
      const { name, category, basePrice } = req.body;

      if (!name || !category || typeof basePrice !== "number") {
        return res.status(400).json({ error: "Datos de producto inválidos" });
      }

      // El cocinero procesa la orden
      const newProduct = await this.productService.createNewProduct({
        name,
        category,
        basePrice,
      });

      // Código HTTP 201: Creado con éxito
      return res.status(201).json(newProduct);
    } catch (error) {
      if (error.message.includes("ya existe")) {
        return res.status(409).json({ error: error.message });
      }
      // Capturamos el error lanzado por el servicio o el servidor
      return res.status(500).json({ error: error.message });
    }
  };

  filterByPrice = async (req, res) => {
    try {
      // Leemos el cuerpo de la petición HTTP
      const { minPrice } = req.query;

      if (!minPrice) {
        return res
          .status(400)
          .json({ error: "El precio mínimo es obligatorio" });
      }

      // Le pedimos al cocinero que procese la orden
      const result = await this.productService.getProductByMinPrice(
        Number(minPrice),
      );

      // Respondemos al cliente
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ error: "Error en el servidor" });
    }
  };
  updateDiscounts = async (req, res) => {
    try {
      // Leemos el cuerpo de la petición HTTP
      const { category, percentage } = req.body;

      // Validación rápida del camarero
      if (!category || typeof percentage !== "number") {
        return res
          .status(400)
          .json({ error: "Categoría y porcentaje son requeridos" });
      }

      // El cocinero procesa la lógica de negocio
      const updated = await this.productService.applyCategoryDiscount(
        category,
        percentage,
      );

      // Entregamos la respuesta al cliente
      return res.status(200).json(updated);
    } catch (error) {
      return res.status(500).json({ error: "Error al aplicar descuento" });
    }
  };

  deleted = async (req, res) => {
    try {
      // Leemos el ID desde los parámetros de la URL
      const { id } = req.params;

      const deleted = await this.productService.removeProduct(id);

      return res
        .status(200)
        .json({ message: "Producto eliminado", product: deleted });
    } catch (error) {
      if (error.message === "PRODUCT_NOT_FOUND") {
        return res.status(404).json({ error: "Producto no encontrado" });
      }
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  };
}

export default ProductController;
