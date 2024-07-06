let hasToken = localStorage.getItem('token');
console.log(hasToken);

const loginButton = document.querySelector('.btn-login');

const validateSession = () => {
    let loginCard = document.getElementById('login-card');
    let logoutButton = document.getElementById('logoutHome');
    let avatarLogin = document.getElementById('avatar-login');
    let loginNav = document.getElementById('loginBtnNav');
    hasToken = localStorage.getItem('token');
    if(!hasToken) {
        loginCard.classList.remove('d-none');
        logoutButton.classList.add('d-none');
        avatarLogin.classList.add('d-none');
        loginNav.classList.remove('d-none');
    } else {
        loginCard.classList.add('d-none');
        logoutButton.classList.remove('d-none');
        avatarLogin.classList.remove('d-none');
        loginNav.classList.add('d-none');
    }
};

// Agregar un evento de clic al botón de inicio de sesión
loginButton.addEventListener('click', () => {
    validateSession(); // Validar la sesión al hacer clic en el botón de inicio de sesión
});

// Llamada inicial para validar la sesión al cargar la página
validateSession();
loginButton.addEventListener('click', () => {
    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
    localStorage.setItem('token', token);
    //window.location.href = 'index.html';
    validateSession();
});

// funcion para remover token, simular cierre de sesion
const logout = () => {
    localStorage.removeItem('token');
    // Actualizar hasToken después de eliminar el token
    hasToken = localStorage.getItem('token');
    validateSession();
};

// logout 
const logoutButton = document.getElementById('logoutHome');
if (logoutButton) {
    logoutButton.addEventListener('click', () => {
        logout();
    });
};

//export { hasToken, validateSession, loginButton, logoutButton, logout };