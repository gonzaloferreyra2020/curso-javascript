
//venta de productos(listado de productos a vender)


//evento DOMContentLoaded (verifica q el DOM esta cargado correctamente)
 document.addEventListener("DOMContentLoaded", () =>{
     fetchData()
 })

//busqueda de productos.js (array de objetos donde estan guardados los productos)
const fetchData = async () => {
    try{
        const res = await fetch('./js/productos.js')
        const data = await res.json()
        //console.log(data);
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

    //console.log(template);

    //agrega las imagenes, el titulo, precio y id por cada producto q itera
    data.forEach(producto => {
        //console.log(producto);
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
    //console.log(botones);


    botones.forEach(btn => {
        btn.addEventListener("click", () => {
            //console.log(btn.dataset.id);
            const producto = data.find(item => item.id === parseInt( btn.dataset.id));
            producto.cantidad = 1
            //if para aumentar la cantidad
            if (carrito.hasOwnProperty(producto.id)){
                producto.cantidad = carrito[producto.id].cantidad +1
                
            }
            //libreria sweet alert
            swal("Producto agregado al carrito!", "", "success");

            carrito[producto.id] = {...producto}
            //console.log(carrito);
            mostrarCarrito();
        
        })
    })
}

const productoCarrito = document.querySelector("#producto-carrito");
const items = document.getElementById('items')


const mostrarCarrito = () => {
    
    //se limpian los items
    items.innerHTML = ''

    //se crea template y fragment para luego agregarlos al html
    const template = document.querySelector("#template-carrito").content
    const fragment = document.createDocumentFragment()

    
   //se convierte el objecto en array para usar el foreach
    Object.values(carrito).forEach(producto => {
        
        template.querySelectorAll("td")[0].textContent = producto.id
        template.querySelectorAll("td")[1].textContent = producto.title
        template.querySelectorAll("td")[2].textContent = "$"+producto.precio*producto.cantidad
        template.querySelectorAll("td")[3].textContent = producto.cantidad

        const clone = template.cloneNode(true);
        fragment.appendChild(clone)
    });

    items.appendChild(fragment);
    pintarFooter()

}

const templateFooter = document.getElementById('footerTabla')

// para modificar el footer de la tabla
const pintarFooter = () => {
    //se limpia el footer de la tabla
    footerTabla.innerHTML = ''

   

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

    //
    const botonVaciar = document.querySelector("#vaciar-carrito") 
    botonVaciar.addEventListener("click",() =>{
        carrito = {}
        mostrarCarrito()
    })


   
    // else{
    //     footer.innerHTML = `
    //     <button class="btn btn-danger btn-sm" id="vaciar-carrito">
    //             vaciar carrito
    //         </button>
    //     `
    //     // const boton = document.querySelector('btn-danger')
    //     // boton.addEventListener('click', () => {
    //     // carrito = [];
    //     // })
    //     // console.log(boton);
    // }
    
    
    
    
    }