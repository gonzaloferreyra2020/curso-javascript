//Calculadora de cuotas
let cuota;
let ingresarMonto = parseFloat( prompt("ingrese el monto a pagar:"));
let ingresarCantidad = parseFloat( prompt("ingresar cantidad de cuotas:"));

function calculadoraCuotas(ingresarMonto,ingresarCantidad){

    cuota=ingresarMonto/ingresarCantidad;
    
    return cuota;
}

calculadoraCuotas(ingresarMonto,ingresarCantidad);

if(ingresarMonto <=0){
    alert("Ingrese monto válido:");
}
else{
    alert("Las cuotas seran de: $" + cuota);
}

