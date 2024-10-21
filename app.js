// Datos de cartas con sus tipos y sinergias (esto se puede expandir)
const cardData = {
    "Dragón de ojos azules": { type: "Monstruo", synergy: ["Fusión", "XYZ"] },
    "Cañón de trampa": { type: "Trampa", synergy: [] },
    "Bola de fuego": { type: "Hechizo", synergy: [] },
    "Goyo Guardian": { type: "Monstruo", synergy: ["Sincronía"] },
    // Añadir más cartas según sea necesario
};

// Función para obtener el deck desde una URL
async function fetchDeck(url) {
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Error al obtener el deck: ${response.statusText}`);
        }

        const deckText = await response.text();

        // Llenar el campo de texto con el contenido del deck
        document.getElementById('deckTextArea').value = deckText;

        // Analizar el deck después de cargarlo
        analyzeDeck(deckText);
    } catch (error) {
        console.error(error);
        alert('Error al cargar el deck desde la URL.');
    }
}

// Función para analizar el deck
function analyzeDeck(deckInput) {
    const deck = deckInput.split('\n').map(card => card.trim()).filter(card => card !== "");
    
    const totalCards = deck.length;
    const monsterCards = deck.filter(card => cardData[card]?.type === "Monstruo").length;
    const spellCards = deck.filter(card => cardData[card]?.type === "Hechizo").length;
    const trapCards = deck.filter(card => cardData[card]?.type === "Trampa").length;

    // Sinergias
    const synergies = {
        "Fusión": 0,
        "Sincronía": 0,
        "XYZ": 0,
        "Total de Sinergias": 0,
    };

    deck.forEach(card => {
        if (cardData[card]) {
            cardData[card].synergy.forEach(type => {
                synergies[type]++;
                synergies["Total de Sinergias"]++;
            });
        }
    });

    // Mostrar resultados
    const resultsDiv = document.getElementById('analysisResults');
    resultsDiv.innerHTML = `
        <p>Total de cartas: ${totalCards}</p>
        <p>Monstruos: ${monsterCards}</p>
        <p>Hechizos: ${spellCards}</p>
        <p>Trampas: ${trapCards}</p>
        <h3>Sinergias</h3>
        <ul>
            <li>Fusión: ${synergies["Fusión"]}</li>
            <li>Sincronía: ${synergies["Sincronía"]}</li>
            <li>XYZ: ${synergies["XYZ"]}</li>
            <li>Total de Sinergias: ${synergies["Total de Sinergias"]}</li>
        </ul>
        <h3>Cartas en el Meta Actual</h3>
        <p>Asegúrate de considerar cartas populares en el meta como referencia.</p>
    `;
}

// Lógica para cargar el deck desde una URL cuando el usuario hace clic en "Cargar desde URL"
document.getElementById('loadDeckBtn').addEventListener('click', function() {
    const deckUrl = document.getElementById('deckUrlInput').value;
    
    if (deckUrl) {
        fetchDeck(deckUrl);
    } else {
        alert('Por favor, ingresa una URL válida.');
    }
});

// Lógica para analizar el deck manualmente
document.getElementById('analyzeDeckBtn').addEventListener('click', function() {
    const deckInput = document.getElementById('deckTextArea').value;
    analyzeDeck(deckInput);
});
