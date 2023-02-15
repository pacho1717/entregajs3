


fetch("./productos.json")
    .then(resp => resp.json())
    .then(productos => miPrograma(productos))
    .catch(error => console.log(error))


function miPrograma(productos) {



    let carrito = localStorage.getItem("carrito") ? JSON.parse(localStorage.getItem("carrito")) : []


    let total = 0
    let precioTotal = document.getElementById(["precioTotal"])

    let shopContent = document.getElementById("shopContent")
    let contenedorCarrito = document.getElementById("contenedorCarrito")
    let showTotal = document.getElementById("totalOrden")
    let verCarrito = document.getElementById("verCarrito")
    verCarrito.addEventListener("click", mostrarOcultarCarrito)
    let verCarrito1 = document.getElementById("verCarrito1")
    verCarrito1.addEventListener("click", mostrarOcultarCarrito)

    function mostrarOcultarCarrito() {
        shopContent.classList.toggle("ocultar")
        contenedorCarrito.classList.toggle("ocultar")
    }

    renderizarCarrito(carrito)

    productos.forEach((product) => {
        let content = document.createElement("div");
        content.className = "product";
        content.innerHTML = `
    <h3>${product.nombre}</h3>
    <img src="${product.img}">
    <p class= "price">$${product.precio}</p>
    <button id=${product.id}>Agregar al carrito</button>
    `;

        shopContent.append(content);

        let boton = document.getElementById(product.id)
        boton.onclick = agregarAlCarrito

    })



    function agregarAlCarrito(e) {
        console.log(e.target.id)
        let productoBuscado = productos.find(product => product.id == e.target.id)
        console.log(productoBuscado)
        let productoEnCarrito = carrito.find(product => product.id == productoBuscado.id)
        if (productoEnCarrito) {
            let posicionProducto = carrito.findIndex(producto => producto == productoEnCarrito)
            carrito[posicionProducto].unidades++
            carrito[posicionProducto].subtotal = carrito[posicionProducto].precio * carrito
            [posicionProducto].unidades
            console.log(posicionProducto)
        } else {
            productoBuscado.unidades = 1
            productoBuscado.subtotal = productoBuscado.precio
            carrito.push(productoBuscado)
        }
        // storage y JSON
        localStorage.setItem("carrito", JSON.stringify(carrito))
        renderizarCarrito(carrito)

    }



    function renderizarCarrito(productosEnCarrito) {
        contenedorCarrito.innerText = ""
        contenedorCarrito.innerHTML = `<h3>Carrito</h3?`
        productosEnCarrito.forEach(product => {
            let tarjetaProducto = document.createElement("div")
            tarjetaProducto.classList.add("contenedorCarrito")
            tarjetaProducto.innerHTML += `
         <img src="${product.img}">
         <h3>${product.nombre}</h3>
         <p class="fw-bolder">${product.unidades}</p>
         <p class= "text-danger">$${product.subtotal}</p>
        `

            contenedorCarrito.appendChild(tarjetaProducto)


            console.log("El total de la compra es:", total)
            total = carrito.reduce(
                (acc, act) => acc + act.precio * act.unidades,
                0
            )
        }

        )
        contenedorCarrito.innerHTML += `
    <button id="comprar" class="btn btn-primary">COMPRAR</button>
    <button id="vaciar" class="btn btn-danger">VACIAR</button>`
        let comprar = document.getElementById("comprar")
        comprar.addEventListener("click", finalizarCompra)
        let vaciar = document.getElementById("vaciar")
        vaciar.addEventListener("click", vaciarCarrito)

    }




    function finalizarCompra() {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: "Su compra ha sido exitosa, el total es $" + total,
            showConfirmButton: false,
            timer: 3000
        })
        localStorage.removeItem("carrito")
        carrito = []
        renderizarCarrito(carrito)

    }


    function vaciarCarrito() {
        Swal.fire({
            icon: 'error',
            text: "Has vaciado tu carrito",
        })
        localStorage.removeItem("carrito")
        contenedorCarrito.innerText = ""
        carrito = []
    }



}