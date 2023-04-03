import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const start = document.querySelector('[data-start]');
const daysRef = document.querySelector('[data-days]');
const hoursRef = document.querySelector('[data-hours]');
const minutesRef = document.querySelector('[data-minutes]');
const secondsRef = document.querySelector('[data-seconds]');
let selectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    if (selectedDate.getTime() < new Date().getTime()) {
      start.setAttribute('disabled', '');
      return Notiflix.Notify.failure('Please choose a date in the future', {
        position: 'center-top',
      });
    } else {
      start.removeAttribute('disabled');
    }
  },
};

flatpickr('#datetime-picker', options);

start.addEventListener('click', onButtonStartClick);

function onButtonStartClick() {
  const intervalId = setInterval(() => {
    const { days, hours, minutes, seconds } = convertMs(
      selectedDate.getTime() - new Date().getTime()
    );

    daysRef.textContent = addLeadingZero(days);
    hoursRef.textContent = addLeadingZero(hours);
    minutesRef.textContent = addLeadingZero(minutes);
    secondsRef.textContent = addLeadingZero(seconds);

    if (selectedDate.getTime() - new Date().getTime() <= 0) {
      clearInterval(intervalId);
      daysRef.textContent = '00';
      hoursRef.textContent = '00';
      minutesRef.textContent = '00';
      secondsRef.textContent = '00';
    }
  }, 1000);
}

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

function addLeadingZero(value) {
  return value.toString().padStart(2, 0);
}