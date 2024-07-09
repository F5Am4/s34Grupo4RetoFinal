import { createPost, getUser } from "./modules/requestsApi.js";

let hasToken = localStorage.getItem("token");

if (!hasToken) {
  window.location.href = "/VIEWS/loginPage.html";
}

let postObject = { tags: [] };

let infoPosts = document.querySelectorAll("#card-form input");
let buttonSave = document.getElementById("button-save-card");
let tagsInput = document.getElementById("tags-input");
let tagsContainer = document.getElementById("tagsContainer");

infoPosts.forEach((field) => {
  field.addEventListener("change", (event) => {
    postObject[event.target.name] = event.target.value;
    console.log(postObject);
  });
});

tagsInput.addEventListener("keydown", (event) => {
  if (event.key === " ") {
    event.preventDefault();
    let words = event.target.value.trim().split(" ");
    event.target.value = "";
    words.forEach((word) => {
      if (word) {
        let formattedWord = word.startsWith("#") ? word : `#${word}`;
        let button = document.createElement("button");
        button.textContent = formattedWord;
        button.addEventListener("click", () => {
          tagsContainer.removeChild(button);
          postObject.tags = postObject.tags.filter(
            (tag) => tag !== formattedWord
          );
          console.log(postObject.tags);
        });
        tagsContainer.append(button);
        postObject.tags.push(formattedWord);
      }
    });
    console.log(postObject.tags);
  }
});

buttonSave.addEventListener("click", async () => {
  let form = document.getElementById("card-form");
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  let keys = Object.keys(postObject);
  if (keys.length > 0) {
    postObject.Reactions = Math.floor(Math.random() * 500);
    postObject.Relevant = (Math.random() * 10).toFixed(1);

    let users = await getUser();
    let user = users[0];
    postObject.Avatar = user.Avatar;
    postObject.Author = `${user.Name} ${user.Lastname}`;

    await createPost({ ...postObject });

    form.reset();
    postObject = { tags: [] };

    window.location.href = "/index.html";
  }
});
