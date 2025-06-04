const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4',
    '#FFEEAD', '#D4A5A5', '#9B59B6', '#3498DB'
];

let score = 0;
let moves = 0;
let flippedCards = [];
let matchedPairs = [];
let isChecking = false;

const gameGrid = document.getElementById('gameGrid');
const scoreElement = document.getElementById('score');
const movesElement = document.getElementById('moves');
const resetBtn = document.getElementById('resetBtn');

function initializeGame() {
    // Create pairs and shuffle
    const cards = [...colors, ...colors]
        .sort(() => Math.random() - 0.5)
        .map(color => ({ color, matched: false }));

    // Clear existing cards
    gameGrid.innerHTML = '';

    // Create card elements
    cards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.className = 'card';
        cardElement.style.setProperty('--color', card.color);
        cardElement.onclick = () => handleCardClick(index);
        gameGrid.appendChild(cardElement);
    });
}

function handleCardClick(index) {
    if (isChecking || 
        flippedCards.includes(index) || 
        matchedPairs.includes(index) || 
        flippedCards.length === 2) return;

    const card = gameGrid.children[index];
    card.classList.add('flipped');
    flippedCards.push(index);

    if (flippedCards.length === 2) {
        isChecking = true;
        moves++;
        movesElement.textContent = moves;

        const [firstIndex, secondIndex] = flippedCards;
        const firstColor = gameGrid.children[firstIndex].style.getPropertyValue('--color');
        const secondColor = gameGrid.children[secondIndex].style.getPropertyValue('--color');

        if (firstColor === secondColor) {
            score += 10;
            scoreElement.textContent = score;
            matchedPairs.push(...flippedCards);
            flippedCards = [];
            
            matchedPairs.forEach(i => {
                gameGrid.children[i].classList.add('matched');
            });

            if (matchedPairs.length === gameGrid.children.length) {
                setTimeout(() => {
                    alert(`Game Complete! You won with ${score} points in ${moves} moves!`);
                }, 500);
            }
        } else {
            setTimeout(() => {
                flippedCards.forEach(i => {
                    gameGrid.children[i].classList.remove('flipped');
                });
                flippedCards = [];
            }, 1000);
        }

        setTimeout(() => {
            isChecking = false;
        }, 1000);
    }
}

resetBtn.addEventListener('click', () => {
    score = 0;
    moves = 0;
    flippedCards = [];
    matchedPairs = [];
    scoreElement.textContent = '0';
    movesElement.textContent = '0';
    initializeGame();
});

// Start the game
initializeGame();