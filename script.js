const items = [
  { file: 'cris', name: 'Cris'},
  { file: 'ru', name: 'Ru'},
  { file: 'felix', name: 'Felix'},
  { file: 'luisi', name: 'Luisi'},
  { file: 'lauri', name: 'Lauri'},
  { file: 'mari', name: 'Mari'},
]

const shuffledItems = items.sort((a, b) => 0.5 - Math.random());

const imageElements = document.querySelectorAll('.image');
imageElements.forEach((img, idx) => {
  const {file} = shuffledItems[idx];
  img.style.backgroundImage = `url('./img/${file}.png')`;
  img.addEventListener('click', e => {
    imageElements.forEach((image, jdx) => {
      if(jdx !== idx) {
        image.classList.add('inactive')
      } else {
        image.classList.add('selected')
      }
    })
    const audioObj = new Audio(`./audio/${file}.mp3`);
    audioObj.addEventListener('ended', e => {
      imageElements.forEach((image) => {
        image.classList.remove('inactive')
        image.classList.remove('selected')
      })
    })
    audioObj.play();
    
  })
})