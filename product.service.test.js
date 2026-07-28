// Importamos la clase ProductService (ajusta la ruta según l estructura de tus carpetas)
import ProductService from "./product.service.js";

describe("ProductService - Pruebas Unitarias", () => {
  // 1. TEST 1: Camino Feliz (Happy Path)
  it("debería calcular correctamente el precio final con el 21% de IVA", () => {
    // 1. ARRANGE: (Preparar el entorno y las dependencias)
    const productService = new ProductService();

    // 2. ACT: (Ejecutar la función que queremos probar)
    const resultado = productService.calcularPrecioConIVA(120.5);

    // 3. ASSERT: (Verificar que el resultado es el esperado)
    expect(resultado).toBe(145.805);
  });

  // 2. TEST 2: Camino del error (Sad Path)
  it("debería lanzar un error si el porcentaje de descuento es mayor o igual a 100", () => {
    // 1. ARRANGE
    const productService = new ProductService();

    // 2 Act & Assert combinados mediante el callback en expect()
    // Envolvemos la llamada al método applyCategoryDiscount dentro del arrow function
    expect(() =>
      productService
        .applyCategoryDiscount("herramientas", 150)
        .toThrow("El porcentaje debe estar entre 1 y 99"),
    );
  });
});
