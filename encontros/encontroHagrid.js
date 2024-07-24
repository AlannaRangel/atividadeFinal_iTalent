const prompt = require("prompt-sync")();
const escreverComEfeito = require("../utils/utils");


class EncontroHagrid {
    constructor(bruxo) {
        // Atribui o objeto bruxo à propriedade da classe EncontroHagrid
        this.bruxo = bruxo;
    }

    // Método para iniciar o encontro com Hagrid
    async iniciar() {
        // Mensagens introdutórias ao encontro com Hagrid e proposta de treinamento
        await escreverComEfeito("\nVocê encontra com Hagrid e ele te propõe um treinamento. Caso você vá bem, irá te recompensar.");

        let aceitar;
        // Loop para garantir que o jogador escolha uma resposta válida
        do { //Laço de repetição
            aceitar = prompt("Você aceita? (s - Sim ou n - Não): ").toLowerCase();
            // Verifica se a resposta é válida
            if (aceitar !== 's' && aceitar !== 'n') {
                await escreverComEfeito("Resposta inválida. Por favor, selecione 's' para Sim ou 'n' para Não.");
            }
        } while (aceitar !== 's' && aceitar !== 'n');

        // Verifica a resposta do jogador
        if (aceitar === 's') { //Estrutura de decisão
            // Mensagens sobre o treinamento e opções de feitiço
            await escreverComEfeito("\nMuito bem, pequeno bruxo. Irei te ensinar qualquer feitiço que você queira aprender.");
            await escreverComEfeito("\n1. Avada Kedavra");
            await escreverComEfeito("2. Lumos");
            await escreverComEfeito("3. Expecto Patronum");

            let feitiço;
            // Loop para garantir que o jogador escolha um feitiço válido
            do {
                feitiço = parseInt(prompt("Digite o número correspondente ao feitiço escolhido: "), 10);
                // Verifica se a escolha é válida
                if (isNaN(feitiço) || feitiço < 1 || feitiço > 3) {
                    await escreverComEfeito("Escolha inválida. Por favor, selecione uma opção válida.");
                }
            } while (isNaN(feitiço) || feitiço < 1 || feitiço > 3);

            // Mensagens baseadas na escolha do feitiço
            switch (feitiço) {
                case 1:
                    await escreverComEfeito("- Você realmente gosta de um desafio, um dos 3 feitiços proibidos.");
                    await escreverComEfeito("- Não sei se sou a melhor pessoa para te ensinar artes das trevas. Mas promessa é dívida, vamos começar.");
                    break;
                case 2:
                case 3:
                    await escreverComEfeito("Feitiço escolhido foi ensinado com sucesso.");
                    break;
            }

            // Mensagem final e recompensa após a aula
            await escreverComEfeito("Após a aula, Hagrid te levou para tomar uma cerveja amanteigada e te presenteou com 50 galeões pelo sucesso na aula.");
            this.bruxo.galeoes += 50;  // Adiciona 50 galeões ao total do bruxo
            await this.bruxo.status();  // Exibe o status atualizado do bruxo
        } else {
            // Mensagem se o jogador não aceitar o treinamento
            await escreverComEfeito("Hagrid se despede e você continua seu caminho.");
        }
    }
}

module.exports = EncontroHagrid;
