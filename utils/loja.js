const prompt = require("prompt-sync")();
const escreverComEfeito = require("./utils");

class LojaPocoes {
    // Construtor da classe LojaPocoes
    constructor(bruxo) {
        // Atribui o objeto bruxo à propriedade da classe LojaPocoes
        this.bruxo = bruxo;
    }

    // Método para iniciar a interação na loja de poções
    async iniciar() {
        // Mensagens de boas-vindas e introdução da loja
        await escreverComEfeito("\nBem-vindo à Loja de Poções!");
        await escreverComEfeito("Uma velha bruxa anda na sua direção.");
        await escreverComEfeito("\n- Olá, vejo que é um jovem bruxo.");
        await escreverComEfeito("- Como sei quais desafios você tem pela frente vou te oferecer apenas poções de magia.");
        await escreverComEfeito("- Elas serão de grande ajuda.");
        await escreverComEfeito("\nCada poção custa G$10 e aumenta 10% da sua magia.");
        await escreverComEfeito(`Quantos galeões você tem: G$${this.bruxo.galeoes}`);

        // Variável para controlar se o jogador deseja continuar comprando
        let continuarComprando = true;

        // Laço de repetição para permitir que o jogador continue comprando poções até escolher sair
        while (continuarComprando) {
            // Opções de compra
            await escreverComEfeito("\n1. Comprar poção");
            await escreverComEfeito("2. Sair da loja");
            // Obtém a escolha do jogador e converte para inteiro
            const escolha = parseInt(prompt("Digite o número da sua escolha: "));

            // Estrutura de decisão para tratar a escolha do jogador
            switch (escolha) {
                case 1:
                    // Verifica se o jogador tem galeões suficientes para comprar uma poção
                    if (this.bruxo.galeoes >= 10) {
                        // Deduz 10 galeões do bruxo e aumenta a magia em 10%, até um máximo de 100%
                        this.bruxo.galeoes -= 10;
                        this.bruxo.magia = Math.min(this.bruxo.magia + 10, 100);
                        await escreverComEfeito("Você comprou uma poção! Magia aumentada em 10%.");
                        // Exibe o status atualizado do bruxo
                        await this.bruxo.status();
                    } else {
                        // Mensagem se o jogador não tiver galeões suficientes
                        await escreverComEfeito("Você não tem galeões suficientes para comprar uma poção.");
                    }
                    break;
                case 2:
                    // Define continuarComprando como false para sair do laço e da loja
                    continuarComprando = false;
                    break;
                default:
                    // Mensagem se o jogador escolheu uma opção inválida
                    await escreverComEfeito("Escolha inválida. Por favor, digite 1 ou 2.");
            }
        }
    }
}


module.exports = LojaPocoes;
