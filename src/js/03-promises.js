const form = document.querySelector('.form');
// form.addEventListener('submit', createPromise);
form.addEventListener('submit', definePromise);
let positionInputValue = null;
let delayInputValue = null;
let firstDelayInputValue = null;
let finalValue = null;
function definePromise(e) {
  e.preventDefault();

  const { elements } = e.currentTarget;

  const { delay, step, amount } = elements;
  positionInputValue = Number(amount.value);
  delayInputValue = Number(step.value);
  firstDelayInputValue = Number(delay.value);
  finalValue = Number(firstDelayInputValue) + Number(delayInputValue);
  console.log(finalValue);
  // console.log(`Login: ${step.value}, Password: ${amount.value}`);
  // pos = value;
  // am = value1;
  // console.log(pos);
  // console.log(am);
  e.target.reset();

  createPromise()
    .then(({ position, delay }) => {
      console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      console.log(`❌ Rejected promise ${position} in ${delay}ms`);
    });

  createPromise(delayInputValue);
}

function createPromise(position, delay, delayInputValue) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position: positionInputValue, delay: finalValue });
      } else {
        reject({ position: positionInputValue, delay: finalValue });
      }
    }, delayInputValue);
  });
  console.log(promise);
}
