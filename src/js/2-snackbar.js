import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');
form.addEventListener('submit', handleSubmit);
const radioButton = document.querySelector('.state-input');
const delayInput = document.querySelector('.delay-input-form');

function handleSubmit(event){
    event.preventDefault();

    const delay = event.elements.delay.value;
    const checkboxState = event.elements.state.value;
    
    const promiseGenerator = new Promise((resolve, reject) => {
    setTimeout(() =>{
        if(checkboxState === 'fulfilled'){
            resolve(
                iziToast.success({
                Message: `Fulfilled promise in ${delay}ms`
            }));
        } else {
            reject(
                iziToast.error({
                    message: `Rejected promise in ${delay}ms`
                })
            )
        }
    }, delay)
});

    promiseGenerator
        .then(value => console.log(value))
        .catch(error => console.log(error))
}