import { getProductos } from './api.js';
import { mostrarProductosEnTarjetas } from './cards.js';
import { agregarAlCarrito, finalizarCompra, limpiarCarrito } from './carrito.js';

// Obtener todos los productos y mostrarlos inicialmente
document.addEventListener('DOMContentLoaded', async () => {
    const productos = await getProductos();
    mostrarProductosEnTarjetas(productos);

    // Escuchar los clics en el menú desplegable de categorías
    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', (e) => {
            const categoria = e.target.getAttribute('data-categoria');
            filtrarPorCategoria(categoria, productos);
        });
    });
});

// Función para filtrar productos por categoría
function filtrarPorCategoria(categoria, productos) {
    let productosFiltrados;

    if (categoria === 'todos') {
        productosFiltrados = productos;
    } else if (categoria === 'clothing') {
        // Filtrar por ambas categorías de ropa: "men's clothing" y "women's clothing"
        productosFiltrados = productos.filter(producto =>
            producto.category === "men's clothing" || producto.category === "women's clothing"
        );
    } else {
        // Filtrar por las demás categorías como 'electronics' y 'jewelery'
        productosFiltrados = productos.filter(producto => producto.category === categoria);
    }

    mostrarProductosEnTarjetas(productosFiltrados);
}

// Lógica de agregar al carrito cuando se hace clic en un producto
window.agregarAlCarrito = function (id) {
    getProductos().then(productos => {
        agregarAlCarrito(id, productos);
    });
};

// Lógica para finalizar la compra
document.getElementById('finalizarCompraBtn').addEventListener('click', function () {
    finalizarCompra();
});

// Lógica para borrar todo el carrito
document.getElementById('limpiarCarritoBtn').addEventListener('click', function () {
    limpiarCarrito();
});


