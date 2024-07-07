import { renderAllPosts } from "./modules/components.js";
import { getData, getPostById } from "./modules/requestsApi.js";

let hasToken = localStorage.getItem("token");
console.log(hasToken);

const loginButton = document.querySelector(".btn-login");

const validateSession = () => {
  let loginCard = document.getElementById("login-card");
  let logoutButton = document.getElementById("logoutHome");
  let avatarLogin = document.getElementById("avatar-login");
  let loginNav = document.getElementById("loginBtnNav");
  hasToken = localStorage.getItem("token");
  if (!hasToken) {
    loginCard.classList.remove("d-none");
    logoutButton.classList.add("d-none");
    avatarLogin.classList.add("d-none");
    loginNav.classList.remove("d-none");
  } else {
    loginCard.classList.add("d-none");
    logoutButton.classList.remove("d-none");
    avatarLogin.classList.remove("d-none");
    loginNav.classList.add("d-none");
  }
};

// Agregar un evento de clic al botón de inicio de sesión
loginButton.addEventListener("click", () => {
  validateSession(); // Validar la sesión al hacer clic en el botón de inicio de sesión
});

// Llamada inicial para validar la sesión al cargar la página
validateSession();
loginButton.addEventListener("click", () => {
  let token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
  localStorage.setItem("token", token);
  //window.location.href = 'index.html';
  validateSession();
});

// funcion para remover token, simular cierre de sesion
const logout = () => {
  localStorage.removeItem("token");
  // Actualizar hasToken después de eliminar el token
  hasToken = localStorage.getItem("token");
  validateSession();
};

// logout
const logoutButton = document.getElementById("logoutHome");
if (logoutButton) {
  logoutButton.addEventListener("click", () => {
    logout();
  });
}

//export { hasToken, validateSession, loginButton, logoutButton, logout };

// Filtrar por reacciones
const filterPostByReaction = async () => {
  let post = await getData();
  post.sort((min, max) => max.Reactions - min.Reactions); //ordenar post de mayor reaction a menor

  //selecionar el id del html donde se insertaran los post filtrados
  const container = document.getElementById("main-post");
  container.textContent = "";

  //iterar cada post y crear su card
  post.forEach((post) => {
    let postElement = renderAllPosts(post);
    container.appendChild(postElement);
  });

  return post;
};

//filtrar por fecha
const filterPostByDate = async () => {
  let post = await getData();
  post.sort((min, max) => new Date(max.Date) - new Date(min.Date)); //ordenar post por fecha

  //selecionar el id del html donde se insertaran los post filtrados
  const container = document.getElementById("main-post");
  container.textContent = "";

  //iterar cada post y crear su card
  post.forEach((post) => {
    let postElement = renderAllPosts(post);
    container.appendChild(postElement);
  });

  return post;
};

const filterPostByRelevant = async () => {
  let post = await getData();
  post.sort((min, max) => max.Relevant - min.Relevant); //ordenar post de mayor relavant a menor

  //selecionar el id del html donde se insertaran los post filtrados
  const container = document.getElementById("main-post");
  container.textContent = "";

  //iterar cada post y crear su card
  post.forEach((post) => {
    let postElement = renderAllPosts(post);
    container.appendChild(postElement);
  });

  return post;
};

//listener de los botones, al dar click en un boton activa su funcion correspondiente
let filterByRelevan = document
  .getElementById("filter-relevant")
  .addEventListener("click", filterPostByRelevant);
let filterByDate = document
  .getElementById("filter-latest")
  .addEventListener("click", filterPostByDate);
let filterByReaction = document
  .getElementById("filter-top")
  .addEventListener("click", filterPostByReaction);
