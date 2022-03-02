

//venta de productos(listado de productos a vender)



//evento DOMContentLoaded
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
const carrito={}

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

            carrito[producto.id] = {...producto}
            console.log(carrito);
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
        //console.log(Object.values(carrito))
        //console.log(producto);
        template.querySelectorAll("td")[0].textContent = producto.id
        template.querySelectorAll("td")[1].textContent = producto.title
        template.querySelectorAll("td")[2].textContent = producto.precio*producto.cantidad
        template.querySelectorAll("td")[3].textContent = producto.cantidad

        const clone = template.cloneNode(true);
        fragment.appendChild(clone)
    });

    items.appendChild(fragment);
    pintarFooter()

}

const templateFooter = document.getElementById('template-footer').content

// para modificar el footer de la tabla
const pintarFooter = () => {
    //se limpia el footer
    footer.innerHTML = ''

    //libreria sweet alert
    swal("Producto agregado al carrito!", "", "success");


    
    if (Object.keys(carrito).length === 0) {
        footer.innerHTML = `
        <th scope="row" colspan="5">Carrito vacío con innerHTML</th>
        `
        return
    }
    
        const boton = document.querySelector('#vaciar-carrito')
        boton.addEventListener('click', () => {
            carrito = []
        })
    
    }