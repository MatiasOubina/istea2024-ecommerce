// Función para crear las tarjetas
export function mostrarProductosEnTarjetas(productos) {
    const contenedor = document.getElementById("productos-container");

    contenedor.innerHTML = "";

    productos.forEach(producto => { //recorro el array de productos
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("card");


        tarjeta.innerHTML = `
        <img src="${producto.image}" alt="${producto.title}" class="card-img">
        <div class="card-body">
        <h5 class="card-title">${producto.title}</h5>
        <p class="card-text">$ ${producto.price}</p>
        <button class="btn btn-info btnVerDetalle" data-id="${producto.id}">Ver detalles</button>
                
        </div>
        `;

        contenedor.appendChild(tarjeta); // añado la tarjeta al contenedor
    });

    //Selecciono todos los botones de los productos
    document.querySelectorAll('.btnVerDetalle').forEach(boton => {
        //Evento escuchador: cuando el usuario hace clic en ver detalle se abre el modal
        boton.addEventListener('click', (e) => {
            const idProducto = e.target.getAttribute('data-id'); //acá se extrae el valor del atributo que corresponde a cada producto
            mostrarDetalleProducto(idProducto, productos);
        });
    });
}

// Función para mostrar el modal con los detalles del producto
function mostrarDetalleProducto(id, productos) {
    const producto = productos.find(p => p.id == id); //Búsco el producto por su ID

    // Acá va el contenido que voy a mostrar en el modal
    const modalContenedor = `
        <h5 class="text-center mb-5">${producto.title}</h5>
        <div class="d-flex justify-content-start align-items-start">
            <img src="${producto.image}" alt="${producto.title}" style="width: 150px; margin-right: 20px;">
            <div>
                <p>${producto.description}</p>
                <p class="mb-4 mt-4"><strong>Precio: $ ${producto.price}</strong></p>
                <div class="text-center">
                    <button class="btn btn-success" onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
                </div>
            </div>
        </div>
    `;

    // Capturo el modal
    const modal = document.getElementById("productoModal");
    const modalCuerpo = modal.querySelector(".modal-body");

    modalCuerpo.innerHTML = modalContenedor; //Inserto en el cuerpo del modal la info del producto

    // Muestro el modal
    const modalMostrar = new bootstrap.Modal(modal);
    modalMostrar.show();
}


const modalCuerpo = document.querySelector('.modal-body');

modalCuerpo.addEventListener('click', (event) => {
    if (event.target.classList.contains('btn-agregarCarrito')) {
        const id = event.target.getAttribute('data-id');

        // Llama a la función que obtiene los productos y agrega al carrito
        getProductos().then(productos => {
            agregarAlCarrito(id, productos); // Asegúrate de convertir el id a número si es necesario
        });
    }
});