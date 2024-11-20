document.addEventListener('DOMContentLoaded', function() {
    // Função para mudar o estilo
    function changeTheme(color) {
        document.body.classList.remove('blue', 'green', 'pink', 'purple');
        document.querySelector('.jogos_section').classList.remove('blue', 'green', 'pink', 'purple');
        const jogosSection = document.querySelector('.jogos_section');

        switch(color) {
            case 'blue':
                document.querySelector('.jogos_section').classList.add('blue');
                jogosSection.style.backgroundImage = 'url("../img/bg_2.png")'; 
                articleBorderColor = '#007bff'; // Cor azul para a borda do artigo
                break;
            case 'green':
                document.querySelector('.jogos_section').classList.add('green');
                jogosSection.style.backgroundImage = 'url("../img/bg_3.png")'; 
                articleBorderColor = '#28a745'; // Cor verde para a borda do artigo
                break;
            case 'pink':
                document.querySelector('.jogos_section').classList.add('pink');
                jogosSection.style.backgroundImage = 'url("../img/bg_4.png")'; 
                articleBorderColor = '#e866a7'; // Cor rosa para a borda do artigo
                break;
            default: // Caso o usuário não escolha uma cor, aplica o roxo por padrão
                document.querySelector('.jogos_section').classList.add('purple');
                jogosSection.style.backgroundImage = 'url("../img/bg_1.png")'; 
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