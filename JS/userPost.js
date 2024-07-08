import { createPost, getUser } from "./modules/requestsApi.js";

let hasToken = localStorage.getItem("token");

if (!hasToken) {
  window.location.href = "/VIEWS/loginPage.html";
}

let postObject = {};

let infoPosts = document.querySelectorAll("#card-form input");
let buttonSave = document.getElementById("button-save-card");
let tagsInput = document.getElementById("tags-input");

infoPosts.forEach((fields) => {
  fields.addEventListener("change", (event) => {
    let property = event.target.name;

    let value = event.target.value;

    postObject[property] = value;
    console.log(postObject);
  });
});

tagsInput.addEventListener("keydown", (event) => {
  if (event.key === " ") {
    let words = event.target.value.trim().split(" ");
    let formattedWords = words.map((word) =>
      word.startsWith("#") ? word : `#${word}`
    );
    event.target.value = formattedWords.join(" ");

    postObject["Tags"] = formattedWords.filter((word) => word.startsWith("#"));
  }
});

buttonSave.addEventListener("click", async () => {
  let form = document.getElementById("card-form");
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  let tagsValue = tagsInput.value.trim();
  let tagsArray = tagsValue
    .split(" ")
    .map((tag) => (tag.startsWith("#") ? tag : `#${tag}`))
    .filter((tag) => tag !== "#");
  postObject["Tags"] = tagsArray;

  let keys = Object.keys(postObject);
  if (keys.length > 0) {
    let reactionsRandom = Math.floor(Math.random() * 500);
    let postRelevant = (Math.random() * 10).toFixed(1);
    postObject["Reactions"] = reactionsRandom;
    postObject["Relevant"] = postRelevant;

    let users = await getUser();

    let user = users[0];

    postObject["Avatar"] = user.Avatar;
    postObject["Author"] = `${user.Name} ${user.Lastname}`;

    let newPost = { ...postObject };

    await createPost(newPost);

    form.reset();
    postObject = {};

    window.location.href = "/index.html";
  }
});
