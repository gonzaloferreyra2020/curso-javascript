//creacion de la clase producto
/*class Producto{
    constructor(nombre,descrip,precio,stock){
        this.nombre = nombre;
        this.descrip = descrip;
        this.precio = precio; 
        this.stock = stock;
    }
    
}

//creacion de la clase creacion de producto
class Creacion{
     crearProducto(producto){
        const lista = document.getElementById("carrito");
        const div = document.createElement("div");
        div.innerHTML = `<div class="col-md-4">
        Nombre: ${producto.nombre}
        Descripcion: ${producto.descrip}
        Precio: ${producto.precio}
        Stock: ${producto.stock=1}
        </div><br>`;
        lista.appendChild(div);
        console.log(crearProducto);
        
     }

     
}

//Instancias de las clases producto y creacion
document.getElementById("container-productos")
    .addEventListener("submit",function (){
        const nombre = document.getElementById("nombre").value;
        const descrip = document.getElementById("descrip").value;
        const precio = document.getElementById("precio").value;
        const producto = new Producto(nombre,descrip,precio);
        const creacion = new Creacion();
        creacion.crearProducto(producto);
        //agregarStock();
        console.log(producto);
        event.preventDefault();
    })

*/


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

const mostrarCarrito = () => {

    

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

    productoCarrito.appendChild(fragment);

}