import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
require('flatpickr/dist/themes/material_blue.css');

const startButton = document.querySelector('button[data-start]');
const daysEl = document.querySelector('span[data-days]');
const hoursEl = document.querySelector('span[data-hours]');
const minutesEl = document.querySelector('span[data-minutes]');
const secondsEl = document.querySelector('span[data-seconds]');

const options = {
  altInput: true,
  altFormat: 'F j, Y (h:S K)',
  dateFormat: 'Y-m-d H:i',
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= options.defaultDate) {
      startButton.setAttribute('disabled', true);
      Notiflix.Notify.failure('wrong date bro');
    } else {
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
    this.isActive = true;
  }
  Start() {
    if (fp.selectedDates[0]) {
      clearInterval(this.intervalId);
    }

    this.selectedTime = fp.selectedDates[0].getTime();

    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = this.selectedTime - currentTime;
      const convertedTime = this.convertMs(deltaTime);
      this.onStart(convertedTime);
    }, 1000);
  }

  addLeadingZero(value) {
    return String(value).padStart(2, '0');
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

startButton.addEventListener('click', timer.Start.bind(timer));

function updateClockInterface({ days, hours, minutes, seconds }) {
  daysEl.textContent = `${days}`;
  hoursEl.textContent = `${hours}`;
  minutesEl.textContent = `${minutes}`;
  secondsEl.textContent = `${seconds}`;
}
