let minutes = 25;
let seconds = 0;
let timer;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');

startButton.addEventListener('click', function() {
    if (startButton.textContent === 'Start') {
        startTimer();
        startButton.textContent = 'Pause';
    } else {
        clearInterval(timer);
        startButton.textContent = 'Start';
    }
});

resetButton.addEventListener('click', function() {
    clearInterval(timer);
    minutes = 25;
    seconds = 0;
    updateDisplay();
    startButton.textContent = 'Start';
});

function startTimer() {
    timer = setInterval(function() {
        if (seconds === 0) {
            if (minutes === 0) {
                clearInterval(timer);
                alert('Time is up!');
                return;
            }
            minutes--;
            seconds = 59;
        } else {
            seconds--;
        }
        updateDisplay();
    }, 1000);
}

function updateDisplay() {
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
}
