document.addEventListener("DOMContentLoaded", function() {
    // Recupera a cor de fundo salva no localStorage
    const savedColor = localStorage.getItem('bgColor');
    if (savedColor) {
        updateBodyBackgroundColor(savedColor);
    }

    // Adiciona evento de clique para cada caixa de cor
    document.querySelectorAll('.color-box').forEach(box => {
        box.addEventListener('click', function() {
            const color = this.getAttribute('data-color');
            updateBodyBackgroundColor(color);
            localStorage.setItem('bgColor', color);
        });
    });
});

function updateBodyBackgroundColor(color) {
    let styleSheet;
    for (let i = 0; i < document.styleSheets.length; i++) {
        if (document.styleSheets[i].href && document.styleSheets[i].href.includes('style.css')) {
            styleSheet = document.styleSheets[i];
            break;
        }
    }

    if (!styleSheet) {
        console.error('Style sheet not found.');
        return;
    }

    const rules = styleSheet.cssRules || styleSheet.rules;
    let ruleFound = false;
    for (let i = 0; i < rules.length; i++) {
        if (rules[i].selectorText === 'body') {
            const newCssText = rules[i].cssText.replace(/background-color:[^;]+;/, `background-color: ${color};`);
            styleSheet.deleteRule(i);
            styleSheet.insertRule(newCssText, i);
            ruleFound = true;
            break;
        }
    }

    if (!ruleFound) {
        // Se a regra body não for encontrada, adiciona uma nova
        styleSheet.insertRule(`body { background-color: ${color}; }`, rules.length);
    }
}
document.addEventListener("DOMContentLoaded", function() {
    // Recupera a cor de fundo salva no localStorage e aplica
    const savedColor = localStorage.getItem('bgColor');
    if (savedColor) {
        applySettings(savedColor);
    }

    // Adiciona evento de clique para cada caixa de cor
    document.querySelectorAll('.color-box').forEach(box => {
        box.addEventListener('click', function() {
            const color = this.getAttribute('data-color');
            applySettings(color);
            localStorage.setItem('bgColor', color);
        });
    });
});

function applySettings(color) {
    // Aplica a cor de fundo
    document.body.style.backgroundColor = color;

    // Altera a imagem com base na cor escolhida
    const imageMap = {
        '#28a745': 'q_verde.png', // Verde
        '#e83e8c': 'q_rosa.png',  // Rosa
        '#7F348C': 'q_roxo.png',  // Roxo
        '#007bff': 'q_azul.png'   // Azul
    };

    const imageUrl = imageMap[color] || 'default_image.png'; // Fallback para uma imagem padrão se a cor não estiver mapeada
    const planoDeFundo = document.getElementById('plano-de-fundo');
    if (planoDeFundo) {
        planoDeFundo.src = `img/${imageUrl}`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
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
        { name: 'image13', img: '../img/Cartas/carta13.png' },
        { name: 'image14', img: '../img/Cartas/carta14.png' },

    ];

    let gameGrid = cardsArray.concat(cardsArray).sort(() => 0.5 - Math.random());
    let firstCard = null;
    let secondCard = null;
    let hasFlippedCard = false;
    let lockBoard = false;
    let matchCount = 0;
    let startTime = null;
    let timerInterval = null;

    const gameBoard = document.querySelector('.memory-game');
    const timerDisplay = document.getElementById('time');

    gameGrid.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('memory-card');
        card.dataset.name = item.name;

        const frontFace = document.createElement('img');
        frontFace.classList.add('front-face');
        frontFace.src = item.img;

        const backFace = document.createElement('img');
        backFace.classList.add('back-face');
        backFace.src = '../img/Cartas/verso.png'; // Adicione o caminho da imagem do verso

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
            if (!startTime) {
                startTime = new Date();
                timerInterval = setInterval(updateTimer, 1000);
            }
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
            if (matchCount === cardsArray.length) {
                clearInterval(timerInterval);
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

    function updateTimer() {
        const currentTime = new Date();
        const timeDiff = Math.floor((currentTime - startTime) / 1000);
        timerDisplay.textContent = timeDiff;
    }

    const cards = document.querySelectorAll('.memory-card');
    cards.forEach(card => card.addEventListener('click', flipCard));
});
