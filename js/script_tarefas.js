document.addEventListener('DOMContentLoaded', function() {
    if (!localStorage.getItem('tarefaAcessada')) {
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
            <div class="welcome-content" style="text-align: justify; margin-top: 0px; max-width: 600px; padding: 50px; background-color: white; color: black; border-radius: 10px;">
                <h2 style="font-weight: 700; margin-bottom: 40px; text-align: center;" >Lista de Tarefas</h2>
                <p>Para adicionar uma tarefa, insira o nome da atividade e defina sua prioridade, depois clique em <strong>Adicionar</strong>. Após criada, a tarefa será exibida na seção <strong>Fazer</strong>, com a prioridade destacada por cores: <strong style="color: green;">Verde</strong> para Prioridade Normal, <strong style="color: orange;">Amarelo</strong> para Prioridade Alta e <strong style="color: red;">Vermelho</strong> para Prioridade Urgente.</p>
                <p>O status da tarefa pode ser atualizado conforme seu andamento, movendo-a com o mouse para as seções <strong>Fazendo</strong> ou <strong>Feito</strong>. Se precisar <strong>remover</strong> uma tarefa, basta <strong>clicar</strong> duas vezes sobre ela.</p>
                <p>Bons Estudos!</p>
                <button id="startButton" class="btn btn-primary" style="margin-top: 20px; width: 100%; padding: 10px 20px; font-size: 16px;">Começar</button>
            </div>
        `;

        document.body.appendChild(welcomeMessage);

        document.getElementById('startButton').addEventListener('click', function() {
            welcomeMessage.remove(); 
            localStorage.setItem('tarefaAcessada', 'true'); 
        });
    }
    function changeTheme(color) {
        document.body.classList.remove('blue', 'green', 'pink', 'purple');
        document.querySelector('.task_section').classList.remove('blue', 'green', 'pink', 'purple');
        document.querySelectorAll('.segunda_section .report-item').forEach(item => item.classList.remove('blue', 'green', 'pink', 'purple'));
        const taskSection = document.querySelector('.task_section');

        switch(color) {
            case 'blue':
                document.querySelector('.task_section').classList.add('blue');
                document.querySelectorAll('.segunda_section .report-item').forEach(item => item.classList.add('blue'));
                taskSection.style.backgroundImage = 'url("../img/bg_2.png")'; 
                break;
            case 'green':
                document.querySelector('.task_section').classList.add('green');
                document.querySelectorAll('.segunda_section .report-item').forEach(item => item.classList.add('green'));
                taskSection.style.backgroundImage = 'url("../img/bg_3.png")'; 
                break;
            case 'pink':
                document.querySelector('.task_section').classList.add('pink');
                document.querySelectorAll('.segunda_section .report-item').forEach(item => item.classList.add('pink'));
                taskSection.style.backgroundImage = 'url("../img/bg_4.png")'; 
                break;
            default: // Caso o usuário não escolha uma cor, aplica o roxo por padrão
                document.querySelector('.task_section').classList.add('purple');
                document.querySelectorAll('.segunda_section .report-item').forEach(item => item.classList.add('purple'));
                taskSection.style.backgroundImage = 'url("../img/bg_1.png")'; 
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
    function countTasks() {
        const todoTasks = document.querySelectorAll("#todoTasks .task-item").length;
        const doingTasks = document.querySelectorAll("#doingTasks .task-item").length;
        const doneTasks = document.querySelectorAll("#doneTasks .task-item").length;

        // Contar apenas as tarefas urgentes que estão nas listas "A Fazer" e "Fazendo"
        const urgentTodo = document.querySelectorAll("#todoTasks .task-item[data-priority='urgente']").length;
        const urgentDoing = document.querySelectorAll("#doingTasks .task-item[data-priority='urgente']").length;
        const urgentTasks = urgentTodo + urgentDoing;

        // Salvar as contagens no localStorage
        localStorage.setItem('todoCount', todoTasks);
        localStorage.setItem('doingCount', doingTasks);
        localStorage.setItem('doneCount', doneTasks);
        localStorage.setItem('urgentCount', urgentTasks);

        // Atualizar a contagem de tarefas pendentes
        const totalPendingTasks = todoTasks + doingTasks;
        localStorage.setItem('totalPendingTasks', totalPendingTasks);
    }
    
    // Chame countTasks ao adicionar ou remover tarefas
    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('.task-item').forEach(task => {
            tasks.push({
                text: task.textContent,
                priority: task.getAttribute('data-priority'),
                list: task.closest('.task-list').id // Salva a lista à qual a tarefa pertence
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));

        // Atualizar a contagem de tarefas
        countTasks();
    }

    // Função para carregar as tarefas do localStorage
    function loadTasks() {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            const tasks = JSON.parse(savedTasks);
            tasks.forEach(task => {
                const newTask = createTask(task.text, task.priority);
                document.getElementById(task.list).appendChild(newTask); // Adiciona a tarefa na lista correta
            });
        }
        // Chama countTasks para contabilizar as tarefas carregadas
        countTasks();
    }

    // Função para criar uma nova tarefa
    function createTask(taskText, priority) {
        const task = document.createElement("div");
        task.classList.add("task-item");
        task.textContent = taskText;
        task.setAttribute("draggable", "true");
        task.setAttribute("data-priority", priority);

        // Adiciona a funcionalidade de clique duplo para remover
        task.addEventListener("dblclick", () => {
            task.remove();
            saveTasks(); // Atualiza a lista de tarefas no localStorage após remover
        });

        task.addEventListener("dragstart", dragStart);
        task.addEventListener("dragend", dragEnd);

        return task;
    }

    document.getElementById("addTaskBtn").addEventListener("click", () => {
        const taskText = document.getElementById("taskInput").value.trim();
        const priority = document.getElementById("prioritySelect").value;

        if (taskText !== "") {
            const newTask = createTask(taskText, priority);
            document.getElementById("todoTasks").appendChild(newTask);
            document.getElementById("taskInput").value = ""; 
            saveTasks();
        }
    });

    // Funções de drag and drop
    function dragStart(event) {
        event.dataTransfer.setData("text", event.target.textContent);
        event.target.classList.add("dragging");
    }

    function dragEnd(event) {
        event.target.classList.remove("dragging");
        saveTasks(); // Salva as tarefas após mover
    }

    const taskLists = document.querySelectorAll(".task-list");

    taskLists.forEach((list) => {
        list.addEventListener("dragover", (event) => {
            event.preventDefault(); // Necessário para permitir o drop
        });

        list.addEventListener("drop", (event) => {
            const taskText = event.dataTransfer.getData("text");
            const taskItems = document.querySelectorAll(".task-item");

            taskItems.forEach((task) => {
                if (task.textContent === taskText) {
                    event.target.appendChild(task);
                }
            });

            saveTasks();
        });
    });

    // Carrega as tarefas salvas no localStorage ao carregar a página
    loadTasks();
});
