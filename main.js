// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = "♡";
const FULL_HEART = "♥";

const model = document.getElementById("modal");
modal.classList.add("hidden");

document.addEventListener("DOMContentLoaded", () => {
  clearTheError();
  addTheEventListeners();
});

function addTheEventListeners() {
  const likeBtns = document.getElementsByClassName("like-glyph");
  Array.from(likeBtns).forEach(button => {
    button.addEventListener("click", e => likeClick(e));
  });
}

function clearTheError() {
  modal.classList.add("hidden");
}

function likeClick(e) {
  let heart = e.target;
  mimicServerCall()
    .then(res => {
      if (res.includes("Pretend")) {
        return succesFx(heart);
      }
    })
    .catch(err => errorFx(err));
}

function succesFx(heart) {
  if (heart.innerText === EMPTY_HEART) {
    heart.innerText = FULL_HEART;
    heart.classList.add("activated-heart");
  } else {
    heart.innerText = EMPTY_HEART;
    heart.classList.remove("activated-heart");
  }
}

function errorFx(err) {
  modal.innerText = err;
  modal.classList.remove("hidden");
  setTimeout(function() {
    modal.classList.add("hidden");
  }, 5000);
}
//------------------------------------------------------------------------------
// Ignore after this point. Used only for demo purposes
//------------------------------------------------------------------------------

function mimicServerCall(url = "http://mimicServer.example.com", config = {}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < 0.2;
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
