document.addEventListener('DOMContentLoaded', function() {
    function changeTheme(color) {
        document.body.classList.remove('blue', 'green', 'pink', 'purple');
        document.querySelector('.quiz_section').classList.remove('blue', 'green', 'pink', 'purple');
        const quizSection = document.querySelector('.quiz_section');

        switch(color) {
            case 'blue':
                document.querySelector('.quiz_section').classList.add('blue');
                document.querySelectorAll('.second_section .report-item').forEach(item => item.classList.add('blue'));
                quizSection.style.backgroundImage = 'url("../img/bg_2.png")'; 
                articleBorderColor = '#007bff'; 
                break;
            case 'green':
                document.querySelector('.quiz_section').classList.add('green');
                document.querySelectorAll('.second_section .report-item').forEach(item => item.classList.add('green'));
                quizSection.style.backgroundImage = 'url("../img/bg_3.png")'; 
                articleBorderColor = '#28a745'; 
                break;
            case 'pink':
                document.querySelector('.quiz_section').classList.add('pink');
                document.querySelectorAll('.second_section .report-item').forEach(item => item.classList.add('pink'));
                quizSection.style.backgroundImage = 'url("../img/bg_4.png")';
                articleBorderColor = '#e866a7'; // Cor rosa para a borda do artigo 
                break;
            default: // Caso o usuário não escolha uma cor, aplica o roxo por padrão
                document.querySelector('.quiz_section').classList.add('purple');
                document.querySelectorAll('.second_section .report-item').forEach(item => item.classList.add('purple'));
                quizSection.style.backgroundImage = 'url("../img/bg_1.png")'; 
                articleBorderColor = '#80229f'; // Cor roxa para a borda do artigo
        }
        const articles = document.querySelectorAll('.jogos-info');
        articles.forEach(article => {
            article.style.borderTopColor = articleBorderColor; // Muda a borda superior do artigo
        });
        // Salvar a escolha no localStorage
        localStorage.setItem('selectedTheme', color);
    }

    // Verificar se há uma cor salva no localStorage e aplicar
    const savedColor = localStorage.getItem('selectedTheme');
    if (savedColor) {
        changeTheme(savedColor); // Aplica a cor salva
    } else {
        changeTheme('purple'); // Se não houver cor salva, aplica o roxo por padrão
    }

    // Adiciona evento de clique para mudar a cor
    const colorOptions = document.querySelectorAll('.color-option');
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            const color = this.style.backgroundColor;
            if (color === 'rgb(128, 34, 159)') { // Roxo
                changeTheme('purple');
            } else if (color === 'rgb(0, 123, 255)') { // Azul
                changeTheme('blue');
            } else if (color === 'rgb(40, 167, 69)') { // Verde
                changeTheme('green');
            } else if (color === 'rgb(255, 105, 180)') { // Rosa
                changeTheme('pink');
            }
        });
    });
    const questions = [
        { question: "Qual é o maior planeta do sistema solar?", answers: ["Terra", "Marte", "Júpiter", "Saturno"], correct: 2 },
        { question: "Quem pintou a Mona Lisa?", answers: ["Michelangelo", "Leonardo da Vinci", "Picasso", "Van Gogh"], correct: 1 },
        { question: "Qual é a capital da França?", answers: ["Berlim", "Madrid", "Roma", "Paris"], correct: 3 },
        { question: "Qual é o continente onde está localizado o Egito?", answers: ["África", "América", "Europa", "Ásia"], correct: 0 },
        { question: "Qual é a fórmula da água?", answers: ["H2O", "O2", "CO2", "NaCl"], correct: 0 },
        { question: "Quem escreveu 'Dom Casmurro'?", answers: ["Machado de Assis", "José de Alencar", "Clarice Lispector", "Jorge Amado"], correct: 0 },
        { question: "Qual é o elemento químico representado pela letra O?", answers: ["Ouro", "Oxigênio", "Ósmio", "Ozônio"], correct: 1 },
        { question: "Qual é a capital do Japão?", answers: ["Pequim", "Seul", "Tóquio", "Bangkok"], correct: 2 },
        { question: "Qual é a moeda do Brasil?", answers: ["Dólar", "Real", "Euro", "Peso"], correct: 1 },
        { question: "Quem foi o primeiro presidente dos Estados Unidos?", answers: ["George Washington", "Thomas Jefferson", "Abraham Lincoln", "John Adams"], correct: 0 },
        { question: "Qual é a língua oficial do Brasil?", answers: ["Espanhol", "Português", "Inglês", "Francês"], correct: 1 },
        { question: "Qual é o símbolo químico do ferro?", answers: ["Fe", "Ir", "F", "Fr"], correct: 0 },
        { question: "Qual é a capital da Itália?", answers: ["Milão", "Roma", "Veneza", "Florença"], correct: 1 },
        { question: "Qual é a cor do cavalo branco de Napoleão?", answers: ["Preto", "Marrom", "Branco", "Cinza"], correct: 2 },
        { question: "Quem escreveu 'O Senhor dos Anéis'?", answers: ["George R. R. Martin", "J. K. Rowling", "J. R. R. Tolkien", "C. S. Lewis"], correct: 2 },
        { question: "Qual é o planeta mais próximo do sol?", answers: ["Vênus", "Terra", "Mercúrio", "Marte"], correct: 2 },
        { question: "Qual é o maior oceano do mundo?", answers: ["Oceano Atlântico", "Oceano Índico", "Oceano Pacífico", "Oceano Ártico"], correct: 2 },
        { question: "Qual é a capital da Espanha?", answers: ["Barcelona", "Madrid", "Valência", "Sevilha"], correct: 1 },
        { question: "Quantos continentes existem?", answers: ["5", "6", "7", "8"], correct: 2 },
        { question: "Qual é a montanha mais alta do mundo?", answers: ["K2", "Kangchenjunga", "Everest", "Lhotse"], correct: 2 },
        { question: "Qual é a forma mais comum de energia renovável?", answers: ["Carvão", "Petróleo", "Solar", "Nuclear"], correct: 2 },
        { question: "Qual é o nome do famoso físico que desenvolveu a teoria da relatividade?", answers: ["Isaac Newton", "Galileu Galilei", "Albert Einstein", "Nikola Tesla"], correct: 2 },
        { question: "Qual é a capital da Alemanha?", answers: ["Berlim", "Munique", "Frankfurt", "Hamburgo"], correct: 0 },
        { question: "Qual é a capital de Portugal?", answers: ["Lisboa", "Porto", "Coimbra", "Braga"], correct: 0 },
        { question: "Qual é a unidade de medida da força?", answers: ["Joule", "Newton", "Pascal", "Watt"], correct: 1 },
        { question: "Qual é a principal função dos glóbulos vermelhos no sangue?", answers: ["Defesa do organismo", "Transporte de oxigênio", "Coagulação", "Transporte de nutrientes"], correct: 1 },
        { question: "Qual é a maior floresta do mundo?", answers: ["Floresta Amazônica", "Floresta de Taiga", "Floresta Tropical", "Floresta de Bambu"], correct: 0 },
        { question: "Quem foi o autor da obra 'A Divina Comédia'?", answers: ["Virgílio", "Dante Alighieri", "Boccaccio", "Cervantes"], correct: 1 },
        { question: "Qual é a capital da Rússia?", answers: ["São Petersburgo", "Moscovo", "Kiev", "Minsk"], correct: 1 },
        { question: "Qual é a cor do sangue venoso?", answers: ["Vermelho", "Azul", "Verde", "Amarelo"], correct: 1 },
        { question: "Quem é o deus grego da guerra?", answers: ["Zeus", "Hades", "Ares", "Poseidon"], correct: 2 },
        { question: "Qual é a capital da Índia?", answers: ["Bombaim", "Nova Délhi", "Calcutá", "Chennai"], correct: 1 },
        { question: "Qual é o principal gás do efeito estufa?", answers: ["Oxigênio", "Dióxido de carbono", "Metano", "Nitrato"], correct: 1 },
        { question: "Qual é a maior cidade do mundo em população?", answers: ["Tóquio", "Nova Iorque", "São Paulo", "Mumbai"], correct: 0 },
        { question: "Qual é o principal componente do ar?", answers: ["Oxigênio", "Nitrogênio", "Dióxido de carbono", "Argônio"], correct: 1 },
        { question: "Qual é o símbolo químico da água?", answers: ["O2", "H2O", "CO2", "NaCl"], correct: 1 },
        { question: "Qual é a principal religião do Japão?", answers: ["Cristianismo", "Budismo", "Hinduísmo", "Islamismo"], correct: 1 },
        { question: "Qual é o animal símbolo da Austrália?", answers: ["Canguru", "Coala", "Emu", "Dingo"], correct: 0 },
        { question: "Qual é a capital do Egito?", answers: ["Cairo", "Alexandria", "Lúxor", "Asuã"], correct: 0 },
        { question: "Quem foi a primeira mulher a ganhar um Prêmio Nobel?", answers: ["Marie Curie", "Rosalind Franklin", "Jane Goodall", "Ada Lovelace"], correct: 0 },
        { question: "Qual é a maior cadeia de montanhas do mundo?", answers: ["Cordilheira dos Andes", "Himalaias", "Alpes", "Montanhas Rochosas"], correct: 0 },
        { question: "Qual é o principal componente do DNA?", answers: ["Açúcar", "Fósforo", "Ácido desoxirribonucleico", "Ácido ribonucleico"], correct: 2 },
        { question: "Quem foi o primeiro presidente do Brasil?", answers: ["Deodoro da Fonseca", "Floriano Peixoto", "Getúlio Vargas", "Dom Pedro II"], correct: 0 },
        { question: "Qual é a fórmula do gás carbônico?", answers: ["CO", "CO2", "CH4", "O2"], correct: 1 },
        { question: "Qual é a capital da Austrália?", answers: ["Sydney", "Melbourne", "Brisbane", "Camberra"], correct: 3 },
        { question: "Quem escreveu 'Os Lusíadas'?", answers: ["Fernando Pessoa", "Luís de Camões", "José Saramago", "Eça de Queirós"], correct: 1 },
        { question: "Qual é o maior animal terrestre?", answers: ["Elefante", "Hipopótamo", "Rinoceronte", "Girafa"], correct: 0 },
        { question: "Qual é a moeda oficial do Japão?", answers: ["Dólar", "Yen", "Euro", "Won"], correct: 1 },
        { question: "Qual é a montanha mais alta das Américas?", answers: ["Everest", "Kilimanjaro", "Aconcágua", "Denali"], correct: 2 },
        { question: "Quem descobriu a penicilina?", answers: ["Alexander Fleming", "Louis Pasteur", "Marie Curie", "Joseph Lister"], correct: 0 },
        { question: "Qual país tem a maior população do mundo?", answers: ["Índia", "China", "Estados Unidos", "Indonésia"], correct: 1 },
        { question: "Qual é o nome do gas que respiramos?", answers: ["Hidrogênio", "Oxigênio", "Dióxido de Carbono", "Nitrogênio"], correct: 1 },
        { question: "Qual é o maior mamífero do mundo?", answers: ["Elefante", "Baleia Azul", "Orca", "Hipopótamo"], correct: 1 },
        { question: "Qual é a capital do Canadá?", answers: ["Toronto", "Ottawa", "Vancouver", "Montreal"], correct: 1 },
        { question: "Quem foi o autor de 'O Pequeno Príncipe'?", answers: ["Jules Verne", "Victor Hugo", "Antoine de Saint-Exupéry", "Gustave Flaubert"], correct: 2 },
        { question: "Quantos planetas existem no sistema solar?", answers: ["7", "8", "9", "10"], correct: 1 },
        { question: "Qual é a cor da bandeira da ONU?", answers: ["Azul e Branco", "Verde e Branco", "Vermelho e Branco", "Amarelo e Branco"], correct: 0 },
        { question: "Qual é o nome do fenômeno causado pelo aquecimento global?", answers: ["Efeito de Cúpula", "Efeito Estufa", "Efeito Borboleta", "Efeito Térmico"], correct: 1 },
        { question: "Quem pintou 'A Última Ceia'?", answers: ["Leonardo da Vinci", "Michelangelo", "Raphael", "Caravaggio"], correct: 0 },
        { question: "Qual é o país com mais idiomas oficiais?", answers: ["Canadá", "Índia", "África do Sul", "Suíça"], correct: 1 },
        { question: "Quem foi o autor da teoria da evolução?", answers: ["Isaac Newton", "Albert Einstein", "Charles Darwin", "Galileu Galilei"], correct: 2 },
        { question: "Qual é o menor continente em extensão territorial?", answers: ["Europa", "Austrália", "Antártida", "América do Sul"], correct: 1 },
        { question: "Qual é o principal ingrediente do sushi?", answers: ["Carne", "Frango", "Arroz", "Batata"], correct: 2 },
        { question: "Qual é a capital do México?", answers: ["Monterrey", "Cancún", "Cidade do México", "Guadalajara"], correct: 2 },
        { question: "Quem foi o autor de 'Macbeth'?", answers: ["William Wordsworth", "William Shakespeare", "John Milton", "Geoffrey Chaucer"], correct: 1 },
        { question: "Qual é a velocidade do som no ar?", answers: ["343 m/s", "300 m/s", "400 m/s", "500 m/s"], correct: 0 },
        { question: "Qual é a molécula que transporta energia nas células?", answers: ["DNA", "ATP", "RNA", "NADH"], correct: 1 },
        { question: "Quem é conhecido como o 'pai da matemática'?", answers: ["Euclides", "Pitágoras", "Arquimedes", "René Descartes"], correct: 0 },
        { question: "Qual é o maior país em área territorial?", answers: ["Canadá", "China", "Rússia", "Estados Unidos"], correct: 2 },
        { question: "Qual é o estado brasileiro conhecido como 'terra da garoa'?", answers: ["Rio de Janeiro", "Minas Gerais", "São Paulo", "Paraná"], correct: 2 },
        { question: "Qual é o planeta chamado de 'Planeta Vermelho'?", answers: ["Marte", "Júpiter", "Vênus", "Mercúrio"], correct: 0 },
        { question: "Qual foi o primeiro filme da história?", answers: ["Viagem à Lua", "O Grande Roubo do Trem", "Cena dos Irmãos Lumière", "O Cantor de Jazz"], correct: 2 },
        { question: "Qual é o nome do maior satélite natural de Júpiter?", answers: ["Ganimedes", "Europa", "Io", "Calisto"], correct: 0 },
        { question: "Quem escreveu 'O Capital'?", answers: ["Karl Marx", "Adam Smith", "Friedrich Engels", "Jean-Jacques Rousseau"], correct: 0 },
        { question: "Qual é o principal metal presente no aço?", answers: ["Cobre", "Alumínio", "Ferro", "Níquel"], correct: 2 },
        { question: "Qual é a capital da Argentina?", answers: ["Buenos Aires", "Córdoba", "Rosário", "Mendoza"], correct: 0 },
        { question: "Qual é o maior satélite natural da Terra?", answers: ["Lua", "Phobos", "Europa", "Tritão"], correct: 0 },
        { question: "Qual é o oceano que banha a costa leste do Brasil?", answers: ["Pacífico", "Atlântico", "Índico", "Ártico"], correct: 1 },
        { question: "Qual é o órgão responsável por produzir insulina?", answers: ["Pâncreas", "Fígado", "Coração", "Estômago"], correct: 0 },
        { question: "Quem pintou 'Guernica'?", answers: ["Pablo Picasso", "Salvador Dalí", "Henri Matisse", "Claude Monet"], correct: 0 },
        { question: "Qual é o menor osso do corpo humano?", answers: ["Martelo", "Bigorna", "Estribo", "Fêmur"], correct: 2 },
        { question: "Qual é o metal mais utilizado na construção civil?", answers: ["Cobre", "Ferro", "Alumínio", "Zinco"], correct: 1 },
        { question: "Quem foi o primeiro homem a voar em um balão de ar quente?", answers: ["Joseph Montgolfier", "Jacques Charles", "Jean-François Pilâtre de Rozier", "André-Jacques Garnerin"], correct: 2 },
        { question: "Qual é a capital do Egito?", answers: ["Cairo", "Alexandria", "Luxor", "Giza"], correct: 0 },
        { question: "Qual elemento químico tem o símbolo 'Au'?", answers: ["Prata", "Cobre", "Ouro", "Alumínio"], correct: 2 },
        { question: "Qual é o maior deserto do mundo?", answers: ["Saara", "Gobi", "Antártida", "Kalahari"], correct: 2 },
        { question: "Quem pintou a Mona Lisa?", answers: ["Michelangelo", "Leonardo da Vinci", "Raphael", "Donatello"], correct: 1 },
        { question: "Qual é a principal língua falada no Brasil?", answers: ["Espanhol", "Português", "Inglês", "Francês"], correct: 1 },
        { question: "Quantos ossos tem o corpo humano adulto?", answers: ["206", "208", "210", "212"], correct: 0 },
        { question: "Qual é a capital da Alemanha?", answers: ["Hamburgo", "Berlim", "Munique", "Frankfurt"], correct: 1 },
        { question: "Quem desenvolveu a teoria da relatividade?", answers: ["Nikola Tesla", "Isaac Newton", "Albert Einstein", "Stephen Hawking"], correct: 2 },
        { question: "Qual é a moeda oficial do Reino Unido?", answers: ["Euro", "Dólar", "Libra Esterlina", "Franco"], correct: 2 },
        { question: "Qual é o menor planeta do sistema solar?", answers: ["Mercúrio", "Marte", "Plutão", "Vênus"], correct: 0 },
        { question: "Qual é o maior rio do mundo em volume de água?", answers: ["Nilo", "Mississipi", "Yangtzé", "Amazonas"], correct: 3 },
        { question: "Quem foi o líder da Revolução Russa de 1917?", answers: ["Leon Trotsky", "Vladimir Lenin", "Joseph Stalin", "Karl Marx"], correct: 1 },
        { question: "Qual é o nome da galáxia em que a Terra está localizada?", answers: ["Andrômeda", "Via Láctea", "Triângulo", "Centaurus A"], correct: 1 },
        { question: "Qual é o idioma mais falado no mundo?", answers: ["Inglês", "Espanhol", "Chinês", "Hindi"], correct: 2 },
        { question: "Quem foi o primeiro homem a pisar na Lua?", answers: ["Buzz Aldrin", "Neil Armstrong", "Yuri Gagarin", "Michael Collins"], correct: 1 },
        { question: "Qual é o estado brasileiro com maior produção de café?", answers: ["Espírito Santo", "São Paulo", "Bahia", "Minas Gerais"], correct: 3 },
        { question: "Qual é a camada mais externa da Terra?", answers: ["Manto", "Crosta", "Núcleo Externo", "Núcleo Interno"], correct: 1 },
        { question: "Quem foi o escritor de 'Dom Quixote'?", answers: ["Miguel de Cervantes", "Gabriel García Márquez", "Pablo Neruda", "Jorge Luis Borges"], correct: 0 },
        { question: "Qual animal é conhecido como 'o melhor amigo do homem'?", answers: ["Gato", "Cavalo", "Cachorro", "Pássaro"], correct: 2 },
        { question: "Qual foi o primeiro país a sediar uma Copa do Mundo?", answers: ["Brasil", "Uruguai", "Itália", "Alemanha"], correct: 1 },
    ];


    let currentQuestionIndex = 0;
    let currentRound = 1;
    let score = 0;
    let roundQuestions = [];
    const rounds = 5;
    let usedQuestions = []; 
    const questionsPerRound = 2;

    const questionContainer = document.getElementById('question-container');
    const answersContainer = document.getElementById('answers-container');
    const nextButton = document.getElementById('next-question');
    const scoreContainer = document.getElementById('score-container');
    const finalScore = document.getElementById('final-score');
    const trophy = document.getElementById('trophy');
    const feedbackContainer = document.createElement('div'); // Novo container para feedback
    feedbackContainer.id = 'feedback-container';
    questionContainer.appendChild(feedbackContainer);

    function getRandomQuestions() {
    const availableQuestions = questions.filter(
        (_, index) => !usedQuestions.includes(index)
    );
    const shuffled = availableQuestions.sort(() => 0.5 - Math.random());
    const selectedQuestions = shuffled.slice(0, questionsPerRound);

    // Adiciona os índices das perguntas selecionadas à lista de usadas
    selectedQuestions.forEach(question => {
        const questionIndex = questions.indexOf(question);
        usedQuestions.push(questionIndex);
    });

    return selectedQuestions;
}


    function showQuestion() {
        const currentQuestion = roundQuestions[currentQuestionIndex];
        questionContainer.innerHTML = `<h4>${currentQuestion.question}</h4>`;
        answersContainer.innerHTML = '';
        currentQuestion.answers.forEach((answer, index) => {
            const button = document.createElement('button');
            button.classList.add('btn', 'btn-primary', 'm-2');
            button.textContent = answer;
            button.addEventListener('click', () => checkAnswer(index, currentQuestion.correct));
            answersContainer.appendChild(button);
        });
        feedbackContainer.innerHTML = ''; // Limpa feedback antes da nova pergunta
        nextButton.style.display = 'none'; // Oculta o botão "Próximo" inicialmente
    }

    nextButton.addEventListener('click', () => {
        currentQuestionIndex++;
        feedbackContainer.innerHTML = ''; // Limpa feedback antes da próxima pergunta

        if (currentQuestionIndex < roundQuestions.length) {
            showQuestion();
        } else {
            currentRound++;
            if (currentRound <= rounds) {
                startRound();
            } else {
                endQuiz();
            }
        }
    });

    function startRound() {
        currentQuestionIndex = 0;
        roundQuestions = getRandomQuestions();
        showQuestion();
    }

    function endQuiz() {
        questionContainer.style.display = 'none';
        answersContainer.style.display = 'none';
        nextButton.style.display = 'none';
        scoreContainer.style.display = 'block';
        finalScore.textContent = `Parabéns! Você acertou ${score} de ${rounds * questionsPerRound} perguntas.`;
        trophy.style.display = 'block';
    }
    function checkAnswer(selected, correct) {
        feedbackContainer.innerHTML = ''; // Limpa feedback anterior
    
        const buttons = answersContainer.querySelectorAll('button'); // Seleciona todos os botões
    
        if (selected === correct) {
            score++;
            buttons[selected].style.backgroundColor = 'green'; // Marca a opção correta de verde
            buttons[selected].style.color = 'white';
        } else {
            buttons[selected].style.backgroundColor = 'red'; // Marca a opção errada de vermelho
            buttons[correct].style.backgroundColor = 'green'; // Marca a opção correta de verde
        }
    
        setTimeout(() => {
            // Reseta as cores dos botões para o estado original
            buttons.forEach(button => {
                button.style.backgroundColor = ''; // Reseta a cor do fundo
            });
            feedbackContainer.innerHTML = ''; // Limpa feedback antes da próxima pergunta
            currentQuestionIndex++;
            
            if (currentQuestionIndex < roundQuestions.length) {
                showQuestion();
            } else {
                currentRound++;
                if (currentRound <= rounds) {
                    startRound();
                } else {
                    endQuiz();
                }
            }
        }, 1000); // 2000 milissegundos = 2 segundos
    }
    
    startRound();
});
