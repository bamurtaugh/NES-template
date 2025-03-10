const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Serve static files from public directory
app.use(express.static('public'));
app.use(express.json());

// List of possible words, each is 5 letters long
const WORDS = ['WORLD', 'QUICK', 'HAPPY', 'BRAIN', 'HOUSE'];
let currentWord = WORDS[Math.floor(Math.random() * WORDS.length)];

app.post('/guess', (req, res) => {
    const guess = req.body.guess.toUpperCase();
    if (guess.length !== 5) {
        return res.json({ error: 'Guess must be 5 letters' });
    }

    const result = [];
    const word = currentWord.split('');
    const guessArr = guess.split('');

    // Check for correct letters in correct positions
    for (let i = 0; i < 5; i++) {
        if (guessArr[i] === word[i]) {
            result[i] = 'correct';
        } else if (word.includes(guessArr[i])) {
            result[i] = 'present';
        } else {
            result[i] = 'absent';
        }
    }

    const isWin = guess === currentWord;
    if (isWin) {
        currentWord = WORDS[Math.floor(Math.random() * WORDS.length)];
    }

    res.json({ result, isWin });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});