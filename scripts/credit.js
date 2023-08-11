const creditBtn = document.getElementById('creditsBtn');
const alert = document.querySelector('.alert');
const alertTxt = document.getElementById('alert-text');

let typeOnce;
function alertWindow() {
    alert.classList.toggle('active');
    if (!typeOnce) {
        setTimeout(() => typeText(alertCredit, alertTxt), 100);
        typeOnce = true;
    }
}

// The dot is the newline function
const alertCredit = "WebDesign by: Ammaron Oliveros. Art Photo by: Giulia Gentilini. Link: /.. +";
const artPhotoLink = '<a href="https://bit.ly/3OrlGo6" target="_blank">https://bit.ly/3OrlGo6</a>';
const click2Close = '<center>(Press anywhere to close window)</center>';
const typingSpeed = 60;

function typeText(text, element) {
  let currentIndex = 0;
  const typingInterval = setInterval(() => {
    if (currentIndex >= text.length) {
      clearInterval(typingInterval);
      return;
    }
    element.innerHTML += text[currentIndex] === '.' ? '<br>' : text[currentIndex] === '/' ? artPhotoLink : text[currentIndex] === '+' ? click2Close : text[currentIndex];
    currentIndex++;
  }, typingSpeed);
}