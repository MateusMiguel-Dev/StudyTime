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
    ];


    let currentQuestionIndex = 0;
    let currentRound = 1;
    let score = 0;
    let roundQuestions = [];
    const rounds = 5;
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

    // Sorteia perguntas sem repetição
    function getRandomQuestions() {
        let shuffled = [...questions].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, questionsPerRound);
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