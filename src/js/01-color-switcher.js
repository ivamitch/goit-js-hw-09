const startButton = document.querySelector('button[data-start]');
const stopButton = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
let intervalId = null;

stopButton.disabled = true


startButton.addEventListener('click', onStartClick);
stopButton.addEventListener('click', onStopClick);

function onStartClick() { 
    intervalId = setInterval(() => { 
        body.style.backgroundColor = getRandomHexColor()
    }, 1000)

    startButton.setAttribute('disabled', 'disabled');
    stopButton.removeAttribute('disabled');
};

function onStopClick() { 
    startButton.removeAttribute('disabled');
    stopButton.setAttribute('disabled', 'disabled');

    clearInterval(intervalId)
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

