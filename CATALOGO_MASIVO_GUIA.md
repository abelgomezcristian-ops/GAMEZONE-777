# GAMEZONE 777 — Último ajuste de catálogo

## Qué se incorporó

- Infraestructura para cargar catálogos masivos sin tocar el carrito ni las tarjetas existentes.
- Registro de juegos con validación básica de `id`, `titulo` y `consola`.
- Protección contra IDs duplicados.
- Valores predeterminados para estado, precio, descripción y destacado.
- Importación desde un arreglo JavaScript o desde JSON.

## Cómo incorporar miles de juegos

El archivo `data/catalogo-masivo.js` queda preparado para recibir los juegos. Por seguridad, `enabled` está en `false` y no se inventan títulos falsos ni se reemplaza el catálogo que ya funciona.

Ejemplo de estructura:

```js
GZ_BULK_CATALOG.register([
  {
    id: "ps4-000001",
    titulo: "Nombre real del juego",
    consola: "ps4",
    genero: "Acción",
    precio: 3000,
    oldPrice: 3500,
    estado: "Disponible",
    featured: false,
    descripcion: "Descripción del juego",
    img: "URL o ruta de imagen",
    imgLocal: "img/ps4/accion/nombre.webp",
    oferta: false
  }
]);
```

Para una carga realmente masiva, se recomienda preparar un archivo JSON o CSV con datos reales, imágenes y precios definidos. Así se evita llenar la tienda con juegos ficticios, duplicados o imágenes incorrectas.
