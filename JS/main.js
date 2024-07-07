import { getData } from "./modules/requestsApi.js";
import { renderAllPosts } from "./modules/components.js";

let posts = [];

const getListPost = async () => {
  posts = await getData();
  let reorderPost = posts.reduce((accum, current) => {
    let tags = current.Tags;
    if (Array.isArray(tags)) {
      tags.forEach((tag) => {
        accum[tag]
          ? (accum[tag] = [...accum[tag], current])
          : (accum[tag] = [current]);
      });
    }
    return accum;
  }, {});

  for (const tag in reorderPost) {
    renderPostsByTag(tag, reorderPost[tag].slice(0, 5));
  }
};

getListPost();

const renderPostsByTag = (tag, posts) => {
  let postWrapper = document.getElementById("list-post-tags");
  const contentDiv = document.createElement("div");
  contentDiv.classList.add(
    ..."card mb-4 border-light-subtle shadow-sm".split(" ")
  );

  const tagHeader = document.createElement("h3");
  tagHeader.classList.add("title-tag");
  tagHeader.textContent = tag;

  let list = document.createElement("ul");
  list.classList.add("list-tags-aside");

  contentDiv.append(tagHeader, list);
  postWrapper.append(contentDiv);

  posts.forEach((post) => {
    const dataTag = document.createElement("li");
    const link = document.createElement("a");
    link.setAttribute("href", `views/post-detail.html?postId=${post.key}`);
    link.textContent = post.Title;
    dataTag.append(link);
    list.append(dataTag);
  });
};

const getUsers = async () => {
  let containerListPost = document.getElementById("main-post");
  posts = await getData();
  posts.forEach((post) => {
    let postCard = renderAllPosts(post);
    containerListPost.append(postCard);
  });
};

getUsers();

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
