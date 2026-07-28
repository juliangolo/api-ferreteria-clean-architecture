// Importamos la clase ProductService (ajusta la ruta según l estructura de tus carpetas)
import ProductService from "./product.service.js";

describe("ProductService - Pruebas Unitarias", () => {
  it("debería calcular correctamente el precio final con el 21% de IVA", () => {
    // 1. ARRANGE: (Preparar el entorno y las dependencias)
    const productService = new ProductService();

    // 2. ACT: (Ejecutar la función que queremos probar)
    const precioBase = 120.5;
    const resultado = productService.calcularPrecioConIVA(precioBase);

    // 3. ASSERT: (Verificar que el resultado es el esperado)
    expect(resultado).toBe(145.805);
  });
});

export default ProductService;
