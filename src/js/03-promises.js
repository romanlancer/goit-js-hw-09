const form = document.querySelector('.form');

form.addEventListener('submit', definePromise);

let positionInputValue = null;
let delayInputValue = null;
let firstDelayInputValue = null;

function definePromise(e) {
  e.preventDefault();

  const { elements } = e.currentTarget;

  const { delay, step, amount } = elements;
  positionInputValue = Number(amount.value);
  delayInputValue = Number(step.value);
  firstDelayInputValue = Number(delay.value);

  generatePromises(positionInputValue);

  e.target.reset();

  function generatePromises(positionInputValue) {
    for (let i = 0; i < positionInputValue; i++) {
      createPromise()
        .then(({ position, delay }) => {
          console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        });
    }
    let init = null;
    firstDelayInputValue = Number(delay.value);
    function createPromise() {
      const shouldResolve = Math.random() > 0.3;
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (shouldResolve) {
            resolve({
              position: (init += 1),
              delay: (firstDelayInputValue += delayInputValue),
            });
          } else {
            reject({
              position: (init += 1),
              delay: (firstDelayInputValue += delayInputValue),
            });
          }
        }, (firstDelayInputValue += delayInputValue));
      });
    }
  }
}
