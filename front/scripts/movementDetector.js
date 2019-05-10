const dogeImage = document.querySelector('img')
const dogeImageStyles = dogeImage.getBoundingClientRect()

const imageProps = {
  width: dogeImageStyles.width,
  height: dogeImageStyles.height,
}

function sayWoof(msg) {
  const newWoof = document.createElement("span")

  newWoof.classList.add('woof')
  newWoof.appendChild(document.createTextNode(msg))
  
  document.querySelector('body').appendChild(newWoof)
}

sayWoof('wow')

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
