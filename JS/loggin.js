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

//filtrar por reacciones
const filterPostByReaction = async () => {
  let post = await getData();
  post.sort((min, max) => max.Reactions - min.Reactions);
  console.log(post);
  return post;
};
filterPostByReaction();

const filterPostByDate = async () => {
  let post = await getData();
  post.sort((min, max) => new Date(max.Date) - new Date(min.Date));
  console.log(post);
  return post;
};
filterPostByDate();

const filterPostByRelevant = async () => {
  let post = await getData();
  post.sort((min, max) => max.Relevant - min.Relevant);
  console.log(post);
  return post;
};
filterPostByRelevant();

const updateContent = async (filter) => {
  let filteredPosts;

  switch (filter) {
    case "reactions":
      filteredPosts = await filterPostByReaction();
      break;
    case "date":
      filteredPosts = await filterPostByDate();
      break;
    case "relevant":
      filteredPosts = await filterPostByRelevant();
      break;
    default:
      filteredPosts = await getData(); // Mostrar todos los posts por defecto
  }

  const contentContainer = document.getElementById("content-container");
  contentContainer.innerHTML = ""; // Limpiar contenido anterior

  filteredPosts.forEach((post) => {
    contentContainer.innerHTML += `<p>${post.title} - Reactions: ${post.Reactions} - Date: ${post.Date} - Relevant: ${post.Relevant}</p>`;
  });
};

document.addEventListener("DOMContentLoaded", () => {
  const navBarPost = document.querySelectorAll(".nav-item a");

  navBarPost.forEach((item) => {
    item.addEventListener("click", async (event) => {
      event.preventDefault();

      // Remover la clase 'active' de todos los enlaces
      navBarPost.forEach((remove) => remove.classList.remove("active"));

      // Agregar la clase 'active' al enlace clicado
      item.classList.add("active");

      // Obtener el filtro desde el atributo data-filter
      const filter = item.getAttribute("data-filter");

      // Actualizar el contenido del contenedor central según el filtro seleccionado
      await updateContent(filter);
    });
  });
});
