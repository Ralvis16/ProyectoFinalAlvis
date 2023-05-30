// Función para procesar el pedido y mostrar la lista de productos en el formulario de compras
export function procesarPedido() {
  carrito.forEach((prod) => {
    const contenedorCompra = document.querySelector("#contenedorCompra");
    const { id, nombre, precio, desc, img, cantidad } = prod;
    const div = document.createElement("div");
    div.innerHTML += `
          <div class="modal-contenedor">
            <div>
            <img class="img-fluid img-carrito" src="${img}"/>
            </div>
            <div>
            <p>Producto: ${nombre}</p>
          <p>Cantidad: ${cantidad}</p>
          <p>Precio:$ ${precio.toLocaleString()}</p>
          <button class="btn btn-danger"  onclick="eliminarProducto(${id})">Eliminar producto</button>
            </div>
          </div>
          `;
    contenedorCompra.appendChild(div);
    console.log(contenedorCompra);
  });
}
