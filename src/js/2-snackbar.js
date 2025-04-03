import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const form = document.querySelector('.form');
form.addEventListener('submit', handleSubmit);

function handleSubmit(event){
    event.preventDefault();

    const delay = Number(event.target.elements.delay.value);
    const checkboxState = event.target.elements.state.value;
    
   const promiseGenerator = new Promise((resolve, reject) => {
    setTimeout(() =>{
        if(checkboxState === 'fulfilled'){
            resolve(delay);
        } else {
            reject(delay);
        }
    }, delay);

    form.reset();
});

promiseGenerator
    .then((delay) => {
        iziToast.success({
            message: `✅ Fulfilled promise in ${delay}ms`,
            position: "topRight",
        });
    })
    .catch((delay) => {
        iziToast.error({
            message: `❌ Rejected promise in ${delay}ms`,
            position: "topRight",
        });
    })
}