// =========================================================
// OBJETIVO: CÁLCULO DE PROMEDIO DEL CURSO CON PONDERACIONES
// =========================================================

let cantidadAlumnos;
let notasCurso = 0; 
let detallesAlumnosHTML = ''; // Variable para acumular el detalle de cada alumno

// 1. Solicitar al usuario la cantidad de alumnos (con validación básica)
do {
    cantidadAlumnos = parseFloat(prompt("Ingrese la cantidad de alumnos del curso:"));
    if (isNaN(cantidadAlumnos) || cantidadAlumnos <= 0) {
        alert("Error: Por favor, ingrese un número válido y positivo de alumnos.");
    }
} while (isNaN(cantidadAlumnos) || cantidadAlumnos <= 0);

// --- 1. INICIO DE LA TABLA (ANTES DEL BUCLE) ---
detallesAlumnosHTML += '<h2>Detalle de Promedios Individuales</h2><table border="1" style="width: 80%; margin: 20px auto; text-align: left; border-collapse: collapse;"><thead><tr><th>Alumno</th><th>Nota 1 (25%)</th><th>Nota 2 (35%)</th><th>Nota 3 (40%)</th><th>Promedio Ponderado</th></tr></thead><tbody>';

// 2. Usar un ciclo 'for' para procesar a cada alumno
for (let i = 1; i <= cantidadAlumnos; i++) {
    let nota1, nota2, nota3, promedioAlumno;

    alert(`*** Ingresando notas para el Alumno ${i} de ${cantidadAlumnos} ***`);
    
    // Solicitamos las 3 notas
    nota1 = parseFloat(prompt(`Alumno ${i}: Ingrese Nota 1 (25%):`));
    nota2 = parseFloat(prompt(`Alumno ${i}: Ingrese Nota 2 (35%):`));
    nota3 = parseFloat(prompt(`Alumno ${i}: Ingrese Nota 3 (40%):`));
    
    // Validación de notas y cálculo
    let nota1Display = nota1;
    let nota2Display = nota2;
    let nota3Display = nota3;

    if (isNaN(nota1) || isNaN(nota2) || isNaN(nota3) || nota1 < 0 || nota2 < 0 || nota3 < 0) {
        alert(`Advertencia: Notas inválidas para el Alumno ${i}. Se asumirá promedio 0.`);
        promedioAlumno = 0;
        nota1Display = 'INVÁLIDA';
        nota2Display = 'INVÁLIDA';
        nota3Display = 'INVÁLIDA';
    } else {
        
        // 3. Calcular el promedio del alumno aplicando las ponderaciones:
        const ponderacion1 = nota1 * 0.25; 
        const ponderacion2 = nota2 * 0.35; 
        const ponderacion3 = nota3 * 0.40; 
        
        promedioAlumno = ponderacion1 + ponderacion2 + ponderacion3;
        
        console.log(`> Alumno ${i}: Promedio Ponderado = ${promedioAlumno.toFixed(2)}`);
    }

    // 4. Acumular el resultado del alumno en la tabla HTML (DENTRO DEL BUCLE)
    const colorPromedio = promedioAlumno >= 4.0 ? 'style="color: green; font-weight: bold;"' : 'style="color: red; font-weight: bold;"';
    
    detallesAlumnosHTML += `
        <tr>
            <td>${i}</td>
            <td>${typeof nota1Display === 'number' ? nota1Display.toFixed(1) : nota1Display}</td>
            <td>${typeof nota2Display === 'number' ? nota2Display.toFixed(1) : nota2Display}</td>
            <td>${typeof nota3Display === 'number' ? nota3Display.toFixed(1) : nota3Display}</td>
            <td ${colorPromedio}>${promedioAlumno.toFixed(2)}</td>
        </tr>
    `;

    // 5. Acumular el promedio del alumno para el promedio general
    notasCurso += promedioAlumno; 
}

// --- 2. CIERRE DE LA TABLA (DESPUÉS DEL BUCLE) ---
detallesAlumnosHTML += '</tbody></table>';

// 6. Calcular el promedio final del curso
let promedioFinalCurso = notasCurso / cantidadAlumnos;

// 7. Generar el HTML final e inyectar en el DOM (EL MÉTODO SEGURO)
const salidaHTML = `
    <style>
        body { font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 50px; }
        .contenedor { max-width: 900px; margin: 0 auto; background: white; padding: 30px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
        h1, h2, h3 { color: #333; text-align: center; }
        .resultado-curso {
            font-size: 3em;
            font-weight: bold;
            color: ${promedioFinalCurso >= 4.0 ? '#1E8449' : '#C0392B'}; 
            margin: 20px 0;
            padding: 15px;
            border: 3px solid ${promedioFinalCurso >= 4.0 ? '#1E8449' : '#C0392B'};
            display: inline-block;
            text-align: center;
        }
    </style>
    <div class="contenedor">
        <h1>✅ Tarea: Promedio del Curso con Ponderación</h1>
        ${detallesAlumnosHTML} <hr style="margin: 30px 0;">
        
        <h3>Promedio General Final del Curso (${cantidadAlumnos} Alumnos):</h3>
        <div class="resultado-curso">
            ${promedioFinalCurso.toFixed(2)}
        </div>
    </div>
`;

// Inyectar el HTML generado en el DIV con ID "resultado-dom"
const resultadoDOM = document.getElementById('resultado-dom');
if (resultadoDOM) {
    resultadoDOM.innerHTML = salidaHTML;
} else {
    // Fallback: Si el DIV no existe, al menos mostrar el contenido
    document.write(salidaHTML); 
}