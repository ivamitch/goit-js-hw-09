import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const textInput = document.getElementById('datetime-picker');
const startButton = document.querySelector('button[data-start]');
const daysEl = document.querySelector('span[data-days]');
const hoursEl = document.querySelector('span[data-hours]');
const minutesEl = document.querySelector('span[data-minutes]');
const secondsEl = document.querySelector('span[data-seconds]');

let utcTime = 0;
startButton.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        utcTime = selectedDates[0].getTime();
        if (utcTime < options.defaultDate) {
            Notiflix.Notify.failure("Please choose a date in the future");
        } else {
            startButton.disabled = false;
        }
    console.log(selectedDates[0]);
  },
};

startButton.addEventListener('click', onStartClick)

flatpickr(textInput, options);




function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}



function onStartClick() { 
    textInput.disabled = true;

    const indervalId = setInterval(() => { 
        const currentTime = Date.now();
        const restTime = utcTime - currentTime;
        const convertedTime = convertMs(restTime);
        spanTimeUpdate(convertedTime);

        if (restTime < 1000) {
        clearInterval(indervalId)
        textInput.disabled = false;
        Notiflix.Notify.success('Countdown is finished!');
    }
    }, 1000)
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function spanTimeUpdate({ days, hours, minutes, seconds }) { 
    daysEl.textContent = addLeadingZero(days);
    hoursEl.textContent = addLeadingZero(hours);
    minutesEl.textContent = addLeadingZero(minutes);
    secondsEl.textContent = addLeadingZero(seconds);
}


