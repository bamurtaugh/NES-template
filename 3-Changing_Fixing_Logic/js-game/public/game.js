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
            row.setAttribute('aria-label', `Guess ${i + 1}`);
            
            for (let j = 0; j < 5; j++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.setAttribute('role', 'gridcell');
                cell.setAttribute('aria-label', `Letter ${j + 1}`);
                cell.setAttribute('tabindex', '0');
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
            cell.setAttribute('aria-label', `Letter ${this.currentCol + 1}: ${letter.toUpperCase()}`);
            this.currentCol++;
        }
    }

    deleteLetter() {
        if (this.currentCol > 0) {
            this.currentCol--;
            const cell = this.getCell(this.currentRow, this.currentCol);
            cell.textContent = '';
            cell.setAttribute('aria-label', `Letter ${this.currentCol + 1}: empty`);
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
        const announcements = [];
        for (let i = 0; i < 5; i++) {
            const cell = this.getCell(this.currentRow, i);
            const letter = cell.textContent;
            const status = result[i];
            cell.classList.add(status);
            
            let statusText = '';
            switch (status) {
                case 'correct':
                    statusText = 'correct position';
                    break;
                case 'present':
                    statusText = 'wrong position';
                    break;
                case 'absent':
                    statusText = 'not in word';
                    break;
            }
            
            cell.setAttribute('aria-label', `Letter ${i + 1}: ${letter}, ${statusText}`);
            announcements.push(`${letter}: ${statusText}`);
        }
        
        // Announce the results to screen readers
        const announcementDiv = document.getElementById('game-announcements');
        announcementDiv.textContent = `Row ${this.currentRow + 1} results: ${announcements.join(', ')}`;
    }

    getCell(row, col) {
        return document.querySelector(`.grid .row:nth-child(${row + 1}) .cell:nth-child(${col + 1})`);
    }
}

new WordleGame();