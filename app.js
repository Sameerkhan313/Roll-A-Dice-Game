document.addEventListener('DOMContentLoaded', () => {
    const newGameButton = document.getElementById('newGame');
    const rollDiceButton = document.getElementById('rollDice');
    const holdButton = document.getElementById('hold');

    const player1Area = document.querySelector('.player1Area');
    const player2Area = document.querySelector('.player2Area');

    const player1Name = document.getElementById('player1Name');
    const player1Score = document.getElementById('player1Score');
    const player1CurrentScore = document.getElementById('player1CurrentScore');

    const player2Name = document.getElementById('player2Name');
    const player2Score = document.getElementById('player2Score');
    const player2CurrentScore = document.getElementById('player2CurrentScore');

    const diceImage = document.getElementById('diceImage'); // Reference to the dice image

    let activePlayer = 1;
    let scores = [0, 0];
    let currentScore = 0;
    let gameActive = true;

    // Array to hold paths to dice images
    const diceImages = [
        './Assets/1.webp',
        './Assets/2.webp',
        './Assets/3.webp',
        './Assets/4.webp',
        './Assets/5.webp',
        './Assets/6.webp'
    ];

    function initGame() {
        scores = [0, 0];
        currentScore = 0;
        activePlayer = 1;
        gameActive = true;

        player1Score.textContent = '0';
        player1CurrentScore.textContent = '0';
        player2Score.textContent = '0';
        player2CurrentScore.textContent = '0';

        // Reset background colors
        player1Area.style.backgroundColor = 'rgb(241, 188, 188)'; // Active color for Player 1
        player2Area.style.backgroundColor = 'rgba(236, 129, 129, 0.562)'; // Inactive color for Player 2

        // Set initial dice image
        diceImage.src = diceImages[4]; // Assuming the initial dice value is 5
    }

    function switchPlayer() {
        currentScore = 0;
        if (activePlayer === 1) {
            player1CurrentScore.textContent = '0';
            player1Area.style.backgroundColor = 'rgba(236, 129, 129, 0.562)'; // Inactive color for Player 1
            player2Area.style.backgroundColor = 'rgb(241, 188, 188)'; // Active color for Player 2
            activePlayer = 2;
        } else {
            player2CurrentScore.textContent = '0';
            player2Area.style.backgroundColor = 'rgba(236, 129, 129, 0.562)'; // Inactive color for Player 2
            player1Area.style.backgroundColor = 'rgb(241, 188, 188)'; // Active color for Player 1
            activePlayer = 1;
        }
    }

    function rollDice() {
        if (!gameActive) return;

        const dice = Math.floor(Math.random() * 6) + 1;
        console.log(`Dice rolled: ${dice}`);

        // Update dice image based on the rolled number
        diceImage.src = diceImages[dice - 1]; // Array is zero-indexed

        if (dice !== 1) {
            currentScore += dice;
            if (activePlayer === 1) {
                player1CurrentScore.textContent = currentScore;
            } else {
                player2CurrentScore.textContent = currentScore;
            }
        } else {
            switchPlayer();
        }
    }

    function hold() {
        if (!gameActive) return;

        scores[activePlayer - 1] += currentScore;

        if (activePlayer === 1) {
            player1Score.textContent = scores[0];
        } else {
            player2Score.textContent = scores[1];
        }

        if (scores[0] >= 100 || scores[1] >= 100) {
            alert(`Player ${activePlayer} wins!`);
            gameActive = false;
        } else {
            switchPlayer();
        }
    }

    newGameButton.addEventListener('click', initGame);
    rollDiceButton.addEventListener('click', rollDice);
    holdButton.addEventListener('click', hold);

    initGame(); // Initialize game on page load
});
