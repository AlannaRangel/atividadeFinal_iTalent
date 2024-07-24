const prompt = require("prompt-sync")();
const escreverComEfeito = require("../utils/utils");


class EncontroVoldemort {
    constructor(bruxo) {
        // Atribui o objeto bruxo à propriedade da classe EncontroVoldemort
        this.bruxo = bruxo;
        // Define a vida inicial de Voldemort
        this.vidaVoldemort = 100;
    }

    // Método para iniciar a batalha com Voldemort
    async iniciar() {
        // Mensagem de introdução para a batalha final
        await escreverComEfeito("\nVocê encontrou Voldemort! Prepare-se para a batalha final.");

        // Laço de repetição para continuar a batalha enquanto o bruxo e Voldemort tiverem vida
        while (this.bruxo.vida > 0 && this.vidaVoldemort > 0) {
            // Opções de ação para o jogador
            await escreverComEfeito("\nEscolha sua ação:");
            await escreverComEfeito("1. Lançar feitiço");
            await escreverComEfeito("2. Defender");
            await escreverComEfeito("3. Usar poção de magia");

            // Obtém a escolha do jogador e converte para inteiro
            const escolha = parseInt(prompt("Digite o número da sua escolha: "));

            // Estrutura de decisão para tratar a escolha do jogador
            switch (escolha) {
                case 1:
                    // Verifica se o jogador tem magia suficiente para lançar um feitiço
                    if (this.bruxo.magia >= 10) {
                        // Define o dano causado pelo feitiço
                        let dano = 20;
                        if (this.bruxo.magia === 100) {
                            dano = 40; // Dano aumentado se a magia estiver no máximo
                        }
                        // Reduz a vida de Voldemort e a magia do bruxo
                        this.vidaVoldemort -= dano;
                        this.bruxo.magia -= 10;
                        await escreverComEfeito(`Você lançou um feitiço e causou ${dano} de dano a Voldemort.`);
                    } else {
                        // Mensagem se a magia for insuficiente para lançar um feitiço
                        await escreverComEfeito("Magia insuficiente para lançar um feitiço!");
                    }
                    break;
                case 2:
                    // Mensagem para defesa e reduz a vida do bruxo
                    await escreverComEfeito("Você se defendeu e reduziu o dano do próximo ataque.");
                    this.bruxo.vida -= 5; // Reduz a vida do bruxo devido à defesa
                    break;
                case 3:
                    // Verifica se o jogador tem galeões suficientes para usar uma poção
                    if (this.bruxo.galeoes >= 10) {
                        // Deduz galeões e aumenta a magia do bruxo
                        this.bruxo.galeoes -= 10;
                        this.bruxo.magia = Math.min(this.bruxo.magia + 20, 100); // Aumenta a magia, até um máximo de 100%
                        await escreverComEfeito("Você usou uma poção e recuperou 20% de magia.");
                    } else {
                        // Mensagem se o jogador não tiver galeões suficientes
                        await escreverComEfeito("Você não tem galeões suficientes para usar uma poção.");
                    }
                    break;
                default:
                    // Mensagem se a escolha do jogador for inválida
                    await escreverComEfeito("Escolha inválida. Por favor, digite 1, 2 ou 3.");
            }

            // Se Voldemort ainda tiver vida, ele ataca o bruxo
            if (this.vidaVoldemort > 0) {
                const danoVoldemort = 15;
                this.bruxo.vida -= danoVoldemort; // Reduz a vida do bruxo
                await escreverComEfeito(`Voldemort atacou e causou ${danoVoldemort} de dano.`);
            }

            // Exibe o status atualizado do bruxo
            await this.bruxo.status();
        }

        // Mensagem final dependendo do resultado da batalha
        if (this.bruxo.vida > 0) {
            await escreverComEfeito("\nVocê derrotou Voldemort! UAU!");
        } else {
            await escreverComEfeito("\nVocê foi derrotado por Voldemort. Tente novamente!");
        }
    }
}

module.exports = EncontroVoldemort;
