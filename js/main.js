/* Start Global Funcions */
function addflippedClass(element) {
  element.forEach((ele) => {
    ele.classList.add("flipped");
  });
}

function removeflippedClass(element) {
  element.forEach((ele) => {
    ele.classList.remove("flipped");
  });
}
/* End Global Funcions */
let startBtn = document.querySelector(".control-buttons span"); // Select Start Button
let spanName = document.querySelector(".info-container .name");
startBtn.addEventListener("click", (ele) => {
  let name = prompt("Write Your Name");
  if (name) {
    spanName.textContent = spanName.textContent + name;
    ele.target.parentElement.style.display = "none";
  }
  showBoxesForOneSecond(boxes);
});
// -----------------------------------
let memoryGameBlock = document.querySelector(".memory-game-blocks");
let boxes = document.querySelectorAll(".memory-game-blocks .game-block");
let tries = document.querySelector(".tries span");
let newOrderForBoxes = new Set();

function showBoxesForOneSecond(boxes) {
  addflippedClass(boxes);
  setTimeout(() => {
    removeflippedClass(boxes);
  }, 2000);
}
// -----------------------------------
function randomElements() {
  newOrderForBoxes.size = 0;
  let randomBoxes = document.querySelectorAll(
    ".memory-game-blocks .game-block"
  );
  while (newOrderForBoxes.size != randomBoxes.length) {
    newOrderForBoxes.add(Math.floor(Math.random() * randomBoxes.length));
  }

  newOrderForBoxes.forEach((ele) => {
    memoryGameBlock.appendChild(randomBoxes[ele]);
  });
}
randomElements();
// -----------------------------------
boxes.forEach((box) => {
  box.addEventListener("click", (e) => {
    e.target.parentElement.classList.add("flipped");
    setTimeout(() => {
      isEqual(e.target.parentElement);
    }, 500);
  });
});

let twoBoxes = [];
function isEqual(box) {
  twoBoxes.push(box);
  if (twoBoxes.length == 2) {
    if (twoBoxes[0].dataset.technology == twoBoxes[1].dataset.technology) {
      addflippedClass(twoBoxes);
      twoBoxes.forEach((box) => {
        box.classList.add("matched");
        document.getElementById("success").play();
      });
      twoBoxes = [];
    } else {
      document.getElementById("fail").play();
      removeflippedClass(twoBoxes);
      twoBoxes = [];
      tries.textContent++;
    }
  }
}
// Check If Game Is End Or Not
let checkInterval = setInterval(() => {
  let booleanValue = Array.from(boxes).every(function (box) {
    return box.classList.contains("matched");
  });
  if (booleanValue == true) {
    removeflippedClass(boxes);
    boxes.forEach((ele) => {
      ele.classList.remove("matched");
    });
    setTimeout(() => {
      randomElements();
      tries.textContent = 0;
    }, 1000);
    setTimeout(() => {
      showBoxesForOneSecond(boxes);
    }, 2000);
  }
}, 1000);
