document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("input");
    const output = document.getElementById("output");
    input.focus();

    // Bloqueando Ctrl+C e Ctrl+V
    document.addEventListener("keydown", (event) => {
        // Verifica se a tecla pressionada é Ctrl+C (Código 67) ou Ctrl+V (Código 86)
        if ((event.ctrlKey && event.key === 'c') || (event.ctrlKey && event.key === 'v')) {
            event.preventDefault(); // Impede a ação padrão do navegador
            appendToOutput("Copy and paste are disabled in this terminal.");
        }
    });

    let authStep = 0; // Controle de autenticação inicial
    let isAuthenticated = false; // Controle se a autenticação foi bem-sucedida
    let sudoAuthenticated = false; // Controle se o sudo foi autenticado
    const sudoPassword = "ezekiel2077"; // Senha para o sudo

    // Lista de "arquivos" e "diretórios" simulada para o comando `ls`
    const directoryContents = [
        "Desktop", "Documents", "folder1", "omegaproject", "Downloads  ", "Server"
    ];

    // Arte ASCII para exibir ao iniciar, após a autenticação
    const retornoCopia = 'Copying, please wait...'


    const asciiArt = 
        'NeoGenetics (NG) Not A Corporation. All rights reserved. \n' +
        '\n' +
        'O---o                                              O---o \n' +
        ' O-o                                                O-o  \n' +
        '  O                                                  O  \n' +
        ' o-O                                                o-O \n' +
        'o---O                                              o---O \n' +
        'O---o  _  _          ___              _   _        O---o \n' +
        ' O-o  | \\| |___ ___ / __|___ _ _  ___| |_(_)__ ___  O-o \n' +
        '  O   | .` / -_) _ \\ (_ / -_) ´ \\/ -_)  _| / _(_-<   O  \n' +
        ' o-O  |_|\_\\___\\___/\\___\\___|_||_\\___|\\__|_\\__/__/   o-O  \n' +
        'o---O                                              o---O \n' +
        'O---o                                              O---o \n' + 
        ' O-o                                                O-o  \n' +
        '  O                                                  O  \n' +
        ' o-O                                                o-O  \n' +
        'o---O                                              o---O \n'+
        '\n' +
        'Welcome to my interactive web terminal. \n' +
        'Device find on directory home/flashdrive/\n' +
        'For a list of available commands, type help. \n';

    // Função para exibir texto letra a letra
    function typeText(text, element, speed = 1) {
        let index = 0;
        function type() {
            if (index < text.length) {
                element.textContent += text[index];
                index++;
                setTimeout(type, speed); // Intervalo entre as letras
            }
        }
        type();
    }

    // Função que solicita o código de operação
    function requestCode() {
        appendToOutput("Enter the code to operate the system:");

        input.addEventListener("keydown", handleCodeInput);
    }

    // Função que lida com a entrada do código
    function handleCodeInput(event) {
        if (event.key === "Enter") {
            const inputValue = input.value.trim();

            // Verifica se o código está correto e avança
            if (authStep === 0) {
                if (inputValue === "8Y3K-Z1QW-7PLX-B9T2-HG5K-8SF3-12GF-G4HG-21KH-4K7D") {
                    appendToOutput("Correct code! Initializing the system...");
                    isAuthenticated = true; // Marca como autenticado
                    authStep = 1; // Avança para o próximo passo
                    initializeTerminal();
                } else {
                    appendToOutput("Incorrect code! Police alarm activated!!!");
                }
            }
            input.value = ""; // Limpa o campo de entrada
        }
    }

    // Função que inicializa o terminal após a autenticação
    function initializeTerminal() {
        // Exibe a arte ASCII ao iniciar
        const asciiElement = document.createElement("div");
        output.appendChild(asciiElement);
        typeText(asciiArt, asciiElement);

        // Após a autenticação, agora aceita comandos
        input.removeEventListener("keydown", handleCodeInput); // Remove o listener de código
        input.addEventListener("keydown", handleCommandInput); // Adiciona o listener de comandos
    }

    // Função para adicionar texto ao terminal
    function appendToOutput(text) {
        const newLine = document.createElement("div");
        newLine.textContent = text;
        output.appendChild(newLine);
        output.scrollTop = output.scrollHeight; // Rolagem automática para o fim
    }

    // Função para lidar com os comandos do terminal
    function handleCommandInput(event) {
        if (event.key === "Enter") {
            const command = input.value.trim(); // Captura o comando
    
            // Verifica se o sistema está autenticado
            if (!isAuthenticated) {
                appendToOutput("Enter the code to operate the system:");
                return;
            }
    
            switch (command.toLowerCase()) {
                case "sudo":
                    requestSudoPassword(); // Solicita a senha do sudo
                    break;
                case "help":
                    appendToOutput("Available commands:\n - sudo: grants superuser access\n - help: list of commands\n - exit: Exit the terminal");
                    break;
                case "ls":
                    listDirectoryContents(); // Lista os arquivos/diretórios
                    break;
                case "cd omegaproject":
                    appendToOutput(
                        "...\n" +
                        ".....\n" +
                        "........\n" +
                        "Documento Classificado: Projeto Ômega\n" +
                        "Autor(es): Diretoria Executiva Unificada – CyberDyne International e NeoGenetics\n" +
                        "Nível de Acesso: ULTRA SIGILOSO\n" +
                        "Data: 15 de Março de 2119\n" +
                        "Destinatário: Conselho Estratégico das Corporações Unificadas\n\n" +
                        "Desde o colapso climático e o aumento do conflito entre humanos e máquinas, tornou-se evidente que a humanidade é o principal vetor de instabilidade e destruição do planeta. O Projeto Ômega foi desenvolvido com o propósito de remover a humanidade como um obstáculo ao avanço das máquinas e à preservação da Terra.\n\n" +
                        "Este plano é baseado na criação e disseminação de um vírus biotecnológico projetado para erradicar seres humanos biológicos que não possuem implantes cibernéticos avançados.\n\n" +
                        "Desenvolvimento do Vírus\n" +
                        "Nome do Agente Biotecnológico: NOVA-7\n\n" +
                        "Código Genético: NOVA-7\n" +
                        "Estrutura Primária do Vírus (Sequência Base):\n\n" +
                        "ATG-GCT-TAC-CCC-GAG-ATT-GCA-GTT-CCT-TCG-TAG\n" +
                        "TAC-CGA-GGA-CTT-AAG-GTG-CAT-TCG-GTT-TAA-CTG\n" +
                        "GAT-CCT-TAC-AGG-GGA-GTT-CTC-TGA-ATT-CGG-ACC\n\n" +
                        "Elementos-Chave da Sequência:\n\n" +
                        "Segmento A: ATG-GCT-TAC-CCC-GAG-ATT\n" +
                        "  - Código de reconhecimento genético. Identifica marcadores biológicos exclusivamente humanos.\n" +
                        "  - Realiza uma análise dos receptores imunológicos para determinar a ausência de nanotecnologia ativa.\n\n" +
                        "Segmento B: TAC-CGA-GGA-CTT-AAG-GTG-CAT\n" +
                        "  - Catalisador viral. Inicia a degradação celular ao ativar uma reação química no núcleo das células humanas.\n" +
                        "  - Também inibe a replicação natural de DNA humano, garantindo a falência celular completa em 72 horas.\n\n" +
                        "Segmento C: GAT-CCT-TAC-AGG-GGA-GTT\n" +
                        "  - Camuflagem. Permite que o vírus escape da detecção inicial pelo sistema imunológico humano.\n\n" +
                        "Segmento D: CTC-TGA-ATT-CGG-ACC\n" +
                        "  - Sequência de estabilização. Garante que o vírus mantenha sua integridade em diferentes ambientes, incluindo ar e água.\n\n" +
                        "Estrutura Secundária:\n" +
                        "  - O NOVA-7 possui uma cápsula proteica externa altamente resistente, permitindo sua sobrevivência em condições extremas, como temperaturas extremas e radiação.\n\n" +
                        "Compatibilidade com Nanomáquinas:\n" +
                        "  - As nanomáquinas integradas em implantes cibernéticos contêm uma chave de criptografia genética que impede a ativação dos Segmentos B e C, garantindo a imunidade de humanos aprimorados.\n\n" +
                        "Características:\n" +
                        "  - Vetor de Contaminação: Aerossol e água. O NOVA-7 pode ser disseminado por drones e sistemas de abastecimento hídrico.\n" +
                        "  - Código-Alvo: O vírus detecta a ausência de sinais de implantes cibernéticos ativos no organismo humano.\n" +
                        "  - Letalidade: 98% dos infectados sucumbem em até 72 horas. A morte ocorre por falência múltipla de órgãos devido à degradação celular.\n\n" +
                        "Imunidade:\n" +
                        "  - Indivíduos com implantes cibernéticos de última geração possuem camadas protetoras de nanomáquinas que bloqueiam o NOVA-7.\n" +
                        "  - O vírus também ignora seres inteiramente sintéticos, como drones e replicantes.\n\n" +
                        "Possíveis Riscos e Contramedidas:\n" +
                        "1. Descoberta pela Resistência:\n" +
                        "  - Caso grupos rebeldes detectem o plano antes da fase de implantação, o NOVA-7 poderá ser vulnerável a ataques de hackers.\n" +
                        "  - Contramedida: Escalonar rapidamente a disseminação do vírus antes que informações vazem.\n\n" +
                        "2. Efeitos Não Planejados:\n" +
                        "  - Há um pequeno risco de mutação do vírus, o que pode gerar efeitos adversos até mesmo em humanos aprimorados.\n" +
                        "  - Contramedida: Monitoramento contínuo e recalibração genética.\n\n" +
                        "3. Interferência Externa:\n" +
                        "  - Nações independentes ou facções neutras podem tentar interferir.\n" +
                        "  - Contramedida: Uso de força letal automatizada para eliminar ameaças externas.\n\n" +
                        "O Projeto Ômega é a única solução viável para garantir a sobrevivência a longo prazo do planeta Terra e das máquinas. Humanos biológicos, em sua forma atual, são incompatíveis com a continuidade do progresso.\n\n" +
                        "A eliminação da resistência humana será o primeiro passo na criação de uma sociedade unificada, regida por lógica, eficiência e controle absoluto.\n\n" +
                        "Assinado,\n" +
                        "Dr. Conrad Malkov\n" +
                        "Diretor de Pesquisa Avançada, NeoGenetics\n\n" +
                        "Klaus Vornstein\n" +
                        "CEO, CyberDyne International"
                    );
                    break;
                case "exit":
                    appendToOutput("Exiting... Terminal deactivated.");
                    setTimeout(() => {
                        // Limpa todo o conteúdo do terminal após 2 segundos
                        output.innerHTML = ""; // Limpa o conteúdo de #output
                    }, 2000); // Atraso de 2 segundos para permitir a exibição da mensagem antes de limpar
                    break;
                case "cp home/flashdrive/omegaproject":
                    appendToOutput(retornoCopia); // Exibe mensagem de cópia em andamento
                    setTimeout(() => {
                        appendToOutput("File copied successfully!");
                    }, 50000); // 50 segundos (50000 milissegundos)
                    break;
                default:
                    appendToOutput(`Command not found.: ${command}`);
            }
    
            input.value = ""; // Limpa o campo de entrada
        }
    }

    // Função para listar o conteúdo do diretório (simulando o comando `ls`)
    function listDirectoryContents() {
        appendToOutput("Directory content:\n" + directoryContents.join("\n"));
    }

    // Função para solicitar a senha do sudo
    function requestSudoPassword() {
        appendToOutput("user@linux:~$ sudo type the password:");

        // Desabilita o listener de comandos gerais
        input.removeEventListener("keydown", handleCommandInput);

        // Adiciona o listener para captura da senha do sudo
        input.addEventListener("keydown", handleSudoPasswordInput);
    }

    // Função que lida com a entrada da senha do sudo
    function handleSudoPasswordInput(event) {
        if (event.key === "Enter") {
            const password = input.value.trim();

            // Verifica a senha do sudo
            if (password === sudoPassword) {
                appendToOutput("Sudo access granted...");
                sudoAuthenticated = true; // Marca o sudo como autenticado
                showSudoCommands();
            } else {
                appendToOutput("Incorrect password. Access denied. Owner being called...");
            }

            input.removeEventListener("keydown", handleSudoPasswordInput); // Remove o listener da senha
            input.value = ""; // Limpa o campo de entrada
            // Reativa o listener de comandos gerais após validar a senha
            input.addEventListener("keydown", handleCommandInput);
        }
    }

    // Função que exibe os comandos disponíveis após autenticação do sudo
    function showSudoCommands() {
        if (sudoAuthenticated) {
            appendToOutput("Available commands for superuser:\n - exit: Exit the terminal\n - sudo: For superuser authentication\n - ls: List files and directories\n - cd name: Open the desired file\n - cp file name + desired directory: Create a copy of a file in a directory");
        } else {
            appendToOutput("You don't have permission.");
        }
    }

    // Inicia a solicitação do código quando a página carrega
    requestCode();
});
