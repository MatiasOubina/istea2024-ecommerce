let carrito = [];

function cargarCarritoLocalStorage() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
    }
    actualizarCarrito();
}

function guardarCarritoLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Función para agregar productos al carrito
export function agregarAlCarrito(id, productos) {
    const productoSeleccionado = productos.find(producto => producto.id === id);

    if (productoSeleccionado) {
        const productoExistente = carrito.find(item => item.id === productoSeleccionado.id);

        if (productoExistente) {
            productoExistente.cantidad += 1;
        } else {
            carrito.push({ ...productoSeleccionado, cantidad: 1 });
        }

        actualizarCarrito();
        guardarCarritoLocalStorage();

        //Notificación al agregar producto
        Toastify({
            text: `${productoSeleccionado.title} agregado al carrito!`,
            close: true,
            className: "info",
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
            }
        }).showToast();
    }
}

// Función para actualizar el carrito
export function actualizarCarrito() {
    const listaCarrito = document.getElementById("carrito-lista");
    const mensajeVacio = document.getElementById("mensaje-vacio");
    const boxTotal = document.getElementById("box-total");
    const totalCarrito = document.getElementById("carrito-total");
    const btnFinalCompra = document.getElementById("finalizarCompraBtn");
    const btnLimpiarCarrito = document.getElementById("limpiarCarritoBtn");

    listaCarrito.innerHTML = '';

    // Mostrar mensaje si el carrito está vacío
    if (carrito.length === 0) {
        mensajeVacio.style.display = 'block'; // Mostrar mensaje
        totalCarrito.style.display = 'none';
        boxTotal.style.display = 'none';
        btnFinalCompra.style.display = 'none';
        btnLimpiarCarrito.style.display = 'none';

    } else {
        mensajeVacio.style.display = 'none'; // Ocultar mensaje
        totalCarrito.style.display = 'block';
        boxTotal.style.display = 'block';
        btnFinalCompra.style.display = 'block';
        btnLimpiarCarrito.style.display = 'block';
    }

    let acum = 0;
    carrito.forEach(producto => {
        const itemCarrito = document.createElement('li');

        itemCarrito.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');

        itemCarrito.innerHTML = `
            <div style="display: flex; align-items: center;">
                <img src="${producto.image}" alt="${producto.title}" style="width: 50px; height: 50px; margin-right: 10px;">
                <div>
                    <p style="margin: 0; font-weight: bold;">${producto.title}</p>
                    <p style="margin: 0; color: green; font-weight: bold;">$ ${producto.price}</p>
           
                </div>
            </div>
            <div style="display: flex; align-items: center;">
                <button class="btn btn-outline-secondary btn-sm" id="btn-menos" ${producto.cantidad === 1 ? 'disabled' : ''}>-</button>  
                <span class="mx-2 cantidad-producto">${producto.cantidad}</span>
                <button class="btn btn-outline-secondary btn-sm" id="btn-mas">+</button>
                <button class="btn btn-danger btn-sm ms-2" id="btn-eliminar">
                    <i class="bi bi-trash"></i>
                </button>
            </div>
        `;

        //En el botón que resta unidades del carrito, se puso condición de que si la cantidad del producto es 1, el botón quede deshabilitado. Esta verificación hace dinámico al mismo.

        // Botón para eliminar por completo el producto
        itemCarrito.querySelector('#btn-eliminar').addEventListener("click", () => eliminarProductoDirecto(producto.id));

        // Evento para el botón "-"
        itemCarrito.querySelector('#btn-menos').addEventListener("click", () => eliminarProducto(producto.id));

        // Evento para el botón "+"
        itemCarrito.querySelector('#btn-mas').addEventListener("click", () => agregarAlCarrito(producto.id, carrito));

        listaCarrito.appendChild(itemCarrito);

        acum += producto.price * producto.cantidad;
    });

    document.getElementById("carrito-total").innerText = `$${acum.toFixed(2)}`;
    document.querySelector('.badge').innerText = carrito.length;

    guardarCarritoLocalStorage();
}

// Función para eliminar productos del carrito
function eliminarProducto(id) {
    const producto = carrito.find(item => item.id === id); //Primero buscamos el producto en el carrito usando find.

    //Si el producto existe:
    //Si la cantidad es mayor a 1, simplemente restamos 1 a la cantidad.
    //Si la cantidad es 1, eliminamos el producto del carrito utilizando filter.
    if (producto) {
        if (producto.cantidad > 1) {
            producto.cantidad -= 1;
            Toastify({
                text: `Una unidad eliminada.`,
                close: true,
                className: "info",
                style: {
                    background: "linear-gradient(to right, #f6d365, #fda085)",
                }
            }).showToast();
        } else {
            carrito = carrito.filter(item => item.id !== id);

            Toastify({
                text: `${producto.title} eliminado del carrito.`,
                close: true,
                className: "error",
                style: {
                    background: "linear-gradient(to right, #ff5f6d, #ffc371)",
                }
            }).showToast();
        }
    }

    guardarCarritoLocalStorage();
    actualizarCarrito();

    //Con esto, cada vez que se borra un producto, solo se reduce su cantidad, y si llega a 1 y se elimina, se quita por completo del carrito.
}

function eliminarProductoDirecto(id) {
    const producto = carrito.find(item => item.id === id);

    carrito = carrito.filter(producto => producto.id !== id); // Eliminar el producto por completo

    Toastify({
        text: `${producto.title} eliminado del carrito.`,
        close: true,
        className: "error",
        style: {
            background: "linear-gradient(to right, #ff5f6d, #ffc371)",
        }
    }).showToast();

    actualizarCarrito();
    guardarCarritoLocalStorage();
}


// Función para finalizar la compra
export function finalizarCompra() {
    if (carrito.length === 0) {
        swal('¡Carrito Vacío!', 'No hay productos en tu carrito. No es posible continuar.', 'warning');
    } else {
        let totalCompra = 0;
        carrito.forEach(producto => {
            totalCompra += producto.price * producto.cantidad;
        });

        swal('¡¡Gracias por tu compra!!', `Compra realizada por un total de $${totalCompra.toFixed(2)}.`, 'success');

        carrito = [];
        actualizarCarrito();
        guardarCarritoLocalStorage();
    }
}

export function limpiarCarrito() {
    carrito = [];
    actualizarCarrito();
    guardarCarritoLocalStorage();
}

cargarCarritoLocalStorage();
