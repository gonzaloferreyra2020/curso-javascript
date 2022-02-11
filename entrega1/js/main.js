//creacion de la clase producto
class Producto{
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
document.getElementById("formulario")
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


