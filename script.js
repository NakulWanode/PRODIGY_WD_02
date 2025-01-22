let [milliseconds, seconds, minutes] = [0, 0, 0];
let interval;
let lapTimes = [];

const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const stopwatchDisplay = document.getElementById('stopwatch');
const lapList = document.getElementById('lapList');

startBtn.addEventListener('click', startStopwatch);
pauseBtn.addEventListener('click', pauseResumeStopwatch);
resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', recordLap);

function startStopwatch() {
  interval = setInterval(updateTime, 10);
  startBtn.disabled = true;
  pauseBtn.disabled = false;
}

function pauseResumeStopwatch() {
  if (interval) {
    clearInterval(interval);
    interval = null;
    pauseBtn.textContent = "Resume";
  } else {
    startStopwatch();
    pauseBtn.textContent = "Pause";
  }
}

function resetStopwatch() {
  clearInterval(interval);
  interval = null;
  milliseconds = 0;
  seconds = 0;
  minutes = 0;
  stopwatchDisplay.textContent = "00:00:00";
  startBtn.disabled = false;
  pauseBtn.disabled = true;
  lapTimes = [];
  lapList.innerHTML = ""; 
}

function updateTime() {
  milliseconds += 10;
  if (milliseconds === 1000) {
    milliseconds = 0;
    seconds++;
  }
  if (seconds === 60) {
    seconds = 0;
    minutes++;
  }

  let millisecondsStr = milliseconds < 10 ? "00" + milliseconds : milliseconds < 100 ? "0" + milliseconds : milliseconds;
  let secondsStr = seconds < 10 ? "0" + seconds : seconds;
  let minutesStr = minutes < 10 ? "0" + minutes : minutes;

  stopwatchDisplay.textContent = minutesStr + ":" + secondsStr + ":" + millisecondsStr;
}

function recordLap() {
  let millisecondsStr = milliseconds < 10 ? "00" + milliseconds : milliseconds < 100 ? "0" + milliseconds : milliseconds;
  let secondsStr = seconds < 10 ? "0" + seconds : seconds;
  let minutesStr = minutes < 10 ? "0" + minutes : minutes; 

  let lapTime = `${minutesStr}:${secondsStr}:${millisecondsStr}`; 
  lapTimes.push(lapTime);

  lapList.innerHTML = "";
  for (let i = 0; i < lapTimes.length; i++) {
    let listItem = document.createElement('li');
    listItem.textContent = `Lap ${i + 1}: ${lapTimes[i]}`;
    lapList.appendChild(listItem);
  }
}