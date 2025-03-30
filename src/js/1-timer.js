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
        iziToast.info({
            title: 'Info',
            message: 'Please choose a date in the future',
        });
        startButton.disabled = true;
    } else {
        userSelectedDate = selectedDate;
        startButton.disabled = false;
    } 
}

