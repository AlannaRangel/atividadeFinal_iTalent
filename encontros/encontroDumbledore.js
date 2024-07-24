const escreverComEfeito = require("../utils/utils");

class EncontroDumbledore {
    constructor(bruxo) {
        this.bruxo = bruxo;
    }

    // Método para iniciar o encontro com Dumbledore e mensagens finais.
    async iniciar() {
        await escreverComEfeito("\nApós a vitória, você se encontra com Dumbledore.");
        await escreverComEfeito("\nDumbledore: - Parabéns, jovem bruxo! Você provou ser um verdadeiro herói.");
        await escreverComEfeito("\nVocê completou a sua aventura nesse mundo com bravura e sabedoria.");
        await escreverComEfeito("\nObrigada por jogar! :)");
    }
}

module.exports = EncontroDumbledore;
