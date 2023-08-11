const login = document.querySelector('.login');
const loginBtn = document.getElementById('loginBtn');
const register = document.querySelector('.register');
const registerBtn = document.getElementById('registerBtn');

function loginPopup() {
  if (login.classList.contains('active')) {
    login.classList.remove('active');
    loginBtn.classList.remove('active');
  } else {
    if (register.classList.contains('active')) {
        registerBtn.classList.remove('active');
        setTimeout(() => {
            register.classList.remove('active');
        }, 500);
    }
    login.classList.add('active');
    loginBtn.classList.add('active');
  }
}

function registerPopup() {
  if (register.classList.contains('active')) {
    register.classList.remove('active');
    registerBtn.classList.remove('active');
  } else {
    if (login.classList.contains('active')) {
        loginBtn.classList.remove('active');
        setTimeout(() => {
            login.classList.remove('active');
        }, 500);
    }
    register.classList.add('active');
    registerBtn.classList.add('active');
  }
}