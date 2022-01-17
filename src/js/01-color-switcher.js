const startColorChangeBtn = document.querySelector('[data-start]');
const stopColorChangeBtn = document.querySelector('[data-stop]');

startColorChangeBtn.classList.add('color-switcher__start');
stopColorChangeBtn.classList.add('color-switcher__stop');

startColorChangeBtn.addEventListener('click', onStartColorChangeBtn);
stopColorChangeBtn.addEventListener('click', onStopColorChangeBtn);

const COLOR_CHANGE_DELAY = 1000;
let timeoutid = null;

function onStartColorChangeBtn() {
  timeoutid = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, COLOR_CHANGE_DELAY);

  startColorChangeBtn.setAttribute('disabled', true);
  stopColorChangeBtn.removeAttribute('disabled');
}

function onStopColorChangeBtn() {
  clearInterval(timeoutid);
  stopColorChangeBtn.setAttribute('disabled', true);
  startColorChangeBtn.removeAttribute('disabled');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
