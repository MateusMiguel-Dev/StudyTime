document.addEventListener('DOMContentLoaded', function() {
    const addTaskButton = document.getElementById('add-task-button');
    const newTaskInput = document.getElementById('new-task-input');
    const taskPriority = document.getElementById('task-priority');
    const taskLists = document.querySelectorAll('.task-list');

    let taskIdCounter = localStorage.getItem('taskIdCounter') ? parseInt(localStorage.getItem('taskIdCounter')) : 0;

    loadTasks();

    addTaskButton.addEventListener('click', function() {
        const taskText = newTaskInput.value.trim();
        const priority = taskPriority.value;
        if (taskText !== "") {
            const task = createTaskElement(taskText, priority, taskIdCounter++);
            taskLists[0].appendChild(task);
            newTaskInput.value = '';
            saveTasks();
            localStorage.setItem('taskIdCounter', taskIdCounter);
        }
    });

    function createTaskElement(text, priority, id) {
        const task = document.createElement('div');
        task.classList.add('task', priority);
        task.setAttribute('draggable', true);
        task.setAttribute('id', 'task-' + id);
        task.textContent = text;
        addDragAndDropHandlers(task);
        task.addEventListener('dblclick', handleDoubleClick);
        return task;
    }

    function addDragAndDropHandlers(task) {
        task.addEventListener('dragstart', handleDragStart);
        task.addEventListener('dragend', handleDragEnd);
    }

    function handleDragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.id);
        setTimeout(() => {
            e.target.style.display = 'none';
        }, 0);
    }

    function handleDragEnd(e) {
        e.target.style.display = 'block';
        saveTasks();
    }

    function handleDoubleClick(e) {
        const task = e.target;
        task.remove();
        saveTasks();
    }

    taskLists.forEach(taskList => {
        taskList.addEventListener('dragover', handleDragOver);
        taskList.addEventListener('drop', handleDrop);
    });

    function handleDragOver(e) {
        e.preventDefault();
    }

    function handleDrop(e) {
        e.preventDefault();
        const taskId = e.dataTransfer.getData('text/plain');
        const task = document.getElementById(taskId);
        if (e.target.classList.contains('task-list')) {
            e.target.appendChild(task);
        } else if (e.target.classList.contains('task-column')) {
            e.target.querySelector('.task-list').appendChild(task);
        }
        saveTasks();
    }

    function saveTasks() {
        const tasks = {
            'to-do': [],
            'in-progress': [],
            'done': []
        };
        taskLists.forEach(list => {
            const tasksInList = [];
            list.querySelectorAll('.task').forEach(task => {
                tasksInList.push({
                    text: task.textContent,
                    priority: task.classList.contains('alta') ? 'alta' : task.classList.contains('media') ? 'media' : 'baixa'
                });
            });
            tasks[list.parentElement.id] = tasksInList;
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks'));
        if (tasks) {
            for (const [columnId, tasksInList] of Object.entries(tasks)) {
                tasksInList.forEach(({ text, priority }) => {
                    const task = createTaskElement(text, priority, taskIdCounter++);
                    document.getElementById(columnId).querySelector('.task-list').appendChild(task);
                });
            }
        }
    }
});
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
