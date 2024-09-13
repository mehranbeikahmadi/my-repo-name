const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Constants
const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [{ x: 10, y: 10 }];
let food = { x: Math.floor(Math.random() * tileCount), y: Math.floor(Math.random() * tileCount) };
let dx = 1;
let dy = 0;
let score = 0;

// Draw the snake
function drawSnake() {
    snake.forEach(part => {
        ctx.fillStyle = 'lime';
        ctx.fillRect(part.x * gridSize, part.y * gridSize, gridSize, gridSize);
    });
}

// Move the snake
function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };

    // Check for wall collisions
    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount || collision(head)) {
        resetGame();
        return;
    }

    // Add new head to snake
    snake.unshift(head);

    // Check if snake eats food
    if (head.x === food.x && head.y === food.y) {
        score++;
        placeFood();
    } else {
        snake.pop(); // Remove last tail part
    }
}

// Draw food
function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
}

// Place food in random location
function placeFood() {
    food.x = Math.floor(Math.random() * tileCount);
    food.y = Math.floor(Math.random() * tileCount);
}

// Check if snake collides with itself
function collision(head) {
    return snake.some(part => part.x === head.x && part.y === head.y);
}

// Reset the game
function resetGame() {
    snake = [{ x: 10, y: 10 }];
    dx = 1;
    dy = 0;
    score = 0;
    placeFood();
}

// Update the game
function update() {
    moveSnake();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake();
    drawFood();
}

// Control the snake
document.addEventListener('keydown', (event) => {
    if (event.code === 'ArrowUp' && dy === 0) {
        dx = 0;
        dy = -1;
    }
    if (event.code === 'ArrowDown' && dy === 0) {
        dx = 0;
        dy = 1;
    }
    if (event.code === 'ArrowLeft' && dx === 0) {
        dx = -1;
        dy = 0;
    }
    if (event.code === 'ArrowRight' && dx === 0) {
        dx = 1;
        dy = 0;
    }
});

// Start the game loop
setInterval(update, 100);
