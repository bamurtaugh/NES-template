class WordleGame {
    constructor() {
        this.currentRow = 0;
        this.currentCol = 0;
        this.gameOver = false;
        this.setupGrid();
        this.setupKeyboardListener();
    }

    setupGrid() {
        const grid = document.getElementById('grid');
        for (let i = 0; i < 6; i++) {
            const row = document.createElement('div');
            row.className = 'row';
            for (let j = 0; j < 5; j++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                row.appendChild(cell);
            }
            grid.appendChild(row);
        }
    }

    setupKeyboardListener() {
        document.addEventListener('keydown', (e) => {
            if (this.gameOver) return;
            
            if (e.key === 'Enter') {
                this.submitGuess();
            } else if (e.key === 'Backspace') {
                this.deleteLetter();
            } else if (/^[a-zA-Z]$/.test(e.key) && this.currentCol < 5) {
                this.addLetter(e.key);
            }
        });
    }

    addLetter(letter) {
        if (this.currentCol < 5) {
            const cell = this.getCell(this.currentRow, this.currentCol);
            cell.textContent = letter.toUpperCase();
            this.currentCol++;
        }
    }

    deleteLetter() {
        if (this.currentCol > 0) {
            this.currentCol--;
            const cell = this.getCell(this.currentRow, this.currentCol);
            cell.textContent = '';
        }
    }

    async submitGuess() {
        if (this.currentCol !== 5) return;

        const guess = this.getCurrentGuess();
        const response = await fetch('/guess', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ guess })
        });
        const data = await response.json();

        if (data.error) {
            alert(data.error);
            return;
        }

        this.updateColors(data.result);

        if (data.isWin) {
            document.getElementById('message').textContent = 'Congratulations! You won!';
            this.gameOver = true;
        } else if (this.currentRow === 5) {
            document.getElementById('message').textContent = 'Game Over!';
            this.gameOver = true;
        } else {
            this.currentRow++;
            this.currentCol = 0;
        }
    }

    getCurrentGuess() {
        let guess = '';
        for (let i = 0; i < 5; i++) {
            guess += this.getCell(this.currentRow, i).textContent;
        }
        return guess;
    }

    updateColors(result) {
        for (let i = 0; i < 5; i++) {
            const cell = this.getCell(this.currentRow, i);
            cell.classList.add(result[i]);
        }
    }

    getCell(row, col) {
        return document.querySelector(`.grid .row:nth-child(${row + 1}) .cell:nth-child(${col + 1})`);
    }
}

new WordleGame();