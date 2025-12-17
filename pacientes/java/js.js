let pacientes= parseInt(prompt("Ingrese la cantidad de pacientes:"), 10);
let matriz=[];

if (isNaN(pacientes) || pacientes<=0){
    console.log("Numero de pacientes ingresados no validos.");
    alert("terminado")
}

for (let i=0;i <pacientes;i++){
    let paciente={};
    let cantidad= i+1;  


    window.alert("paciente numero : "+cantidad);      


    let nombre=(prompt("ingrese nombre del paciente"));
    let edad=parseInt(prompt("ingrese la edad del paciente"));
    let peso=parseFloat(prompt("ingrese el peso [kg] del paciente"));
    let sexo=(prompt("Ingrese el sexo del paciente (H o M)"));
    paciente["Nombre"]=nombre;
    paciente["edad"]=edad;
    paciente["peso"]=peso;
    paciente["sexo"]=sexo; 
    matriz.push(paciente);
}  
let sumaPesos= 0; 

for (const elemento of matriz){
     if (!isNaN(elemento["peso"])){
        sumaPesos += elemento["peso"];
     }

}


const promedio=(suma,totalelementos) => suma/ totalelementos;

const promedioPacientes=promedio(sumaPesos,pacientes);

console.log(`El promedio de peso de los ${pacientes}paciente  es ${promedioPacientes} kg.`); 