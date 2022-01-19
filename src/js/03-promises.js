const form = document.querySelector('.form');

form.addEventListener('submit', definePromise);

let amountValue = null;
let delayTime = null;
let firstDelayInputValue = null;

function definePromise(e) {
  e.preventDefault();

  const { elements } = e.currentTarget;

  const { delay, step, amount } = elements;
  amountValue = Number(amount.value);
  delayTime = Number(step.value);
  firstDelayInputValue = Number(delay.value);

  generatePromises(amountValue, firstDelayInputValue);

  e.target.reset();

  function generatePromises(amountValue, firstDelayInputValue) {
    let position = null;

    for (let i = 0; i < amountValue; i++) {
      if (i > 0) {
        firstDelayInputValue += delayTime;
      }

      position += 1;
      // delayTime += firstDelayInputValue
      createPromise(position, firstDelayInputValue)
        .then(({ position, delayTime }) => {
          console.log(`✅ Fulfilled promise ${position} in ${delayTime}ms`);
        })
        .catch(({ position, delayTime }) => {
          console.log(`❌ Rejected promise ${position} in ${delayTime}ms`);
        });

      function createPromise(position, delayTime) {
        const shouldResolve = Math.random() > 0.3;
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            if (shouldResolve) {
              resolve({ position, delayTime });
            } else {
              reject({ position, delayTime });
            }
          }, firstDelayInputValue);
        });
      }
    }
  }
}
