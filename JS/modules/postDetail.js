import { renderPost } from "./components.js";
import { getPostById } from "./requestsApi.js";

let url = window.location.href;
let urlObject = new URL(url);
let params = new URLSearchParams(urlObject.search);
let postId = params.get("postId");

const printPost = async () => {
  let postData = await getPostById(postId);
  renderPost(postData);
};

printPost();
