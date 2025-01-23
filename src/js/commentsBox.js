import { getParam } from "./utils.mjs";

//Retrieving Id from product from URL
const productId = getParam("product");
const commentsKey = `Comments_${productId}`;

//Comments Box Form
const opinionButton = document.getElementById("opinionButton");
const commentInput = document.getElementById("commentInput");
const commentsDisplayed = document.getElementById("commentsDisplayed");

opinionButton.addEventListener("click", function () {
  const comment = commentInput.value.trim();

  if (comment) {
    savingComment(comment); //Saves the comment in the comment box when you click "post"
    commentsDisplayed.textContent += `\n${comment}`;
    commentInput.value = "";
    alert("Comment posted");
  } else {
    alert("Please write a valid comment");
  }
});

//Saving comments in Local Storage
function savingComment(comment) {
  let comments = JSON.parse(localStorage.getItem(commentsKey)) || [];
  comments.push(comment);
  localStorage.setItem(commentsKey, JSON.stringify(comments));
}

//Loading old comments from Local storage
function loadingComments() {
  const comments = JSON.parse(localStorage.getItem(commentsKey)) || [];
  commentsDisplayed.textContent = comments.join("\n");
}

loadingComments();
