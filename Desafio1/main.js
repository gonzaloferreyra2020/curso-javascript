// carrito de compras

let ingresarPrecio = parseInt (prompt ("ingresar un precio"));
let carrito = 0;
let stock = 5;


while (stock>0){

    carrito = ingresarPrecio + carrito;
    stock = stock-1;
    
    ingresarPrecio = parseInt(prompt("ingresar otro precio:"));
}
alert("el total del carrito es: $" + carrito);
alert ("el stock del carrito es: "+ stock);


