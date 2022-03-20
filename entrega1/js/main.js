
//venta de productos(listado de productos a vender)


//evento DOMContentLoaded (verifica q el DOM esta cargado correctamente)
 document.addEventListener("DOMContentLoaded", () =>{
     fetchData()
 })

//busqueda de productos.js (array de objetos donde estan guardados los productos)
const fetchData = async () => {
    try{
        const res = await fetch('js/productos.js')
        const data = await res.json()
        
        //agrega los productos al sitio
        mostrarProductos(data);
        seleccionarBotones(data);
        
    } catch (error) {
        console.log(error);
    }
} 

//se crea una const y trae a id=container-productos
const containerProductos = document.querySelector("#container-productos");

//funcion para mostrar los productos en html
const mostrarProductos = (data) => {

    //se crea un template y un fragment
    const template = document.querySelector('#template-productos').content;
    const fragment = document.createDocumentFragment();

    

    //agrega las imagenes, el titulo, precio y id por cada producto q itera
    data.forEach(producto => {
        
        template.querySelector("img").setAttribute("src",producto.thumbnailUrl)
        template.querySelector("h5").textContent = producto.title
        template.querySelector("p span").textContent = producto.precio
        template.querySelector("button").dataset.id = producto.id
      

        //se crea un clone por cada template y se agrega al fragment
        const clone = template.cloneNode(true);
        fragment.appendChild(clone)
    });

    //agrega el fragment al container-productos
    containerProductos.appendChild(fragment);
}

//objeto carrito
let carrito={}

//seleccion del boton comprar
const seleccionarBotones = (data) => {
    const botones = document.querySelectorAll(".card button");
    


    botones.forEach(btn => {
        btn.addEventListener("click", () => {
            
            const producto = data.find(item => item.id === parseInt( btn.dataset.id));
            producto.cantidad = 1
            //if para aumentar la cantidad
            if (carrito.hasOwnProperty(producto.id)){
                producto.cantidad = carrito[producto.id].cantidad +1
                
            }
            //libreria sweet alert
            swal("Producto agregado al carrito!", "", "success");

            carrito[producto.id] = {...producto}
            
            mostrarCarrito();
        
        })
    })
}

const productoCarrito = document.querySelector("#producto-carrito");
const items = document.getElementById('items')

//funcion para mostrar el carrito con los productos seleccionados
const mostrarCarrito = () => {
    
    //se limpian los items
    items.innerHTML = ''

    //se crea template y fragment para luego agregarlos al html
    const templateCarrito = document.querySelector("#template-carrito").content
    const fragment = document.createDocumentFragment()

    
   //se convierte el objecto en array para usar el foreach
    Object.values(carrito).forEach(producto => {
        //id del producto
        templateCarrito.querySelectorAll("td")[0].textContent = producto.id
        //nombre del producto
        templateCarrito.querySelectorAll("td")[1].textContent = producto.nombre
        //precio total del producto
        templateCarrito.querySelectorAll("td")[2].textContent = "$"+producto.precio*producto.cantidad
        //cantidad de productos seleccionados
        templateCarrito.querySelectorAll("td")[3].textContent = producto.cantidad
        //botones
        templateCarrito.querySelector('.btn-info').dataset.id = producto.id
        templateCarrito.querySelector('.btn-danger').dataset.id = producto.id
       

        const clone = templateCarrito.cloneNode(true);
        fragment.appendChild(clone)
    });

    items.appendChild(fragment);
    mostrarFooter()
   

}

const templateFooter = document.getElementById('footerTabla')


// funcion para modificar el footer de la tabla
const mostrarFooter = () => {
    //se limpia el footer de la tabla
    footerTabla.innerHTML = ''

    //si el carrito vuelve a cero se muestra el mensaje por inner HTML
    if (Object.keys(carrito).length === 0) {
        footerTabla.innerHTML = `
        <th scope="row" colspan="5">Carrito vacío </th>
        `
        return
    }

    //se crea template y fragment para luego agregarlos al html
    const template = document.querySelector("#template-footer").content
    const fragment = document.createDocumentFragment()

    //mostrar precio total
    const cantidadTotal = Object.values(carrito).reduce((a,{cantidad}) => a+cantidad,0)
    const precioTotal = Object.values(carrito).reduce((acc,{cantidad,precio}) =>acc + cantidad*precio,0)

    console.log("precio es",precioTotal);
    template.querySelectorAll("td")[1].textContent = cantidadTotal
    template.querySelector("span").textContent = precioTotal
    

    const clone = template.cloneNode(true);
    fragment.appendChild(clone);
    
    templateFooter.appendChild(fragment);

    // boton para vaciar el carrito
    const botonVaciar = document.querySelector("#vaciar-carrito") 
    botonVaciar.addEventListener("click",() =>{
        carrito = {}
        mostrarCarrito()
    })

}

//evento para que sume o reste los productos del carrito
items.addEventListener('click', e => { btnAumentarDisminuir(e) })

//funcion para aumentar o disminuir las cantidades
const btnAumentarDisminuir = e => {
    
    if (e.target.classList.contains('btn-info')) {
        const producto = carrito[e.target.dataset.id]
        producto.cantidad++
        carrito[e.target.dataset.id] = { ...producto }
        mostrarCarrito()
    }

    if (e.target.classList.contains('btn-danger')) {
        const producto = carrito[e.target.dataset.id]
        producto.cantidad--
        if (producto.cantidad === 0) {
            delete carrito[e.target.dataset.id]
        } else {
            carrito[e.target.dataset.id] = {...producto}
        }
        mostrarCarrito()
    }
    e.stopPropagation()
}



    
    
    
    
    