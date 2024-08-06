document.addEventListener("DOMContentLoaded", function() {
    const savedColor = localStorage.getItem('bgColor');
    if (savedColor) {
        updateBodyBackgroundColor(savedColor);
    }

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
        styleSheet.insertRule(`body { background-color: ${color}; }`, rules.length);
    }
}
document.addEventListener("DOMContentLoaded", function() {
    const savedColor = localStorage.getItem('bgColor');
    if (savedColor) {
        applySettings(savedColor);
    }

    document.querySelectorAll('.color-box').forEach(box => {
        box.addEventListener('click', function() {
            const color = this.getAttribute('data-color');
            applySettings(color);
            localStorage.setItem('bgColor', color);
        });
    });
});

function applySettings(color){
    document.body.style.backgroundColor = color;

    const imageMap = {
        '#28a745': 'q_verde.png', //Verde
        '#e83e8c': 'q_rosa.png',  //Rosa
        '#7F348C': 'q_roxo.png',  //Roxo
        '#007bff': 'q_azul.png'   //Azul
    };

    const imageUrl = imageMap[color] || 'default_image.png'; 
    const planoDeFundo = document.getElementById('plano-de-fundo');
    if (planoDeFundo) {
        planoDeFundo.src = `img/${imageUrl}`;
    }
}
