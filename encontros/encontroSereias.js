const prompt = require("prompt-sync")();
const escreverComEfeito = require("../utils/utils");


class EncontroSereias {
    constructor(bruxo) {
        // Atribui o objeto bruxo à propriedade da classe EncontroSereias
        this.bruxo = bruxo;
    }

    // Método para iniciar o encontro com as sereias
    async iniciar() {
        // Mensagens de introdução ao encontro com as sereias
        await escreverComEfeito("\nVocê chegou ao Lago Negro e foi abordado por sereias.");
        await escreverComEfeito("Elas não deixarão você passar sem resolver alguns enigmas.");
        await escreverComEfeito();

        // Lista de enigmas que as sereias apresentarão ao jogador
        const enigmas = [
            {
                pergunta: "O que tem pés, mas não anda?",
                resposta: "montanha"
            },
            {
                pergunta: "O que tem olhos, mas não vê?",
                resposta: "agulha"
            },
            {
                pergunta: "O que tem asas, mas não voa?",
                resposta: "tempo"
            }
        ];

        // Variável para controlar se o jogador venceu todos os enigmas
        let venceu = true;

        // Laço para iterar sobre os enigmas
        for (const enigma of enigmas) {
            // Exibe a pergunta do enigma
            await escreverComEfeito(`Enigma: ${enigma.pergunta}`);
            // Obtém a resposta do usuário e converte para minúsculas
            const resposta = prompt("Resposta: ").toLowerCase();
            console.log(`Resposta do usuário: ${resposta}`);  // Log da resposta do usuário para depuração

            // Verifica se a resposta está correta
            if (resposta !== enigma.resposta) {
                // Mensagem se a resposta estiver incorreta e reduz a vida do bruxo
                await escreverComEfeito("Resposta incorreta! As sereias ficam irritadas e te atacam. -10 de vida.");
                this.bruxo.vida -= 10;
                venceu = false;  // Marca que o jogador não venceu o enigma
                break;  // Sai do laço ao encontrar uma resposta incorreta
            } else {
                // Mensagem se a resposta estiver correta
                await escreverComEfeito("Resposta correta! Você avança.");
            }
        }

        // Mensagem final dependendo do resultado dos enigmas
        if (venceu) {
            await escreverComEfeito("\nParabéns! Você venceu as sereias e pode continuar.");
        } else {
            await escreverComEfeito("As sereias não quiseram mais perder tempo com você, pode seguir caminho.");
        }

        // Exibe o status atualizado do bruxo
        await this.bruxo.status();
    }
}

module.exports = EncontroSereias;
