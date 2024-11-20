document.addEventListener('DOMContentLoaded', function() {
    if (!localStorage.getItem('siteAcessado')) {
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
        welcomeMessage.style.zIndex = '9999';
        welcomeMessage.style.paddingLeft = '10px';
        welcomeMessage.style.paddingRight = '10px';
        welcomeMessage.innerHTML = `
            <div class="welcome-content" style="text-align: justify; max-width: 600px; padding: 50px; background-color: white; color: black; border-radius: 10px;">
                <h2 style="font-weight: 700; text-align: center; margin-bottom: 40px;" >Bem-vindo(a) a StudyTime!</h2>
                <p>A StudyTime é sua plataforma para organizar estudos, gerenciar tarefas e otimizar seu tempo. Adicione atividades na página de <strong>Tarefas</strong>, e utilize o método <strong>Pomodoro</strong> para manter-se produtivo com intervalos regulares.</p>
                <p>Explore também nossa seção de <strong>Jogos</strong> para momentos de lazer entre sessões de estudo. Aproveite nossas ferramentas e alcance uma rotina de estudos mais equilibrada e eficaz.</p>
                <p>Bons Estudos!</p>
                <button id="startButton" class="btn btn-primary" style="margin-top: 20px; width: 100%; padding: 10px 20px; font-size: 16px;">Começar</button>
            </div>
        `;

        document.body.appendChild(welcomeMessage);

        document.getElementById('startButton').addEventListener('click', function() {
            welcomeMessage.remove(); 
            localStorage.setItem('siteAcessado', 'true'); 
        });
    }
    const dicasConteudos = [
        "Defina claramente o que você precisa estudar.",
        "Liste os tópicos principais antes de começar.",
        "Priorize os conteúdos que você tem mais dificuldade.",
        "Divida o conteúdo em partes menores e manejáveis.",
        "Use livros e artigos de referência confiáveis.",
        "Pesquise fontes adicionais para expandir o conhecimento.",
        "Use vídeos educativos para diversificar a forma de estudo.",
        "Faça anotações durante a leitura ou aula.",
        "Organize seus materiais de estudo para fácil acesso.",
        "Estabeleça metas de estudo para cada sessão.",
        "Crie um cronograma para cobrir todos os conteúdos antes das provas.",
        "Utilize resumos e mapas mentais para fixar o conteúdo.",
        "Revise o conteúdo aprendido de tempos em tempos.",
        "Faça perguntas a si mesmo sobre o que aprendeu.",
        "Grupos de estudo ajudam a trocar ideias e aprender novos conteúdos."
    ];

    const dicasTempo = [
        "Use uma agenda ou app para planejar seu tempo de estudo.",
        "Defina horários fixos para estudar todos os dias.",
        "Separe blocos de tempo focados em tarefas específicas.",
        "Evite sobrecarregar seu cronograma com muitas atividades.",
        "Comece estudando as matérias mais difíceis primeiro.",
        "Mantenha-se focado durante o tempo reservado para estudo.",
        "Use a técnica Pomodoro para intercalar foco e descanso.",
        "Estime quanto tempo você levará em cada tarefa.",
        "Não procrastine, comece as tarefas assim que possível.",
        "Separe tempo para revisar o conteúdo antes de testes ou provas.",
        "Não estude por longos períodos sem pausas.",
        "Avalie seu uso do tempo e ajuste conforme necessário.",
        "Desligue notificações de redes sociais durante o estudo.",
        "Tenha um horário definido para encerrar suas atividades.",
        "Foque em uma tarefa de cada vez para aumentar a produtividade."
    ];

    const dicasDescanso = [
        "Durma pelo menos 7-8 horas por noite.",
        "Faça pausas regulares durante o estudo.",
        "Levante-se e se mova a cada intervalo de 30 a 60 minutos.",
        "Realize atividades físicas para relaxar o corpo e a mente.",
        "Pratique exercícios de respiração para aliviar o estresse.",
        "Desconecte-se da tecnologia ao menos uma hora antes de dormir.",
        "Medite para acalmar a mente antes de dormir.",
        "Evite consumir cafeína ou alimentos pesados antes de dormir.",
        "Escute música relaxante nas pausas para desestressar.",
        "Mantenha uma rotina de sono consistente, mesmo nos finais de semana.",
        "Faça uma caminhada ao ar livre para descontrair.",
        "Evite ficar pensando em estudo ou trabalho ao se deitar.",
        "Tente técnicas de relaxamento como yoga ou alongamento.",
        "Mantenha seu ambiente de descanso tranquilo e confortável.",
        "Desconecte-se mentalmente do trabalho ou estudo nas pausas."
    ];

    function embaralhar(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function inserirDicas() {
        const dicasConteudosEmbaralhadas = embaralhar([...dicasConteudos]);
        const dicasTempoEmbaralhadas = embaralhar([...dicasTempo]);
        const dicasDescansoEmbaralhadas = embaralhar([...dicasDescanso]);

        const divs = document.querySelectorAll('.report-item ul');
        
        divs[0].innerHTML = '';
        for (let i = 0; i < 3; i++) {
            const li = document.createElement('li');
            li.textContent = dicasConteudosEmbaralhadas[i];
            divs[0].appendChild(li);
        }

        divs[1].innerHTML = '';
        for (let i = 0; i < 3; i++) {
            const li = document.createElement('li');
            li.textContent = dicasTempoEmbaralhadas[i];
            divs[1].appendChild(li);
        }

        divs[2].innerHTML = '';
        for (let i = 0; i < 3; i++) {
            const li = document.createElement('li');
            li.textContent = dicasDescansoEmbaralhadas[i];
            divs[2].appendChild(li);
        }
    }

    inserirDicas();

    function changeTheme(color) {

        document.body.classList.remove('blue', 'green', 'pink', 'purple');
        document.querySelector('.first_section').classList.remove('blue', 'green', 'pink', 'purple');
        document.querySelector('.extra_section').classList.remove('blue', 'green', 'pink', 'purple');
        document.querySelectorAll('.second_section .report-item').forEach(item => item.classList.remove('blue', 'green', 'pink', 'purple'));
        document.querySelectorAll('.third_section .report-item').forEach(item => item.classList.remove('blue', 'green', 'pink', 'purple'));
        document.querySelectorAll('.first_section .article-box, .extra_section .article-box').forEach(item => item.classList.remove('blue', 'green', 'pink', 'purple'));
        
        const contentContainer = document.querySelector('.content-container');
        const centralImage = document.querySelector('.central-image');
        const firstSection = document.querySelector('.first_section');
        
        switch(color) {
            case 'blue':
                document.body.classList.add('blue');
                document.querySelector('.first_section').classList.add('blue');
                document.querySelector('.extra_section').classList.add('blue');
                document.querySelectorAll('.second_section .report-item').forEach(item => item.classList.add('blue'));
                document.querySelectorAll('.third_section .report-item').forEach(item => item.classList.add('blue'));
                contentContainer.style.backgroundImage = 'url("img/bg_2.png")'; 
                centralImage.src = 'img/q_azul.png'; 
                break;
            case 'green':
                document.body.classList.add('green');
                document.querySelector('.first_section').classList.add('green');
                document.querySelector('.extra_section').classList.add('green');
                document.querySelectorAll('.second_section .report-item').forEach(item => item.classList.add('green'));
                document.querySelectorAll('.third_section .report-item').forEach(item => item.classList.add('green'));
                contentContainer.style.backgroundImage = 'url("img/bg_3.png")'; 
                centralImage.src = 'img/q_verde.png'; 
                break;
            case 'pink':
                document.body.classList.add('pink');
                document.querySelector('.first_section').classList.add('pink');
                document.querySelector('.extra_section').classList.add('pink');
                document.querySelectorAll('.second_section .report-item').forEach(item => item.classList.add('pink'));
                document.querySelectorAll('.third_section .report-item').forEach(item => item.classList.add('pink'));
                contentContainer.style.backgroundImage = 'url("img/bg_4.png")'; 
                centralImage.src = 'img/q_rosa.png'; 
                break;
            default: 
                document.body.classList.add('purple');
                document.querySelector('.first_section').classList.add('purple');
                document.querySelector('.extra_section').classList.add('purple');
                document.querySelectorAll('.second_section .report-item').forEach(item => item.classList.add('purple'));
                document.querySelectorAll('.third_section .report-item').forEach(item => item.classList.add('purple'));
                contentContainer.style.backgroundImage = ''; 
                centralImage.src = 'img/q_roxo.png'; 
        }
        localStorage.setItem('selectedTheme', color);
    }

    const savedColor = localStorage.getItem('selectedTheme');
    if (savedColor) {
        changeTheme(savedColor); 
    } else {
        changeTheme('purple'); 
    }
    
    // Adiciona evento de clique para mudar a cor
    const colorOptions = document.querySelectorAll('.color-option');
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            const color = this.style.backgroundColor;
            if (color === 'rgb(128, 34, 159)') { 
                changeTheme('purple');
            } else if (color === 'rgb(0, 123, 255)') { 
                changeTheme('blue');
            } else if (color === 'rgb(40, 167, 69)') { 
                changeTheme('green');
            } else if (color === 'rgb(255, 105, 180)') {
                changeTheme('pink');
            }
        });
    });
    function updateTaskCounts() {
        const todoCount = localStorage.getItem('todoCount') || 0;
        const doingCount = localStorage.getItem('doingCount') || 0;
        const doneCount = localStorage.getItem('doneCount') || 0;
        const urgentCount = localStorage.getItem('urgentCount') || 0;

        document.querySelector('.pendentes .count').textContent = parseInt(todoCount) + parseInt(doingCount);
        document.querySelector('.concluidas .count').textContent = doneCount;
        document.querySelector('.urgentes .count').textContent = urgentCount;
    }
    updateTaskCounts();
});

