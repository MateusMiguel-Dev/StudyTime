function playNotificationSound() {
    const audio = document.getElementById('notificationSound');
    audio.play();
}
function showVisualNotification(title, body) {
    const notification = new Notification(title, {
        body: body,
        icon: '../img/time.png' 
    });
}
document.addEventListener('DOMContentLoaded', function() {
    if (!localStorage.getItem('pomodoroAcessado')) {
        const welcomeMessage = document.createElement('div');
        welcomeMessage.id = 'welcomeMessage';
        welcomeMessage.className = 'welcome-message';
        welcomeMessage.style.position = 'fixed';
        welcomeMessage.style.top = '0';
        welcomeMessage.style.left = '0';
        welcomeMessage.style.width = '100%';
        welcomeMessage.style.height = '100%';
        welcomeMessage.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        welcomeMessage.style.color = '#fff';
        welcomeMessage.style.display = 'flex';
        welcomeMessage.style.flexDirection = 'column';
        welcomeMessage.style.justifyContent = 'center';
        welcomeMessage.style.alignItems = 'center';
        welcomeMessage.style.zIndex = '999999';
        welcomeMessage.style.paddingLeft = '10px';
        welcomeMessage.style.paddingRight = '10px';
        welcomeMessage.innerHTML = `
            <div class="welcome-content" style="text-align: justify; max-width: 600px; padding: 50px; background-color: white; color: black; border-radius: 10px;">
                <h1 style="font-weight: 700; font-size:30px; border-bottom: none; margin-bottom: 40px; text-align: center;" >Temporizador Pomodoro</h1>
                <p>O <strong>Temporizador Pomodoro</strong> divide o tempo em dois intervalos: <strong>Modo Foco</strong> e <strong>Modo Descanso</strong>. No Modo Foco, inicia-se um <strong>Pomodoro</strong> de 25 minutos de concentração.</p>
                <p>Ao concluir o Modo Foco, o temporizador muda para o <strong>Modo Descanso</strong>, oferecendo um intervalo de 5 minutos para descanso. Após a conclusão de <strong>4</strong> Pomodoros, o próximo intervalo de descanso se estenderá para <strong>30 minutos</strong>.</p>
                <p>Para usar o temporizador, clique em <i class="bi bi-play-fill"></i> para iniciar, <i class="bi bi-pause-fill"></i> para pausar e <i class="bi bi-fast-forward-fill" style="margin-left: 4px; margin-right: 4px;"></i> para avançar para o próximo intervalo.</p>
                <p>Ao fim de cada Modo, você receberá uma notificação visual e sonora quando o temporizador chegar a <strong>zero</strong>.</p>
                <p>Bons Estudos!</p>
                <button id="startButton" class="btn btn-primary" style="margin-top: 20px; width: 100%; padding: 10px 20px; font-size: 16px;">Começar</button>
            </div>
        `;

        document.body.appendChild(welcomeMessage);

        document.getElementById('startButton').addEventListener('click', function() {
            welcomeMessage.remove(); 
            localStorage.setItem('pomodoroAcessado', 'true'); 
        });
    }
    toggleGamesMenu(false); 
    function darkenColor(color, percent) {
        let colorRgb = hexToRgb(color);
        colorRgb.r = Math.max(0, colorRgb.r - (colorRgb.r * percent));
        colorRgb.g = Math.max(0, colorRgb.g - (colorRgb.g * percent));
        colorRgb.b = Math.max(0, colorRgb.b - (colorRgb.b * percent));
        return rgbToHex(colorRgb.r, colorRgb.g, colorRgb.b);
    }

    function hexToRgb(hex) {
        let r = 0, g = 0, b = 0;
        if (hex.length === 4) {
            r = parseInt(hex[1] + hex[1], 16);
            g = parseInt(hex[2] + hex[2], 16);
            b = parseInt(hex[3] + hex[3], 16);
        } else if (hex.length === 7) {
            r = parseInt(hex[1] + hex[2], 16);
            g = parseInt(hex[3] + hex[4], 16);
            b = parseInt(hex[5] + hex[6], 16);
        }
        return {r: r, g: g, b: b};
    }

    function rgbToHex(r, g, b) {
        return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1).toUpperCase();
    }
    function changeTheme(color) {
        document.body.classList.remove('blue', 'green', 'pink', 'purple');
        document.querySelector('.pomo_section').classList.remove('blue', 'green', 'pink', 'purple');
        const pomoSection = document.querySelector('.pomo_section');
        
        let buttonColor, timerColor, borderColor, h2Color, articleBorderColor, articleBgColor;
    
        switch(color) {
            case 'blue':
                document.querySelector('.pomo_section').classList.add('blue');
                pomoSection.style.backgroundImage = 'url("../img/bg_2.png")';
                buttonColor = '#007bff';
                timerColor = '#1988ffab';
                borderColor = darkenColor('#007bff', 0.2); 
                h2Color = '#007bff'; 
                articleBorderColor = '#007bff'; 
                articleBgColor = '#007bff'; 
                break;
            case 'green':
                document.querySelector('.pomo_section').classList.add('green');
                pomoSection.style.backgroundImage = 'url("../img/bg_3.png")';
                buttonColor = '#28a745';
                timerColor = '#28a745';
                borderColor = darkenColor('#28a745', 0.2); // Verde mais escuro para a borda
                h2Color = '#28a745'; // Cor verde para o título h2
                articleBorderColor = '#28a745'; // Cor verde para a borda do artigo
                articleBgColor = '#28a745'; // Cor verde para o fundo do article
                break;
            case 'pink':
                document.querySelector('.pomo_section').classList.add('pink');
                pomoSection.style.backgroundImage = 'url("../img/bg_4.png")';
                buttonColor = '#e866a7';
                timerColor = '#e866a7';
                borderColor = darkenColor('#e866a7', 0.2); // Rosa mais escuro para a borda
                h2Color = '#e866a7'; // Cor rosa para o título h2
                articleBorderColor = '#e866a7'; // Cor rosa para a borda do artigo
                articleBgColor = '#e866a7'; // Cor rosa para o fundo do article
                break;
            default: 
                document.querySelector('.pomo_section').classList.add('purple');
                pomoSection.style.backgroundImage = 'url("../img/bg_1.png")';
                buttonColor = '#80229f';
                timerColor = '#80229f';
                borderColor = darkenColor('#80229f', 0.2); // Roxo mais escuro para a borda
                h2Color = '#80229f'; // Cor roxa para o título h2
                articleBorderColor = '#80229f'; // Cor roxa para a borda do artigo
                articleBgColor = '#80229f'; // Cor roxa para o fundo do article
        }
    
        document.querySelectorAll('.pomo-controls .btn').forEach(button => {
            button.style.backgroundColor = buttonColor;
            button.style.border = 'none'; // Remover a borda dos botões
        });
    
        const timeDisplay = document.querySelector('.timeDisplay');
        timeDisplay.style.backgroundColor = timerColor;
        timeDisplay.style.borderColor = borderColor; // Alterar borda do timeDisplay
        timeDisplay.style.borderWidth = '10px'; // Borda de 10px no timeDisplay
    
        const titleH2 = document.querySelector('h2');
        titleH2.style.color = h2Color; // Muda a cor do título h2 conforme o tema selecionado
    
        const articles = document.querySelectorAll('.pomo-info');
        articles.forEach(article => {
            article.style.borderTopColor = articleBorderColor; // Muda a borda superior do artigo
        });
    
        if (!isPomodoro) { 
            const pomoArticle = document.querySelector('.pomo-article');
            if (pomoArticle.style.backgroundColor !== articleBgColor) {
                pomoArticle.style.backgroundColor = articleBgColor;  // Atualiza a cor de fundo do article
            }
        }
    
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
});

let timer;
let isRunning = false;
let isPomodoro = true;
let timeLeft = 25 * 60;
let breakTime = 5 * 60;
let pomodoroCount = 1;
let breakCount = 2;

function toggleGamesMenu(show) {
    const gamesLinks = document.querySelectorAll("a[href='jogos.html']");
    gamesLinks.forEach(link => {
        link.style.display = show ? 'inline' : 'none';
    });
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

function updateTimerDisplay() {
    const timeDisplay = document.querySelector('.timeDisplay');
    timeDisplay.textContent = formatTime(timeLeft);
}


window.addEventListener('beforeunload', function (event) {
    if (isRunning && document.visibilityState === 'visible') {
        event.preventDefault();
        event.returnValue = ''; 
    }
});

function setRestMode() {
    isPomodoro = false;
    const pomoArticle = document.querySelector('.pomo-article');
    const modeTitle = document.getElementById('modeTitle');
    const modeIcon = document.getElementById('modeIcon');
    const pomoList = document.querySelector('.pomo-article ul');
    const pomodoroLabel = document.getElementById('pomodoroLabel');

    const savedColor = localStorage.getItem('selectedTheme') || 'purple';

    switch (savedColor) {
        case 'blue':
            pomoArticle.style.backgroundColor = '#007bff'; 
            break;
        case 'green':
            pomoArticle.style.backgroundColor = '#28a745';
            break;
        case 'pink':
            pomoArticle.style.backgroundColor = '#e866a7'; 
            break;
        default:
            pomoArticle.style.backgroundColor = '#80229f'; 
    }

    pomoArticle.classList.add('restMode');
    modeTitle.textContent = pomodoroCount % 4 === 0 ? "Descanso Prolongado" : "Modo Descanso";
    modeIcon.className = pomodoroCount % 4 === 0 ? 'bi-moon' : 'bi-cup-hot';
    timeLeft = pomodoroCount % 4 === 0 ? 30 * 60 : 5 * 60; 
    pomoList.innerHTML = pomodoroCount % 4 === 0
        ? `<li><strong>Com um lanche, descanse, alongue seu corpo</strong></li>
            <li><strong>Faça uma caminhada, leia um capítulo de um livro</strong></li>
            <li><strong>Medite ou faça exercícios de respiração</strong></li>`
            
        : `<li><strong>Levante e alongue-se</strong></li>
            <li><strong>Respire profundamente</strong></li>
            <li><strong>Hidrate-se: beba água</strong></li>`;
    pomodoroLabel.textContent = `Intervalo ${breakCount - 1}`;
    breakCount++;
    updateTimerDisplay();
    toggleGamesMenu(true); 

}

function setFocusMode() {
    const pomoArticle = document.querySelector('.pomo-article');
    const modeTitle = document.getElementById('modeTitle');
    const modeIcon = document.getElementById('modeIcon');
    const pomoList = document.querySelector('.pomo-article ul');
    const pomodoroLabel = document.getElementById('pomodoroLabel');

    pomoArticle.classList.remove('restMode');  
    modeTitle.textContent = "Modo Foco";  
    modeIcon.classList.remove('bi-cup-hot');  
    modeIcon.classList.add('bi-lightning');  

    pomoArticle.style.backgroundColor = 'white';
    pomoList.innerHTML = `
        <li><strong>Desative notificações</strong></li>
        <li><strong>Prepare seu ambiente de trabalho</strong></li>
        <li><strong>Trabalhe em uma tarefa por vez</strong></li>
    `;

    document.querySelector('.pomo-article p').textContent = "Durante o Modo Foco, concentre-se totalmente na sua tarefa. Evite distrações e mantenha o foco absoluto no trabalho.";

    pomodoroLabel.textContent = `Pomodoro ${pomodoroCount+1}`;
    pomodoroCount++;  
    isPomodoro = true;
    timeLeft = 25 * 60;
    updateTimerDisplay();
    toggleGamesMenu(false); 
}

function startTimer() {
    if (isRunning) return;
    isRunning = true;
    timer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();

        if (timeLeft <= 0) {
            clearInterval(timer);
            isRunning = false;
            playNotificationSound();

            if (isPomodoro) {
                setRestMode();
                showVisualNotification("Pomodoro Completo!", "Hora de fazer uma pausa!");
            } else {
                setFocusMode();
                showVisualNotification("Intervalo Concluído!", "Hora de voltar ao foco!");
            }
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timer);
    isRunning = false;
}

function skipTimer() {
    clearInterval(timer);
    isRunning = false;
    if (isPomodoro) {
        isPomodoro = false;
        setRestMode(); 
    } else {
        isPomodoro = true;
        setFocusMode(); 
    }
    updateTimerDisplay();
}

document.getElementById("startBtn").addEventListener("click", () => {
    startTimer();
});

document.getElementById("stopBtn").addEventListener("click", () => {
    pauseTimer();
});
document.getElementById("skipBtn").addEventListener("click", () => {
    skipTimer();
});
if (Notification.permission !== "granted") {
    Notification.requestPermission().then(permission => {
        if (permission === "granted") {
            console.log("Notificações permitidas.");
        }
    });
}
updateTimerDisplay();


