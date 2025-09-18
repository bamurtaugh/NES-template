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
            row.setAttribute('role', 'row');
            row.setAttribute('aria-label', `Row ${i + 1}`);
            for (let j = 0; j < 5; j++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.setAttribute('role', 'gridcell');
                cell.setAttribute('aria-label', `Row ${i + 1}, Column ${j + 1}`);
                cell.setAttribute('tabindex', '-1');
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
            cell.setAttribute('aria-label', `Row ${this.currentRow + 1}, Column ${this.currentCol + 1}: ${letter.toUpperCase()}`);
            this.currentCol++;
            this.announceGameState();
        }
    }

    deleteLetter() {
        if (this.currentCol > 0) {
            this.currentCol--;
            const cell = this.getCell(this.currentRow, this.currentCol);
            cell.textContent = '';
            cell.setAttribute('aria-label', `Row ${this.currentRow + 1}, Column ${this.currentCol + 1}: empty`);
            this.announceGameState();
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
            const statusElement = document.getElementById('game-status');
            statusElement.textContent = `Error: ${data.error}`;
            alert(data.error);
            return;
        }

        this.updateColors(data.result);

        if (data.isWin) {
            document.getElementById('message').textContent = 'Congratulations! You won!';
            document.getElementById('game-status').textContent = 'Game completed successfully! You guessed the word!';
            this.gameOver = true;
        } else if (this.currentRow === 5) {
            document.getElementById('message').textContent = 'Game Over!';
            document.getElementById('game-status').textContent = 'Game over! You ran out of attempts.';
            this.gameOver = true;
        } else {
            this.currentRow++;
            this.currentCol = 0;
            document.getElementById('game-status').textContent = `Moving to row ${this.currentRow + 1}. ${6 - this.currentRow} attempts remaining.`;
        }
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
        const statusElement = document.getElementById('game-status');
        let announcement = '';
        
        for (let i = 0; i < 5; i++) {
            const cell = this.getCell(this.currentRow, i);
            const letter = cell.textContent;
            const status = result[i];
            
            // Add new class
            cell.classList.add(status);
            
            // Update aria-label with status information
            let statusText = '';
            if (status === 'correct') {
                statusText = 'correct position';
            } else if (status === 'present') {
                statusText = 'wrong position';
            } else {
                statusText = 'not in word';
            }
            
            cell.setAttribute('aria-label', `Row ${this.currentRow + 1}, Column ${i + 1}: ${letter}, ${statusText}`);
            announcement += `${letter}: ${statusText}. `;
        }
        
        // Announce the results to screen readers
        statusElement.textContent = `Row ${this.currentRow + 1} results: ${announcement}`;
    }

    getCell(row, col) {
        return document.querySelector(`.grid .row:nth-child(${row + 1}) .cell:nth-child(${col + 1})`);
    }

    announceGameState() {
        const statusElement = document.getElementById('game-status');
        const currentGuess = this.getCurrentGuess();
        const remainingLetters = 5 - this.currentCol;
        
        if (remainingLetters === 0) {
            statusElement.textContent = `Current guess: ${currentGuess}. Press Enter to submit.`;
        } else {
            statusElement.textContent = `Current guess: ${currentGuess}. ${remainingLetters} letters remaining.`;
        }
    }
}

new WordleGame();