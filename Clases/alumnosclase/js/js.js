class Alumno {
  constructor(nombre, edad, carrera, institucion) {
    this.nombre = nombre;
    this.edad = edad;
    this.carrera = carrera;
    this.institucion = institucion;
  }

  mostrarInfo() {
    console.log("--- Ficha del Alumno ---");
    console.log(`Nombre: ${this.nombre}`);
    console.log(`Edad: ${this.edad} años`);
    console.log(`Carrera: ${this.carrera}`);
    console.log(`Institución: ${this.institucion}`);
    console.log("------------------------");
  }
}

// Instancia de prueba
const alumno1 = new Alumno("Matias", 22, "Desarrollo de Software", "Aula Digital");
alumno1.mostrarInfo();