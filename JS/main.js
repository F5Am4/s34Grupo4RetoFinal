import { getData } from "./modules/requestsApi.js";

const getListPost = async () => {
  let posts = await getData();
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
