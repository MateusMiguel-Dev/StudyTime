let workDuration = 25 * 60;
let shortBreakDuration = 5 * 60;
let longBreakDuration = 30 * 60;
let currentDuration = localStorage.getItem('currentDuration') ? parseInt(localStorage.getItem('currentDuration')) : workDuration;
let intervalType = localStorage.getItem('intervalType') ? localStorage.getItem('intervalType') : 'work'; // 'work' or 'break'
let cycleCount = localStorage.getItem('cycleCount') ? parseInt(localStorage.getItem('cycleCount')) : 0;
let timer;

const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const nextButton = document.getElementById('next');
const minutesSpan = document.getElementById('minutes');
const secondsSpan = document.getElementById('seconds');
const messageBox = document.getElementById('message-box');
const modeMessage = document.getElementById('mode-message');
const timerContainer = document.getElementById('timer-container');

// Função para verificar suporte a notificações e pedir permissão ao usuário
function checkNotificationPermission() {
    if (!("Notification" in window)) {
        alert("Este navegador não suporta notificações de desktop.");
    } else if (Notification.permission !== "granted") {
        Notification.requestPermission();
    }
}

// Função para enviar notificações
function sendNotification(message) {
    if (Notification.permission === "granted") {
        new Notification(message);
    }
}

function updateTimerDisplay() {
    let minutes = Math.floor(currentDuration / 60);
    let seconds = currentDuration % 60;
    minutesSpan.textContent = String(minutes).padStart(2, '0');
    secondsSpan.textContent = String(seconds).padStart(2, '0');
    updateModeMessage();
}

function updateModeMessage() {
    if (intervalType === 'work') {
        timerContainer.style.backgroundColor = "green"; // Verde para Modo Foco
        modeMessage.textContent = "Modo Foco";
        messageBox.textContent = '';
    } else if (intervalType === 'break') {
        timerContainer.style.backgroundColor = "#26C2EB"; // Azul claro para Modo Descanso
        modeMessage.textContent = "Modo Descanso";
        if (currentDuration === shortBreakDuration) {
            messageBox.innerHTML = `
                <div id="aviso_leve">
                    <h2>Descanso Curto</h2><br>
                    <p>Durante esse intervalo, aproveite para se alongar, se hidratar e escutar uma música! Não se preocupe, você receberá uma notificação quando o intervalo acabar.</br>
                    Se quiser, também pode se interessar em alguns mini-jogos: </p>
            `;
        } else if (currentDuration === longBreakDuration) {
            messageBox.textContent = 'Descanso prolongado! Aproveite para se alongar, fazer um lanche ou relaxar!';
        }
    }
    localStorage.setItem('intervalType', intervalType);
}

function saveState() {
    localStorage.setItem('currentDuration', currentDuration);
    localStorage.setItem('intervalType', intervalType);
    localStorage.setItem('cycleCount', cycleCount);
}

function startTimer() {
    if (timer) return;
    updateModeMessage();
    timer = setInterval(() => {
        currentDuration--;
        if (currentDuration < 0) {
            clearInterval(timer);
            timer = null;
            if (intervalType === 'work') {
                cycleCount++;
                if (cycleCount % 4 === 0) {
                    currentDuration = longBreakDuration;
                    messageBox.textContent = 'Descanso prolongado! Aproveite para se alongar, fazer um lanche ou relaxar!';
                } else {
                    currentDuration = shortBreakDuration;
                    messageBox.innerHTML = `
                        <div id="aviso_leve">
                            <h2>Descanso Curto</h2><br>
                            <p>Aproveite para se alongar, se hidratar e escutar uma música!</br>
                            <strong>Se quiser, também pode passar esse tempinho com alguns mini-jogos da Study Time</strong>:</p></br>
                            <article class="jogos" id="j-memoria"></article>
                            <article class="jogos" id="j-gato"></article>   
                        </div>
                    `;
                }
                intervalType = 'break';
                sendNotification("Seu intervalo de 5 minutos começou!");
            } else {
                currentDuration = workDuration;
                messageBox.textContent = '';
                intervalType = 'work';
                sendNotification("Seu intervalo de 5 minutos acabou!");
            }
            updateTimerDisplay();
            saveState();
            startTimer();
        } else {
            updateTimerDisplay();
            saveState();
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
    timer = null;
    saveState();
}

function nextInterval() {
    clearInterval(timer);
    timer = null;
    if (intervalType === 'work') {
        cycleCount++;
        if (cycleCount % 4 === 0) {
            currentDuration = longBreakDuration;
            messageBox.textContent = 'Descanso prolongado! Aproveite para se alongar, fazer um lanche ou relaxar!';
        } else {
            currentDuration = shortBreakDuration;
            messageBox.innerHTML = `
                <div id="aviso_leve">
                    <h3>Descanso Curto</h3>
                    <p>Aproveite para se alongar, se hidratar e escutar uma música!</br>
                    <strong>Se quiser, também pode passar esse tempinho com alguns mini-jogos da Study Time</strong>:</p></br>
                    <article class="jogos" id="j-memoria"></article>
                    <article class="jogos" id="j-gato"></article>   
                </div>
            `;
        }
        intervalType = 'break';
        sendNotification("Seu intervalo de 5 minutos começou!");
    } else {
        currentDuration = workDuration;
        messageBox.textContent = '';
        intervalType = 'work';
        sendNotification("Seu intervalo de 5 minutos acabou!");
    }
    updateTimerDisplay();
    updateModeMessage();
    saveState();
}
window.addEventListener('beforeunload', (event) => {
    event.preventDefault();
    event.returnValue = 'Tem certeza que deseja recarregar a página? Suas informações podem ser perdidas.';
});

startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
nextButton.addEventListener('click', nextInterval);

updateTimerDisplay();
updateModeMessage();
checkNotificationPermission();


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
    // Itera sobre todas as folhas de estilo carregadas
    for (let i = 0; i < document.styleSheets.length; i++) {
        const styleSheet = document.styleSheets[i];
        if (styleSheet.href && styleSheet.href.includes('style.css')) {
            const rules = styleSheet.cssRules || styleSheet.rules;
            let ruleFound = false;
            for (let j = 0; j < rules.length; j++) {
                if (rules[j].selectorText === 'body') {
                    const newCssText = rules[j].cssText.replace(/background-color:[^;]+;/, `background-color: ${color};`);
                    styleSheet.deleteRule(j);
                    styleSheet.insertRule(newCssText, j);
                    ruleFound = true;
                    break;
                }
            }

            if (!ruleFound) {
                // Se a regra body não for encontrada, adiciona uma nova
                styleSheet.insertRule(`body { background-color: ${color}; }`, rules.length);
            }
        }
    }
}
document.addEventListener("DOMContentLoaded", function() {
    // Recupera a cor de fundo salva no localStorage e aplica
    const savedColor = localStorage.getItem('bgColor');
    if (savedColor) {
        document.body.style.backgroundColor = savedColor;
    }

    // Adiciona evento de clique para cada caixa de cor
    document.querySelectorAll('.color-box').forEach(box => {
        box.addEventListener('click', function() {
            const color = this.getAttribute('data-color');
            document.body.style.backgroundColor = color;
            localStorage.setItem('bgColor', color);
        });
    });
});
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
