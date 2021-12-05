const items = [
  { file: "cris", name: "Cris" },
  { file: "ru", name: "Ru" },
  { file: "felix", name: "Felix" },
  { file: "luisi", name: "Luisi" },
  { file: "lauri", name: "Lauri" },
  { file: "mari", name: "Mari" },
];
let isSelected = false;
function isInstalled() {
  // For iOS
  if(window.navigator.standalone) return true

  // For Android
  if(window.matchMedia('(display-mode: standalone)').matches) return true

  // If neither is true, it's not installed
  return false
}
const shuffledItems = items.sort((a, b) => 0.5 - Math.random());
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty("--vh", `${vh}px`);
window.addEventListener("resize", () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
});

const onImageSelected = (idx, file) => {
  if (isSelected) {
    return;
  }
  isSelected = true;
  imageElements.forEach((image, jdx) => {
    if (jdx !== idx) {
      image.classList.add("inactive");
    } else {
      image.classList.add("selected");
    }
  });
  const audioObj = new Audio(`./audio/${file}.mp3`);
  audioObj.addEventListener("ended", () => {
    isSelected = false;
    imageElements.forEach((image) => {
      image.classList.remove("inactive");
      image.classList.remove("selected");
    });
  });
  audioObj.play();
};

const imageElements = document.querySelectorAll(".image");
imageElements.forEach((img, idx) => {
  const { file } = shuffledItems[idx];
  img.style.backgroundImage = `url('./img/${file}.png')`;
  img.addEventListener("click", () => onImageSelected(idx, file));
  if(isInstalled()) {
    img.addEventListener("touchstart", () => onImageSelected(idx, file));
  }
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("./serviceWorker.js")
      .then(res => console.log("service worker registered"))
      .catch(err => console.log("service worker not registered", err))
  })
}