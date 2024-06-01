let startTime, updatedTime, difference;
let interval;
let isRunning = false;
let laps = [];

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsContainer = document.getElementById('laps');

startButton.addEventListener('click', start);
pauseButton.addEventListener('click', pause);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', recordLap);

function start() {
    if (!isRunning) {
        startTime = Date.now() - (difference || 0);
        interval = setInterval(updateTime, 10); // Update every 10 milliseconds
        isRunning = true;
    }
}

function pause() {
    if (isRunning) {
        clearInterval(interval);
        difference = Date.now() - startTime;
        isRunning = false;
    }
}

function reset() {
    clearInterval(interval);
    startTime = null;
    updatedTime = null;
    difference = null;
    isRunning = false;
    display.innerHTML = '00:00:00.000';
    laps = [];
    lapsContainer.innerHTML = '';
}

function updateTime() {
    updatedTime = new Date(Date.now() - startTime);
    const minutes = pad(updatedTime.getUTCMinutes());
    const seconds = pad(updatedTime.getUTCSeconds());
    const milliseconds = padMilliseconds(updatedTime.getUTCMilliseconds());
    const hours = pad(updatedTime.getUTCHours());
    display.innerHTML = `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

function pad(number) {
    return number < 10 ? '0' + number : number;
}

function padMilliseconds(number) {
    if (number < 10) {
        return '00' + number;
    } else if (number < 100) {
        return '0' + number;
    } else {
        return number;
    }
}

function recordLap() {
    if (isRunning) {
        const lapTime = display.innerHTML;
        laps.push(lapTime);
        const lapElement = document.createElement('div');
        lapElement.classList.add('lap');
        lapElement.textContent = `Lap ${laps.length}: ${lapTime}`;
        lapsContainer.appendChild(lapElement);
    }
}
