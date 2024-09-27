import { getProductos } from './api.js';
import { mostrarProductosEnTarjetas } from './cards.js';
import { agregarAlCarrito, finalizarCompra, limpiarCarrito } from './carrito.js';
import { FiltroCategorias, BusquedaProducto } from './busqueda.js';


const productos = await getProductos();

setTimeout(() => {
    mostrarProductosEnTarjetas(productos);
}, 1800);

FiltroCategorias()

BusquedaProducto()

//Lógica de agregar al carrito cuando se hace clic en un producto
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


