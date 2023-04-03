// function createPromise(position, delay) {
//   const shouldResolve = Math.random() > 0.3;
//   if (shouldResolve) {
//     // Fulfill
//   } else {g
//     // Reject
//   }
// }
import Notiflix from 'notiflix';

const form = document.querySelector('.form');
form.addEventListener('submit', onButtonSubmitClick);

function onButtonSubmitClick(event) {
  event.preventDefault();

  let delay = Number(event.target.elements.delay.value);
  for (let i = 1; i <= event.target.elements.amount.value; i += 1) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`,
          { useIcon: false }
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`,
          { useIcon: false }
        );
      });
    delay += Number(event.target.elements.step.value);
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}