// let hasToken = localStorage.getItem('token')
// console.log(hasToken);

// const isLogged = () => {
//     let thereToken = localStorage.getItem('token');
//     return thereToken ? true : false;
// }

// const loginFormButton = document.getElementById('loginForm');

// loginFormButton.addEventListener('click', () => {
//     let token = 'eyJhbGciOiJIUzI1NiIs5c'
//     localStorage.setItem('token', token);
//     window.location.href = '../index.html';
//     //validateSession();
// });

const loginFormButton = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

// Validar con Regex el formato de entrada
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

loginFormButton.addEventListener('click', (event) => {
    event.preventDefault();
    
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (email === "" || !isValidEmail(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    if (password === "") {
        alert("Please enter your password.");
        return;
    }

    // Simulación de inicio de sesión 
    let token = 'eyJhbGciOiJIUzI1NiIs5c';
    localStorage.setItem('token', token);
    window.location.href = '../index.html';
});


// export { hasToken, validateSession, loginButton, logoutButton, logout };