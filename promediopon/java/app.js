let cantidadAlumnos;

let notasCurso = 0;

let detallesalumnoshtml= "";



do {

    cantidadAlumnos = parseFloat(prompt("Ingrese la cantidad de alumnos del curso:"));

    if (isNaN(cantidadAlumnos) || cantidadAlumnos <= 0) {

        alert("Error: Por favor, ingrese un número válido y positivo de alumnos.");

    }

} while (isNaN(cantidadAlumnos) || cantidadAlumnos <= 0);





for (let i = 1; i <= cantidadAlumnos; i++) {

 

    let nota1, nota2, nota3, promedioAlumno;



    alert(`*** Ingresando notas para el Alumno ${i} de ${cantidadAlumnos} ***`);

   

   

    nota1 = parseFloat(prompt(`Alumno ${i}: Ingrese Nota 1 (25%):`));

    nota2 = parseFloat(prompt(`Alumno ${i}: Ingrese Nota 2 (35%):`));

    nota3 = parseFloat(prompt(`Alumno ${i}: Ingrese Nota 3 (40%):`));

   

    // Validación básica para evitar NaN

    if (isNaN(nota1) || isNaN(nota2) || isNaN(nota3)) {

        alert(`Advertencia: Notas inválidas para el Alumno ${i}. Se asumirá promedio 0.`);

        promedioAlumno = 0;

    } else {

       

       

        const ponderacion1 = nota1 * 0.25; // (25%)

        const ponderacion2 = nota2 * 0.35; // (35%)

        const ponderacion3 = nota3 * 0.40; // (40%)

       

        promedioAlumno = ponderacion1 + ponderacion2 + ponderacion3;

       

       

        console.log(`> Alumno ${i}: Promedio Ponderado = ${promedioAlumno.toFixed(2)}`);

    }



 

    notasCurso += promedioAlumno;

}





let promedioFinalCurso = notasCurso / cantidadAlumnos;







const salidaHTML= `

    <style>

        body { font-family: Arial, sans-serif; background-color: #f4f4f4; text-align: center; padding: 50px; }

        h1 { color: #333; }

        .resultado {

            font-size: 2.5em;

            font-weight: bold;

            color: ${promedioFinalCurso >= 4.0 ? 'green' : 'red'};

            margin-top: 20px;

            padding: 10px;

            border: 2px solid ${promedioFinalCurso >= 4.0 ? 'green' : 'red'};

            display: inline-block;

        }

    </style>

    <h1> Tarea de Promedio del Curso Finalizada</h1>

    <p>Se procesaron ${cantidadAlumnos} alumnos.</p>

    <h2>Suma de todos los promedios: ${notasCurso.toFixed(2)}</h2>

    <h3>Promedio General del Curso:</h3>

    <div class="resultado">

        ${promedioFinalCurso.toFixed(2)}

    </div>

`;



const resultadoDOM = document.getElementById('resultado-dom');

resultadoDOM.innerHTML = salidaHTML;