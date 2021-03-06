import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
require('flatpickr/dist/themes/material_blue.css');

Notiflix.Notify.init({
  fontSize: '20px',
  position: 'center-top',
});

const clearButton = document.createElement('button');
clearButton.classList.add('reset');
clearButton.textContent = 'Reset';
document.body.append(clearButton);

const startButton = document.querySelector('[data-start]');
const resetButton = document.querySelector('.reset');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');
startButton.setAttribute('disabled', true);
resetButton.setAttribute('disabled', true);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= options.defaultDate) {
      startButton.setAttribute('disabled', true);
      resetButton.setAttribute('disabled', true);
      Notiflix.Notify.failure('wrong date bro');
    } else {
      startButton.removeAttribute('disabled');
      resetButton.removeAttribute('disabled');
      Notiflix.Notify.success('go ahead bro');
    }
  },
};
const fp = flatpickr('#datetime-picker', options);

class Timer {
  constructor({ onStart }) {
    this.selectedTime = null;
    this.intervalId = null;
    this.onStart = onStart;
  }
  start() {
    clearInterval(this.intervalId);
    this.selectedTime = fp.selectedDates[0].getTime();

    this.intervalId = setInterval(() => {
      const deltaTime = this.selectedTime - Date.now();

      if (deltaTime < 0) {
        clearInterval(this.intervalId);
        return;
      }

      const convertedTime = this.convertMs(deltaTime);
      this.onStart(convertedTime);
    }, 1000);

    if (this.selectedTime) {
      startButton.setAttribute('disabled', true);
    }
  }

  addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }

  reset() {
    clearInterval(this.intervalId);
    fp.setDate(Date.now());

    if (!this.start()) {
      resetButton.setAttribute('disabled', true);
    }

    this.onStart(this.convertMs(0));
  }

  convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    // Remaining days
    const days = this.addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = this.addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = this.addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
    return { days, hours, minutes, seconds };
  }
}

const timer = new Timer({
  onStart: updateClockInterface,
});

startButton.addEventListener('click', timer.start.bind(timer));
resetButton.addEventListener('click', timer.reset.bind(timer));

function updateClockInterface({ days, hours, minutes, seconds }) {
  daysEl.textContent = `${days}`;
  hoursEl.textContent = `${hours}`;
  minutesEl.textContent = `${minutes}`;
  secondsEl.textContent = `${seconds}`;
}
