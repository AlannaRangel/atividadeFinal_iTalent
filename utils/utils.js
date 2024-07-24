function escreverComEfeito(texto, velocidade = 75) {
    return new Promise((resolve) => {
        // Verifica se o texto é uma string, se não for, define como uma string vazia
        if (typeof texto !== 'string') {
            texto = ''; // Se o texto não for uma string, use uma string vazia
        }

        let i = 0; // Inicializa o índice para percorrer os caracteres do texto
        const intervalo = setInterval(() => {
            process.stdout.write(texto.charAt(i));
            i++; // Incrementa o índice para o próximo caractere
            if (i >= texto.length) { // Verifica se toda a mensagem foi escrita
                clearInterval(intervalo); // Limpa o intervalo para parar a execução
                console.log(); 
                resolve(); // Resolve a Promise quando o texto é completamente exibido
            }
        }, velocidade);
    });
}

module.exports = escreverComEfeito;
