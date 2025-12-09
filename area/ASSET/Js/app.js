
window.alert("Hola tamers");

let diametro = parseFloat (prompt("ingresa el diametro del circulo (en cualquier unidad):"));
let radio = null ;
let area = null ;

if (isNaN(diametro) || diametro <= 0 ) {
    console.error("Numero incorrecto.");
    window.alert("Error: No se pudo calcular. intentalo nuevamente con un numero positivo.");
}
else{ 
    radio = diametro / 2 ;
    area = Math.PI * Math.pow (radio, 2 );
    areaFormateada = area.toFixed(2);

}



{
console.log("--- Calculo del area ---");
console.log("Diametro ingresado:", diametro);
console.log("radio calculado (d/2):", radio ); 
console.log("area calculada (π * r²):", area);
console.log("area formateada (2 decimales)", areaFormateada); 

window.alert("El area del circulo con un diametro de"+ diametro + "es:" + areaFormateada+ "unidades cuadradas.");

let resultadoDiv = document.getElementById("resultado");

resultadoDiv.innerHTML = `
<p> Calculo completo! </p> 
<ul> 
    <li> Diametro ingresado : **${diametro}**</li> 
    <li> radio (r) calculado: **${radio}**</li>
    <li> area (a) calculada: **${areaFormateada}** unidades cuadradas. </li> 
    </ul> 
    `;
        
} 