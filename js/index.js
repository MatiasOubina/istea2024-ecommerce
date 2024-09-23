import { getProductos } from './api.js';
import { mostrarProductosEnTarjetas } from './cards.js';
import { agregarAlCarrito, finalizarCompra, limpiarCarrito } from './carrito.js';

// Obtener todos los productos y mostrarlos inicialmente
document.addEventListener('DOMContentLoaded', async () => {
    const productos = await getProductos();
    mostrarProductosEnTarjetas(productos);

    // Filtro por categoría cuando se selecciona una categoría
    const botonesCategorias = document.querySelectorAll('.dropdown-item');
    botonesCategorias.forEach(boton => {
        boton.addEventListener('click', (e) => {
            const categoria = e.target.getAttribute('data-categoria');
            let productosFiltrados;

            if (categoria === 'todos') {
                productosFiltrados = productos;
            } else if (categoria === 'accessories') {
                // Mapeamos "Accesorios" a la categoría "jewelery"
                productosFiltrados = productos.filter(producto => producto.category === 'jewelery');
            } else if (categoria === 'clothing') {
                // Filtramos tanto "men's clothing" como "women's clothing" para la categoría "Ropa"
                productosFiltrados = productos.filter(producto =>
                    producto.category === "men's clothing" || producto.category === "women's clothing"
                );
            } else {
                productosFiltrados = productos.filter(producto => producto.category === categoria);
            }

            mostrarProductosEnTarjetas(productosFiltrados);
        });
    });

    // Lógica para la barra de búsqueda
    const barraBusqueda = document.getElementById('busqueda');
    barraBusqueda.addEventListener('input', () => {
        const valorBusqueda = barraBusqueda.value.toLowerCase();
        const productosFiltrados = productos.filter(producto =>
            producto.title.toLowerCase().includes(valorBusqueda) ||
            producto.description.toLowerCase().includes(valorBusqueda)
        );
        mostrarProductosEnTarjetas(productosFiltrados);
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


