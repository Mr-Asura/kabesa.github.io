const passwordInput = document.getElementById('password1');
const confirmPasswordInput = document.getElementById('confirmPassword1');
const error = document.getElementById('error');

function checkPasswords() {
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (password !== confirmPassword) {
        error.style.opacity = 1;
    } else {
        error.style.opacity = 0;
    }
}

confirmPasswordInput.addEventListener('input', checkPasswords);
confirmPasswordInput.addEventListener('blur', checkPasswords);

document.getElementById('register').addEventListener('submit', function (event) {
    event.preventDefault();

    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (password !== confirmPassword) {
        error.style.opacity = 1;
    } else {
        error.style.opacity = 0;
        window.location = '../system/register.php';
    }
});

