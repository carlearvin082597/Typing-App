let sentence = document.getElementById('sentence').textContent;
let inputArea = document.getElementById('input-area');
let timeDisplay = document.getElementById('time');
let wordCountDisplay = document.getElementById('word-count');
let wpmDisplay = document.getElementById('wpm');
let resetButton = document.getElementById('reset-button');

let time = 0;
let timer = null;
let wordCount = 0;
let isRunning = false;

// Starts the timer when the user starts typing
inputArea.addEventListener('input', function () {
    if (!isRunning) {
        timer = setInterval(startTimer, 1000);
        isRunning = true;
    }

    let typedtext = inputArea.value;
    // Split typed text by spaces to count words correctly
    wordCount = typedtext.trim().split(/\s+/).filter(word => word.length > 0).length;
    wordCountDisplay.textContent = wordCount;

    // Check if typed text matches the sentence, ignoring case and leading/trailing spaces
    if (typedtext.trim().toLowerCase() === sentence.toLowerCase()) {
        clearInterval(timer);
        inputArea.disabled = true;
    }

    let wpm = calculateWPM(wordCount, time);
    wpmDisplay.textContent = wpm;
});

// Timer function
function startTimer() {
    time++;
    timeDisplay.textContent = time;
}

// Calculate WPM
function calculateWPM(words, seconds) {
    let minute = seconds / 60;
    return Math.round(words / minute);
}

// Reset the test
resetButton.addEventListener('click', function () {
    clearInterval(timer);
    timer = null;
    time = 0;
    wordCount = 0;
    isRunning = false;
    timeDisplay.textContent = '0';
    wordCountDisplay.textContent = '0';
    wpmDisplay.textContent = '0';
    inputArea.disabled = false;
    inputArea.value = '';
});
