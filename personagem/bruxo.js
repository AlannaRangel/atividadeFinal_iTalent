const Personagem = require("./personagem")
// Construtor da classe Bruxo, recebe parâmetros de vida, nome, casa, magia e galeões
class Bruxo extends Personagem {
    constructor(vida, nome, casa, magia, galeoes) {
        super(vida);
        this.nome = nome;
        this.casa = casa;
        this.magia = magia;
        this.galeoes = galeoes;
        this.encontrouHagrid = false; // Função para vê se já aconteceu encontro com Hagrid.
    }

     // Método para exibir o status atual do bruxo
    status() {
        console.log(`Nome: ${this.nome}`);
        console.log(`Casa: ${this.casa}`);
        console.log(`Vida: ${this.vida}%`);
        console.log(`Magia: ${this.magia}%`);
        console.log(`Galeões: G$${this.galeoes}`);
    }
}

module.exports = Bruxo;
