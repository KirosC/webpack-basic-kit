import '../assets/css/main.scss';

window.onload = function () {
  let btn = document.querySelector(".btn");

  btn.addEventListener("click", alertPop);

  function alertPop() {
    alert('Hello World!');
  }
};