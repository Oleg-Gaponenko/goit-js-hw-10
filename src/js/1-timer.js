import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose: handleOnClose,
  };

const newInput = document.querySelector('#datetime-picker');
flatpickr(newInput, options);

let userSelectedDate = [];
const startButton = document.querySelector('.button-start');

function handleOnClose (selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();

    if(selectedDate <= currentDate){
        iziToast.error({
            title: 'Error',
            message: 'Please choose a date in the future',
        });
        startButton.disabled = true;
    } else {
        userSelectedDate = selectedDate;
        startButton.disabled = false;
    } 
}

startButton.addEventListener('click', handleClick);

function handleClick() {
    if(!userSelectedDate) return;

    startButton.disabled = true;
    let timeInterval;

    if(timeInterval) return;

    timeInterval = setInterval(() => {
        const currentTime = new Date().getTime();
        const deltaTime = userSelectedDate - currentTime;

        if(deltaTime <= 0){
            clearInterval(timeInterval);
            updateTime(0);
            newInput.disabled = false;
            return;
        } else {
            updateTime(deltaTime);
        }
    }, 1000);
}

const timer = document.querySelector('.timer');
const turnaroundDays = document.querySelector('[days]');
const turnaroundHours = document.querySelector('[hours]');
const turnaroundMinutes = document.querySelector('[minutes]');
const turnaroundSeconds = document.querySelector('[seconds]')

function updateTime(ms){
    const {days, hours, minutes, seconds} = convertMs(ms);
    turnaroundDays = correctDisplay(days);
    turnaroundHours = correctDisplay(hours);
    turnaroundMinutes = correctDisplay(minutes);
    turnaroundSeconds = correctDisplay(seconds);
}

function correctDisplay(timeNotion){
    return String(timeNotion).padStart(2, '0');
}

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }
  