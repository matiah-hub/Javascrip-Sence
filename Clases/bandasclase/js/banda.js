class BandaMusical {
  constructor(nombre, genero, integrantes, discos) {
    this.nombre = nombre;
    this.genero = genero;
    this.integrantes = integrantes; // Número de personas
    this.discos = discos; // Array de strings
  }

  mostrarInfo() {
    console.log(`🎸 Banda: ${this.nombre} | Género: ${this.genero} | Miembros: ${this.integrantes}`);
  }

  listarDiscos() {
    console.log(`💿 Discografía de ${this.nombre}:`);
    this.discos.forEach((disco, index) => {
      console.log(`${index + 1}. ${disco}`);
    });
  }
}

// Instancia con tu banda favorita (Ejemplo: Linkin Park)
const miBanda = new BandaMusical(
  "Linkin Park", 
  "Rock Alternativo", 
  6, 
  ["Hybrid Theory", "Meteora", "Minutes to Midnight"]
);

miBanda.mostrarInfo();
miBanda.listarDiscos();