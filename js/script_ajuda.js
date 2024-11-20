document.addEventListener('DOMContentLoaded', function() {
    // Função para mudar o estilo
    function changeTheme(color) {
        document.body.classList.remove('blue', 'green', 'pink', 'purple');
        document.querySelector('.ajuda_section').classList.remove('blue', 'green', 'pink', 'purple');
        const jogosSection = document.querySelector('.jogos_section');

        switch(color) {
            case 'blue':
                document.querySelector('.ajuda_section').classList.add('blue');
                articleBorderColor = '#007bff'; // Cor azul para a borda do artigo
                break;
            case 'green':
                document.querySelector('.ajuda_section').classList.add('green');
                articleBorderColor = '#28a745'; // Cor verde para a borda do artigo
                break;
            case 'pink':
                document.querySelector('.ajuda_section').classList.add('pink');
                articleBorderColor = '#e866a7'; // Cor rosa para a borda do artigo
                break;
            default: // Caso o usuário não escolha uma cor, aplica o roxo por padrão
                document.querySelector('.ajuda_section').classList.add('purple');
                articleBorderColor = '#80229f'; // Cor roxa para a borda do artigo

        }
        const articles = document.querySelectorAll('.ajuda-info');
        articles.forEach(article => {
            article.style.borderTopColor = articleBorderColor; // Muda a borda superior do artigo
            article.style.borderBottomColor = articleBorderColor;
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
  
    const articles = document.querySelectorAll(".ajuda-info");

    articles.forEach(article => {
        article.addEventListener("click", function() {
            this.classList.toggle("expanded"); // Alterna entre expandido e colapsado
        });
    });
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