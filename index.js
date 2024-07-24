const prompt = require("prompt-sync")();
const Bruxo = require("./personagem/bruxo");
const EncontroTrolls = require("./encontros/encontroTrolls");
const EncontroHagrid = require("./encontros/encontroHagrid"); 
const LojaPocoes = require("./utils/loja");
const EncontroSereias = require("./encontros/encontroSereias");
const EncontroVoldemort = require("./encontros/encontroVoldemort");
const EncontroDumbledore = require("./encontros/encontroDumbledore");
const escreverComEfeito = require("./utils/utils");


// Função para fazer uma pergunta ao usuário e obter uma resposta 'Sim' ou 'Não'.
async function perguntarSimNao(mensagem) {
    let resposta;
    do {
        await escreverComEfeito(mensagem); // Exibe a mensagem passada como parâmetro com o efeito de digitação.
        resposta = prompt("(1. Sim / 2. Não): ");
        if (resposta !== "1" && resposta !== "2") { // Verifica se a resposta é válida (1 ou 2)
            await escreverComEfeito("Resposta inválida. Por favor, selecione '1' para Sim ou '2' para Não.");
        }
    } while (resposta !== "1" && resposta !== "2");
    // Retorna true se a resposta for '1' (Sim), caso contrário, retorna false
    return resposta === "1";
}

// Função para fazer uma pergunta ao usuário com múltiplas opções
async function perguntarOpcao(mensagem, opcoes) {
    let resposta;
    // Cria uma string com as opções formatadas para exibição.
    const opcoesMensagem = opcoes.map((opcao, index) => `${index + 1}. ${opcao}`).join("\n");
    do {
        await escreverComEfeito(mensagem);
        await escreverComEfeito(opcoesMensagem);
        // Obtém a resposta do usuário e a converte para um número inteiro.
        resposta = parseInt(prompt("Escolha uma opção: "), 10);
        if (isNaN(resposta) || resposta < 1 || resposta > opcoes.length) {
            await escreverComEfeito("Resposta inválida. Por favor, selecione uma das opções.");
        }
    } while (isNaN(resposta) || resposta < 1 || resposta > opcoes.length);
    // Retorna a resposta válida do usuário
    return resposta;
}

//Função para iniciar o jogo.
async function iniciarJogo() {
    // Exibe mensagens introdutórias com efeito de digitação
    await escreverComEfeito("Bem-vindo ao mundo bruxo.");
    await escreverComEfeito();
    await escreverComEfeito("Este mundo é baseado no mundo fictício de Harry Potter, portanto, personagens familiares serão encontrados.");
    await escreverComEfeito("Você terá um guia, ele não é muito amigável de início, mas espero que vocês se entendam. Boa sorte!");
    await escreverComEfeito();
    await escreverComEfeito("- HAHAHAHAHA, sempre é divertido ver esses mestiços tentarem... ops, parece que está chegando mais um.");
    await escreverComEfeito("- Ora ora, espero que não faça eu perder meu tempo com bobagens.");

    if (!await perguntarSimNao("- Está preparado?")) {
        await escreverComEfeito("- Mais um trouxa com curiosidade crônica. Passar bem!");
        return;
    }

    let nome = "";
    while (!nome) {
        nome = prompt("- Muito bem, me diga, qual o seu nome? ");
        if (!nome) {
            await escreverComEfeito("- Não aceitamos respostas vazias. Por favor, diga seu nome.");
        }
    }

    const casa = await perguntarOpcao(
        "- E a casa que acha que pertence?",
        ["Grifinória", "Sonserina", "Lufa-Lufa", "Corvinal"]
    );

    // Cria uma instância do personagem 'Bruxo' com os atributos iniciais
    const casas = ["Grifinória", "Sonserina", "Lufa-Lufa", "Corvinal"];
    const bruxo = new Bruxo(100, nome, casas[casa - 1], 50, 1);

    // Exibe o status inicial do bruxo
    await escreverComEfeito();
    await bruxo.status();
    await escreverComEfeito();

    await escreverComEfeito("- Agora que já sei quem é você, iremos iniciar a sua aventura.");
    await escreverComEfeito("- Pela frente encontrará grandes desafios.");
    await escreverComEfeito("- Terríveis, sim... mas grandes.");
    await escreverComEfeito("- Não espere muito de mim, tenho apenas uma varinha velha para te oferecer de ajuda.");
    await escreverComEfeito();
    await escreverComEfeito("Após uma pequena caminhada...");
    await escreverComEfeito("- Desse ponto você segue sozinho. Boas aventuras.");
    await escreverComEfeito("- Com certeza será divertido. Pelo menos para mim! HAHAHAHA.");
    await escreverComEfeito();
    await escreverComEfeito("Logo após o início da caminhada você se vê à frente de dois caminhos.");
    await escreverComEfeito();


    // Pergunta ao usuário qual caminho ele deseja seguir
    const caminho = await perguntarOpcao(
        "Escolha um caminho:",
        ["Caminho Iluminado", "Floresta Proibida"]
    );

    // Lógica para o caminho escolhido pelo usuário
    if (caminho === 1) {
        await escreverComEfeito();
        await escreverComEfeito("Precaução as vezes é a melhor escolha, mas não dessa vez.");
        await escreverComEfeito("Você encontrou com dois trasgos da montanha.");
        const encontroTrolls = new EncontroTrolls(bruxo);
        await encontroTrolls.iniciar();
    } else {
        await escreverComEfeito();
        await escreverComEfeito("Você escolheu a floresta proibida.");
        await escreverComEfeito("Estupidez ou coragem?!");
        await escreverComEfeito("Coragem ou não, você deu sorte e encontrou com o amigável Dobby.");
        await escreverComEfeito();
        await escreverComEfeito(`- ${nome}, muito cuidado, nem sempre você terá sorte de encontrar ajuda.`);
        await escreverComEfeito("- Irei fazer um feitiço de invisibilidade para que possa passar pela floresta com tranquilidade.");
        await escreverComEfeito("- Boa sorte, meu querido amigo. Cuidado com suas escolhas.");
        await escreverComEfeito();
    }

    // Verifica se Hagrid foi encontrado antes de chamar
    if (bruxo.vida > 0 && !bruxo.encontrouHagrid) {
        await escreverComEfeito("Após uma longa caminhada floresta adentro, você avista uma criatura enorme e cheia de pelos.");
        await escreverComEfeito("É o HAGRID.");
        await escreverComEfeito();
        const encontroHagrid = new EncontroHagrid(bruxo);
        await encontroHagrid.iniciar();
    }

    // Continua a aventura se o bruxo ainda tiver vida
    if (bruxo.vida > 0) {
        await escreverComEfeito("Após o encontro com o grandalhão você muito satisfeito seguiu seu caminho.");
        await escreverComEfeito("Mas parou ao ver uma pequena loja cheia de frascos na vitrine e resolveu entrar.");
        await escreverComEfeito("Ao entrar na loja viu que se tratava de uma loja de poções.");
        const lojaPocoes = new LojaPocoes(bruxo);
        await lojaPocoes.iniciar();
    }

    if (bruxo.vida > 0) {
        await escreverComEfeito();
        await escreverComEfeito("Já anoiteceu e você vê de longe um pequeno lago.");
        await escreverComEfeito("Não sabe ao certo o que te atraiu para direção daquele lago mas se vê caminhando em direção do mesmo.");
        await escreverComEfeito();
        await escreverComEfeito("Você se sente um pouco zonzo. Mas continua caminhando.");
        await escreverComEfeito();
        const encontroSereias = new EncontroSereias(bruxo);
        await encontroSereias.iniciar();
    }


    if (bruxo.vida > 0) {
        await escreverComEfeito("Você então resolve seguir caminho para Hogwarts.");
        await escreverComEfeito("Esperando que lá tenha uma cama quentinha e comida.");
        await escreverComEfeito();
        await escreverComEfeito("Resolve então voltar pelo caminho da floresta proibida...");
        await escreverComEfeito();
        await escreverComEfeito("Infelizmente dessa vez você não teve sorte.");
        await escreverComEfeito("Uma criatura conhecida estava a sua espera.");
        await escreverComEfeito();
        const encontroVoldemort = new EncontroVoldemort(bruxo);
        await encontroVoldemort.iniciar();
    }

        // Verifica se o bruxo venceu ou perdeu a batalha final
    if (bruxo.vida > 0) {
        await escreverComEfeito("\nParabéns! Você completou sua jornada.");
        const encontroDumbledore= new EncontroDumbledore(bruxo);
        await encontroDumbledore.iniciar();
    }
}

iniciarJogo();
