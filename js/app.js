let stockProductos = [];

fetch('./js/productos.json')
  .then(response => response.json())
  .then(data => {
    // Obteniendo los datos del archivo JSON
    stockProductos = data.stockProductos;

    // Creando el HTML de los productos
    const productosHTML = stockProductos.map(prod => {
      const { id, nombre, precio, desc, img, cantidad } = prod;
      return `
        <div class="card mt-3" style="width: 18rem; height: 100%;background-image: url('./img/fondo.avif');">
          <img class="card-img-top mt-2" src="${img}" alt="Card image cap">
          <div class="card-body text-light">
            <h5 class="card-title">${nombre}</h5>
            <p>Precio: $ ${precio.toLocaleString()}</p>
            <p class="card-text">${desc}</p>
            <p class="card-text">Cantidad: ${cantidad}</p>
            <button class="btn btn-primary" onclick="agregarProducto(${id})">Agregar al carrito</button>
          </div>
        </div>
      `;
    });

    if (contenedor) {
      contenedor.innerHTML = productosHTML.join('');
    }
  })
  .catch(error => console.error(error));


// Array de productos en el carrito de compras
let carrito = [];

// Sellecion de elementos del HTML
const contenedor = document.querySelector("#contenedor");
const carritoContenedor = document.querySelector("#carritoContenedor");
const vaciarCarrito = document.querySelector("#vaciarCarrito");
const precioTotal = document.querySelector("#precioTotal");
const activarFuncion = document.querySelector("#activarFuncion");
const procesarCompra = document.querySelector("#procesarCompra");
const totalProceso = document.querySelector("#totalProceso");
const formulario = document.querySelector("#procesar-pago");

if (activarFuncion) {
  activarFuncion.addEventListener("click", procesarPedido);
}

document.addEventListener("DOMContentLoaded", () => {
  carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  mostrarCarrito();
  document.querySelector("#activarFuncion").click(procesarPedido);
});

if (formulario) {
  formulario.addEventListener("submit", enviarCompra);
}

if (vaciarCarrito) {
  vaciarCarrito.addEventListener("click", () => {
    Toastify({
      text: "Carrito Vacio",
      duration: 2000,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "center", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "linear-gradient(to right, #BB2D3B, #F00001)",
        borderRadius: "2rem",
        textTransform: "uppercase",
        fontSize: ".75rem",
      },
      offset: {
        x: '1.5rem', // horizontal axis - can be a number or a string indicating unity. eg: '2em'
        y: '1.5rem' // vertical axis - can be a number or a string indicating unity. eg: '2em'
      },
      onClick: function(){} // Callback after click
    }).showToast();
    carrito.length = [];
    mostrarCarrito();
  });
}

if (procesarCompra) {
  procesarCompra.addEventListener("click", () => {
    if (carrito.length === 0) {
      Swal.fire({
        title: "¡Tu carrito está vacio!",
        text: "Compra algo para continuar con la compra",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    } else {
      location.href = "./pages/compra.html";
    }
  });
}


// Función agregar producto al carrito de compras
const agregarProducto = (id) => {

  Toastify({
    text: "Producto agregado",
    duration: 2000,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "center", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, F00000, F00001)",
      borderRadius: "2rem",
      textTransform: "uppercase",
      fontSize: ".75rem",
    },
    offset: {
      x: '1.5rem', // horizontal axis - can be a number or a string indicating unity. eg: '2em'
      y: '1.5rem' // vertical axis - can be a number or a string indicating unity. eg: '2em'
    },
    onClick: function(){} // Callback after click
  }).showToast();

  const existe = carrito.some((prod) => prod.id === id);

  if (existe) {
    const prod = carrito.map((prod) => {
      if (prod.id === id) {
        prod.cantidad++;
      }
    });
  } else {
    const item = stockProductos.find((prod) => prod.id === id);
    carrito.push(item);
  }

  mostrarCarrito();
};

// Función para mostrar los productos en el carrito de compras
const mostrarCarrito = () => {
  const modalBody = document.querySelector(".modal .modal-body");
  if (modalBody) {
    modalBody.innerHTML = "";
    carrito.forEach((prod) => {
      const { id, nombre, precio, desc, img, cantidad } = prod;
      console.log(modalBody);
      modalBody.innerHTML += `
      <div class="modal-contenedor">
        <div>
        <img class="img-fluid img-carrito" src="${img}"/>
        </div>
        <div>
        <p>Producto: ${nombre}</p>
        <p>Precio: $ ${precio.toLocaleString()}</p>
        <p>Cantidad: ${cantidad}</p>
        <button class="btn btn-danger"  onclick="eliminarProducto(${id})">Eliminar producto</button>
        </div>
      </div>
      
  
      `;
    });
  }

  if (carrito.length === 0) {
    console.log("Nada");
    modalBody.innerHTML = `
    <p class="text-center text-primary parrafo">¡Aun no agregaste nada!</p>
    `;
  } else {
    console.log("Algo");
  }

  carritoContenedor.textContent = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);

  if (precioTotal) {
    const total = carrito.reduce(
      (acc, prod) => acc + prod.cantidad * prod.precio,
      0
    );
    precioTotal.innerText = `$ ${total.toLocaleString()}`;
  }

  guardarStorage();
};

// Función para guardar la información del carrito en el localStorage
function guardarStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Funcíon para eliminar un producto del carrito de compras
function eliminarProducto(id) {

  Toastify({
    text: "Producto eliminado",
    duration: 2000,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "center", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #BB2D3B, #F00001)",
      borderRadius: "2rem",
      textTransform: "uppercase",
      fontSize: ".75rem",
    },
    offset: {
      x: '1.5rem', // horizontal axis - can be a number or a string indicating unity. eg: '2em'
      y: '1.5rem' // vertical axis - can be a number or a string indicating unity. eg: '2em'
    },
    onClick: function(){} // Callback after click
  }).showToast();

  const alimentoId = id;
  carrito = carrito.filter((alimento) => alimento.id !== alimentoId);
  mostrarCarrito();
};

// Función para procesar la compra y mostrar los productos en el formulario de compra
function procesarPedido() {
  carrito.forEach((prod) => {
    const listaCompra = document.querySelector("#lista-compra tbody");
    const { id, nombre, precio, img, cantidad } = prod;
    if (listaCompra) {
      const row = document.createElement("tr");
      row.innerHTML += `
              <td>${nombre}</td>
              <td>${cantidad}</td>
              <td>$ ${precio.toLocaleString()}</td>
              <td>$ ${(precio * cantidad).toLocaleString()}</td>
            `;
      listaCompra.appendChild(row);
    }
  });
  totalProceso.innerText = `$ ${carrito.reduce(
    (acc, prod) => acc + prod.cantidad * prod.precio,
    0
  ).toLocaleString()}`;
}

function enviarCompra(e) {
  e.preventDefault();
  const cliente = document.querySelector("#cliente").value;
  const email = document.querySelector("#correo").value;

  if (email === "" || cliente == "") {
    Swal.fire({
      title: "¡Debes completar tu email y nombre!",
      text: "Rellena el formulario",
      icon: "error",
      confirmButtonText: "Aceptar",
    });
  } else {
    const spinner = document.querySelector("#spinner");
    spinner.classList.add("d-flex");
    spinner.classList.remove("d-none");

    setTimeout(() => {
      spinner.classList.remove("d-flex");
      spinner.classList.add("d-none");
      formulario.reset();

      const alertExito = document.createElement("p");
      alertExito.classList.add(
        "alert",
        "alerta",
        "d-block",
        "text-center",
        "col-12",
        "mt-2",
        "alert-success"
      );
      alertExito.textContent = "Compra realizada correctamente";
      formulario.appendChild(alertExito);

      setTimeout(() => {
        alertExito.remove();
      }, 3000);
    }, 3000);
  }
  localStorage.clear();
}
