function iniciarconteo() { 
var cantidad=parseInt(prompt("ingrese cantidad de palabras:"), 10 );


if(isNaN(cantidad) || cantidad <=0){
    console.log("Juego cancelado o cantidad invalidad. No puede continuar.");
    alert("Proceso cancelado o cantidad de palabras invalidas, reinicie para reintentar");
    return; 
}

let list=[]
for (let i=1 ; i <= cantidad;i++){
    var palabra = prompt("Ingrese palabra numero "+ i + ":");
    if (palabra !==null) {
        list.push(palabra); 
    }
}
const contarvocales= palabra => {
    const vocales = "aáeéiíoóuú";
    let cantidadvocales = 0 ; 
    for (const letra of palabra) {
        if (vocales.includes(letra.toLowerCase())) {
            cantidadvocales++;
        }
    }
    return cantidadvocales;
};

const palabranueva = list.join ("");

const vocales = contarvocales(palabranueva);

console.log(`Todas las palabras ingresadas en total tiene ${vocales} vocales.`);

alert (`El total de vocales encontrada es: ${vocales}`);

const resultadoDiv = document.getElementById(`resultado`); 
if(resultadoDiv) {
    resultadoDiv.innerHTML= `<h3>Total de Vocales contadas ${vocales}</h3>`; 
    
}
}
iniciarconteo() ;