//creacion de la clase producto
class Producto{
    constructor(nombre,descrip,precio){
        this.nombre = nombre;
        this.descrip = descrip;
        this.precio = precio; 
    }
}
//creacion de la clase creacion de producto
class Creacion{
     crearProducto(producto){
        const lista = document.getElementById("listado");
        const div = document.createElement("div");
        div.innerHTML = `<div class="col-md-6">
        Nombre: ${producto.nombre}
        Descripcion: ${producto.descrip}
        Precio: ${producto.precio}
        </div>`;
        lista.appendChild(div);

     }
}

//Instancias de las clases
document.getElementById("formulario")
    .addEventListener("submit",function (){
        const nombre = document.getElementById("nombre").value;
        const descrip = document.getElementById("descrip").value;
        const precio = document.getElementById("precio").value;
        const producto = new Producto(nombre,descrip,precio);
        const creacion = new Creacion();
        creacion.crearProducto(producto);
    })