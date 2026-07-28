// PASO 1: Importar la aplicación de Express ya configurada
import app from "./app.js";

// PASO 2: Definir el puerto (desde variables de entorno o valor por defecto)
const PORT = process.env.PORT || 3000;

// PASO 3: Poner el servidor a escuchar en el puerto especificado
app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
});
