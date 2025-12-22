class Perro {
  constructor(nombre, raza, edad, color) {
    this.nombre = nombre;
    this.raza = raza;
    this.edad = edad;
    this.color = color;
  }

  mostrarInfo() {
    console.log(`🐶 Datos del Can: ${this.nombre}, Raza: ${this.raza}, Edad: ${this.edad} años, Color: ${this.color}`);
  }

  ladrar() {
    console.log(`${this.nombre} dice: ¡Guau guau! 🐾`);
  }
}

// Instancia famosa: El perro Lipigas
const perroFamoso = new Perro("Spike", "Quiltro (Mezcla)", 10, "Café");
perroFamoso.mostrarInfo();
perroFamoso.ladrar();