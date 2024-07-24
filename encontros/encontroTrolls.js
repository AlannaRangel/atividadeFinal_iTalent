const prompt = require("prompt-sync")();
const Personagem = require("../personagem/personagem"); 
const EncontroHagrid = require("./encontroHagrid"); 
const escreverComEfeito = require("../utils/utils");


class EncontroTrolls extends Personagem {
    constructor(bruxo) {
        // Chama o construtor da classe pai (Personagem) com a vida do bruxo
        super(bruxo.vida);
        // Atribui o objeto bruxo à propriedade da classe EncontroTrolls
        this.bruxo = bruxo; 
    }

    // Método para iniciar o encontro com os trolls
    async iniciar() {
        let venceu = false;  // Variável para controlar se o jogador venceu

        // Laço de repetição para garantir que o jogador enfrente os trolls até escolher uma das opções válidas
        while (!venceu) {
            await escreverComEfeito("Escolha um feitiço para enfrentar os trasgos:");
            await escreverComEfeito("1. Bombarda");
            await escreverComEfeito("2. Expelliarmus");
            await escreverComEfeito("3. Wingardium Leviosa");

            // Obtém o feitiço escolhido pelo jogador e converte para inteiro
            const feitiço = parseInt(prompt("Digite o número correspondente ao feitiço escolhido: "));
            await escreverComEfeito();

            // Estrutura de decisão para tratar a escolha do feitiço
            switch (feitiço) {
                case 1:
                case 2:
                    // Mensagem se o jogador escolheu Bombarda ou Expelliarmus
                    await escreverComEfeito("Genial, mas são dois trasgos adultos e o feitiço não deu muito dano neles.");
                    await escreverComEfeito("Os trasgos conseguiram te pegar e fizeram um ensopado com você.");
                    await escreverComEfeito("Que pena, pequeno bruxo. Realmente acreditei em você. Vamos lá, tente mais uma vez.");
                    // Define a vida do bruxo como 0 (derrota)
                    this.bruxo.vida = 0;
                    return; // Encerra o método iniciar
                case 3:
                    // Mensagem se o jogador escolheu Wingardium Leviosa
                    await escreverComEfeito("Genial, você conseguiu deixá-los flutuando.");
                    await escreverComEfeito("Você passa pelos trasgos com tranquilidade e consegue pegar alguns galeões que caíram no chão.");
                    // Aumenta os galeões do bruxo
                    this.bruxo.galeoes += 20;
                    // Exibe o status do bruxo
                    this.bruxo.status();
                    venceu = true; // Define que o jogador venceu
                    break;
                default:
                    // Mensagem se o jogador escolheu uma opção inválida
                    await escreverComEfeito("Escolha inválida. Por favor, escolha entre 1, 2 ou 3.");
            }
        }

        // Verifica se o bruxo ainda tem vida após o encontro com os trolls
        if (this.bruxo.vida > 0) {  
            await this.proximaFase(); // Chama o método para a próxima fase
        }
    }

    // Método para prosseguir para a próxima fase após o encontro com os trolls
    async proximaFase() {
        await escreverComEfeito("\nVocê superou o desafio dos trasgos e agora pode continuar seu caminho.");
        await escreverComEfeito("Você avista de longe um grande homem muito peludo.");
        await escreverComEfeito("Vá até ele, é o HAGRID.");
        // Define a propriedade encontrouHagrid do bruxo como true
        this.bruxo.encontrouHagrid = true;
        // Cria uma nova instância de EncontroHagrid e inicia o encontro
        const encontroHagrid = new EncontroHagrid(this.bruxo);
        await encontroHagrid.iniciar();
    }
}

module.exports = EncontroTrolls;
