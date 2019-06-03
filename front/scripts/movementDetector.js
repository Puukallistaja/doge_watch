const dogeImage = document.querySelector('img')
const dogeImageRect = dogeImage.getBoundingClientRect()

function getRandomNrBetweenRange(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandomColor() {
  return [
    'red',
    'green',
    'orange',
    'blue',
    'purple',
    'gray',
  ][Math.floor(Math.random() * 6)];
}
function getRandomLocation() {
  return [
       'TOP_LEFT', 'TOP_RIGHT',
           'LEFT', 'RIGHT',
    'BOTTOM_LEFT', 'BOTTOM_RIGHT',
  ][Math.floor(Math.random() * 6)];
}

function sayWoof(msg) {
  const newWoof = document.createElement("span")

  newWoof.classList.add('woof')
  newWoof.appendChild(document.createTextNode(msg))
  newWoof.setAttribute("style", 
    `transform: translate(${getRandomNrBetweenRange(-10, 10)}rem, ${getRandomNrBetweenRange(-10, 10)}rem);
     color: ${getRandomColor()}
    `);
  document.querySelector('body').appendChild(newWoof)
}

sayWoof('wow')
sayWoof('so krypto')
sayWoof('much coin')
sayWoof('prices')

export default (function motionDetector() {
  const mousePosition = {isMoving: false };
  
  document.addEventListener(
    "mousemove",
    () => {
      mousePosition.isMoving = true;
      setTimeout(() => {
        mousePosition.isMoving = false;
      }, 1000);
    },
    false
  );

  return {
    pointer: mousePosition
  };
})();
