let startTime = null;
let timerInterval = null;
const timerDisplay = document.getElementById('time');

document.addEventListener('DOMContentLoaded', () => {
    function changeTheme(color) {
        document.body.classList.remove('blue', 'green', 'pink', 'purple');
        document.querySelector('.memory-game-section').classList.remove('blue', 'green', 'pink', 'purple');
        const memoSection = document.querySelector('.memory-game-section');
        const title = document.querySelector('h2');
        let verso; 
        let textColor;
        switch(color) {
            case 'blue':
                document.querySelector('.memory-game-section').classList.add('blue');
                memoSection.style.backgroundImage = 'url("../img/bg_2.png")';
                verso = '../img/Cartas/verso.png'; // Verso azul
                textColor = '#007bff'; // Azul
                document.body.classList.add('blue');
                articleBorderColor = '#007bff'; 
                break;
            case 'green':
                document.querySelector('.memory-game-section').classList.add('green');
                memoSection.style.backgroundImage = 'url("../img/bg_3.png")';
                verso = '../img/Cartas/verso3.png'; // Verso verde
                textColor = '#28a745'; // Verde
                document.body.classList.add('green');
                articleBorderColor = '#28a745'; 
                break;
            case 'pink':
                document.querySelector('.memory-game-section').classList.add('pink');
                memoSection.style.backgroundImage = 'url("../img/bg_4.png")';
                verso = '../img/Cartas/verso4.png'; // Verso rosa
                textColor = '#ff69b4'; // Rosa
                document.body.classList.add('pink');
                articleBorderColor = '#e866a7'; // Cor rosa para a borda do artigo 
                break;
            default: // Caso o roxo seja o padrão
                document.querySelector('.memory-game-section').classList.add('purple');
                memoSection.style.backgroundImage = 'url("../img/bg_1.png")';
                verso = '../img/Cartas/verso2.png'; // Verso roxo
                textColor = '#80229f'; // Roxo
                document.body.classList.add('purple');
                articleBorderColor = '#80229f'; // Cor roxa para a borda do artigo
        }
        const articles = document.querySelectorAll('.jogos-info');
        articles.forEach(article => {
            article.style.borderTopColor = articleBorderColor; // Muda a borda superior do artigo
        });
        localStorage.setItem('selectedTheme', color);
        localStorage.setItem('cardBack', verso); // Salva o caminho da imagem do verso no localStorage

        if (title) {
            title.style.color = textColor;
        }

        const cards = document.querySelectorAll('.memory-card');
        cards.forEach(card => {
            const backFace = card.querySelector('.back-face');
            if (backFace) {
                backFace.src = verso; 
            }
        });
    
    const startScreen = document.getElementById('start-screen');
    const memoryGameSection = document.querySelector('.memory-game-section');
    const bgGame = document.getElementById('bg-memory');
    const startButton = document.getElementById('start-button');
    const easyButton = document.getElementById('easy-button');
    const hardButton = document.getElementById('hard-button');
    const memorySpace = document.querySelector('.memory-game');
    let originalVerso = localStorage.getItem('cardBack') || '../img/Cartas/verso.png';

    let selectedDifficulty = null;

    // Inicializa a tela de jogo como oculta
    memoryGameSection.style.display = 'none';

    // Evento para iniciar o jogo
    startButton.addEventListener('click', () => {
        if (selectedDifficulty) {
            startGame(selectedDifficulty === 'easy' ? 6 : 12);
        }
    });

    // Definindo a dificuldade e habilitando o botão iniciar
    easyButton.addEventListener('click', () => {
        selectedDifficulty = 'easy';
        enableStartButton();
    });

    hardButton.addEventListener('click', () => {
        selectedDifficulty = 'hard';
        enableStartButton();
    });

    function enableStartButton() {
        startButton.disabled = false; 
        easyButton.disabled = true;    
        hardButton.disabled = true;
    }
    function startGame(pairCount) {
        startScreen.style.display = 'none'; 
        memoryGameSection.style.display = 'block'; 
        bgGame.style.display = 'block';
    
        if (pairCount === 6) {
            memorySpace.classList.add('small'); 
        } else {
            memorySpace.classList.remove('small'); 
        }
    
        const backFaces = document.querySelectorAll('.memory-card .back-face');
        backFaces.forEach(backFace => {
            backFace.style.display = 'block'; 
        });
    
        initializeGame(pairCount);
        startTimer(); 
    }
    
    function initializeGame(pairCount) {
        const selectedCardsArray = cardsArray.slice(0, pairCount).concat(cardsArray.slice(0, pairCount)).sort(() => 0.5 - Math.random());
        memorySpace.innerHTML = '';
        selectedCardsArray.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('memory-card');
            card.dataset.name = item.name;

            const frontFace = document.createElement('img');
            frontFace.classList.add('front-face');
            frontFace.src = item.img;

            const backFace = document.createElement('img');
            backFace.classList.add('back-face');
            backFace.src = localStorage.getItem('cardBack') || '../img/Cartas/verso.png';
            backFace.style.display = 'block'; 

            card.appendChild(frontFace);
            card.appendChild(backFace);
            memorySpace.appendChild(card);
        });
        const cards = document.querySelectorAll('.memory-card');
        cards.forEach(card => card.addEventListener('click', flipCard));
    }
    
    }

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

    function loadTheme() {
        const savedColor = localStorage.getItem('selectedTheme');
        const savedVerso = localStorage.getItem('cardBack');

        if (savedColor) {
            changeTheme(savedColor); // Aplica a cor salva
            const cards = document.querySelectorAll('.memory-card');
            cards.forEach(card => {
                const backFace = card.querySelector('.back-face');
                if (backFace) {
                    backFace.src = savedVerso || '../img/Cartas/verso.png'; // Aplica a imagem do verso salva ou a padrão
                }
            });
        } else {
            changeTheme('purple');
        }
    }

    loadTheme();

    const cardsArray = [
        { name: 'image1', img: '../img/Cartas/carta1.png' },
        { name: 'image2', img: '../img/Cartas/carta2.png' },
        { name: 'image3', img: '../img/Cartas/carta3.png' },
        { name: 'image4', img: '../img/Cartas/carta4.png' },
        { name: 'image5', img: '../img/Cartas/carta5.png' },
        { name: 'image6', img: '../img/Cartas/carta6.png' },
        { name: 'image7', img: '../img/Cartas/carta7.png' },
        { name: 'image8', img: '../img/Cartas/carta8.png' },
        { name: 'image9', img: '../img/Cartas/carta9.png' },
        { name: 'image10', img: '../img/Cartas/carta10.png' },
        { name: 'image11', img: '../img/Cartas/carta11.png' },
        { name: 'image12', img: '../img/Cartas/carta12.png' },
    ];

    let gameGrid = cardsArray.concat(cardsArray).sort(() => 0.5 - Math.random());
    let firstCard = null;
    let secondCard = null;
    let hasFlippedCard = false;
    let lockBoard = false;
    let matchCount = 0;
    let startTime = null;
    let timerInterval = null;
    let gameStarted = false; 
    
    
    function startTimer() {
        startTime = new Date();
        timerInterval = setInterval(updateTimer, 1000);
    }

    function updateTimer() {
        const currentTime = new Date();
        const timeDiff = Math.floor((currentTime - startTime) / 1000);
        timerDisplay.textContent = timeDiff; // Display elapsed time in seconds
    }

    const gameBoard = document.querySelector('.memory-game');
    const timerDisplay = document.getElementById('time');

    const winMessage = document.createElement('div');
    winMessage.id = 'win-message';
    winMessage.innerHTML = `
        <i class="fas fa-trophy"></i>
        <h2>Parabéns! Você terminou o jogo!</h2>
        <button id="restart-game">Jogar Novamente</button>
    `;
    winMessage.style.display = 'none'; // Inicialmente oculto
    document.body.appendChild(winMessage);

    gameGrid.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('memory-card');
        card.dataset.name = item.name;

        const frontFace = document.createElement('img');
        frontFace.classList.add('front-face');
        frontFace.src = item.img;

        const backFace = document.createElement('img');
        backFace.classList.add('back-face');
        backFace.src = localStorage.getItem('cardBack') || '../img/Cartas/verso.png'; 

        card.appendChild(frontFace);
        card.appendChild(backFace);
        gameBoard.appendChild(card);
    });

    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;
        this.classList.add('flip');
        if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
            return;
        }
    
        secondCard = this;
        lockBoard = true;
    
        checkForMatch();
    }

    function checkForMatch() {
        if (firstCard.dataset.name === secondCard.dataset.name) {
            disableCards();
            matchCount++;
            const totalPairs = document.querySelectorAll('.memory-card').length / 2;
            if (matchCount === totalPairs) {
                clearInterval(timerInterval);
                displayWinMessage();
            }
        } else {
            unflipCards();
        }
    }

    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        resetBoard();
    }

    function unflipCards() {
        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
            resetBoard();
        }, 1500);
    }

    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }

    function displayWinMessage() {
        clearInterval(timerInterval); // Stop the timer
        const currentTime = Math.floor((new Date() - startTime) / 1000); // Calculate the game time
        const savedRecord = localStorage.getItem('recordTime') ? parseInt(localStorage.getItem('recordTime')) : null;
    
        // Check if the current time is a new record
        if (savedRecord === null || currentTime < savedRecord) {
            localStorage.setItem('recordTime', currentTime); // Save the new record
            winMessage.innerHTML = `
                <i class="fas fa-trophy"></i>
                <h2>Parabéns!</h2>
                <p>Novo Recorde: ${currentTime} segundos</p>
                <button id="restart-game">Jogar Novamente</button>
            `;
        } else {
            winMessage.innerHTML = `
                <i class="fas fa-trophy"></i>
                <h2>Parabéns!</h2>
                <p>Tempo: ${currentTime} segundos</p>
                <button id="restart-game">Jogar Novamente</button>
            `;
        }
    
        // Show the win message with the timer display
        winMessage.style.display = 'block';
        document.getElementById('restart-game').addEventListener('click', () => {
            location.reload();
        });
    }
    document.getElementById('restart-game').addEventListener('click', () => {
        location.reload();
    });
    function enableUnloadWarning() {
        window.addEventListener('beforeunload', function (e) {
            e.preventDefault();
            e.returnValue = ''; 
        });
    }   
    const cards = document.querySelectorAll('.memory-card');
    cards.forEach(card => card.addEventListener('click', flipCard));
});
