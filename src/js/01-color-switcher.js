const startColorChangeBtn = document.querySelector('button[data-start]');
const stopColorChangeBtn = document.querySelector('button[data-stop]');
const bodyColor = document.querySelector('body');
console.log(startColorChangeBtn);

startColorChangeBtn.addEventListener('click', onStartColorChangeBtn);
stopColorChangeBtn.addEventListener('click', onStopColorChangeBtn);
const COLOR_CHANGE_DELAY = 1000;
let timeoutid = null;

function onStartColorChangeBtn() {
  timeoutid = setInterval(() => {
    bodyColor.style.backgroundColor = getRandomHexColor();
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
