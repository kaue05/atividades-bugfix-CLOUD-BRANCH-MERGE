// Calculadora de IMC com bugs propositais

const weightInput = document.getElementById('weight');
const heightInput = document.getElementById('height');
const calculateBtn = document.getElementById('calculateBtn');
const resultDiv = document.getElementById('result');
const historyList = document.getElementById('historyList');
const clearHistoryBtn = document.getElementById('clearHistory');

// BUG 1: Fórmula do IMC está incorreta (dividindo por altura ao invés de altura²)
function calculateIMC(weight, height) {
    return weight / height;  // ❌ ERRADO: deveria ser weight / (height * height)
}

// BUG 2: Classificação do IMC com intervalos errados
function getClassification(imc) {
    if (imc < 18.5) {
        return { text: 'Abaixo do peso', class: 'underweight' };
    } else if (imc >= 18.5 && imc < 20) {  // ❌ ERRADO: deveria ser < 25
        return { text: 'Peso normal', class: 'normal' };
    } else if (imc >= 25 && imc < 29.9) {
        return { text: 'Sobrepeso', class: 'overweight' };
    } else {
        return { text: 'Obesidade', class: 'obese' };
    }
}

// Função para exibir o resultado
function displayResult(imc, classification) {
    resultDiv.className = `result show ${classification.class}`;
    resultDiv.innerHTML = `
        <strong>Seu IMC é: ${imc.toFixed(2)}</strong><br>
        Classificação: ${classification.text}
    `;
}

// Função para adicionar ao histórico
function addToHistory(weight, height, imc, classification) {
    const now = new Date();
    const dateStr = now.toLocaleString('pt-BR');

    const historyItem = {
        date: dateStr,
        weight: weight,
        height: height,
        imc: imc.toFixed(2),
        classification: classification.text
    };

    let history = JSON.parse(localStorage.getItem('imcHistory') || '[]');
    history.unshift(historyItem);

    // BUG 3: Limita histórico a apenas 3 itens (deveria ser 5)
    if (history.length > 3) {  // ❌ ERRADO: deveria ser > 5
        history = history.slice(0, 3);
    }

    localStorage.setItem('imcHistory', JSON.stringify(history));
    loadHistory();
}

// Função para carregar histórico
function loadHistory() {
    const history = JSON.parse(localStorage.getItem('imcHistory') || '[]');

    if (history.length === 0) {
        historyList.innerHTML = '<li class="empty-history">Nenhum cálculo registrado ainda</li>';
        return;
    }

    historyList.innerHTML = history.map(item => `
        <li>
            <strong>📅 ${item.date}</strong><br>
            Peso: ${item.weight}kg | Altura: ${item.height}m<br>
            IMC: ${item.imc} - ${item.classification}
        </li>
    `).join('');
}

// Evento de cálculo
calculateBtn.addEventListener('click', () => {
    const weight = parseFloat(weightInput.value);
    const height = parseFloat(heightInput.value);

    if (!weight || !height || weight <= 0 || height <= 0) {
        alert('Por favor, insira valores válidos para peso e altura!');
        return;
    }

    if (height > 3) {
        alert('Altura deve ser em metros (ex: 1.75)');
        return;
    }

    const imc = calculateIMC(weight, height);
    const classification = getClassification(imc);

    displayResult(imc, classification);
    addToHistory(weight, height, imc, classification);
});

// Evento para limpar histórico
clearHistoryBtn.addEventListener('click', () => {
    if (confirm('Tem certeza que deseja limpar todo o histórico?')) {
        localStorage.removeItem('imcHistory');
        loadHistory();
    }
});

// Carregar histórico ao iniciar
loadHistory();

// Permitir calcular com Enter
heightInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        calculateBtn.click();
    }
});

weightInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        calculateBtn.click();
    }
});