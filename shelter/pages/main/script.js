import data from '../../assets/json/pets.json' with { type: "json" };

const menuBurger = document.querySelector('.menu-burger');
const menuHeader = document.querySelector('.menu-links');
const logoBuger = document.querySelector('.logo-burger');
const prevBtn = document.querySelector('.arrow-left');
const nextBtn = document.querySelector('.arrow-right');
const CAROUSEL = document.querySelector("#carousel");
const petBoxes = document.querySelector('.boxactive');
const itemLeft = document.querySelector(".boxleft");
const itemRight = document.querySelector(".boxright");

let i = 0;
const pet = data.sort(() => Math.random() - 0.5)

const createCardTemplate = (i) => {
  const card = document.createElement("div");
  card.dataset.index = i;
  card.classList.add("box");  
  return card;
}

function renderItems(index) {
  return `<div class="image-box"><img src="${pet[index].img}" alt="${pet[index].name}"></div>
  <div class="title-box"><p>${pet[index].name}</p>
  <button class="btn-2">Learn more</button>
</div>`
} 

document.querySelectorAll(".slider").forEach(item => {
  item.innerHTML = ''

  for (let j = 0; j < 3; j++) {
    let card = createCardTemplate(i);
    card.innerHTML =  renderItems(i)

    item.append(card);
    card.addEventListener("click", function () {
    let i = this.dataset.index;
      modalShow(i);
    });
    i++
    if (i >= 8){
      i = 0
  }
  
   }
})

// modal window open
const modalShow = (i) => {
  const modal = document.querySelector('.modal');
  const modals = document.querySelector('.modal-screen');
  const closeBtn = document.querySelector('.close');

  const boxes = document.createElement('div');
  boxes.classList.add('boxes');
  modal.append(boxes);

  const petImage = document.createElement("img");
  petImage.classList.add('boxes-image');
  petImage.src = pet[i].img;
  petImage.alt = pet[i].name;
  boxes.appendChild(petImage);

  const titleBox = document.createElement('div');
  titleBox.classList.add('boxes-title');
  boxes.appendChild(titleBox);

  const title = document.createElement('p');
  title.innerHTML = pet[i].name;
  titleBox.appendChild(title);

  const type = document.createElement('span');
  type.innerHTML = pet[i].type;
  titleBox.appendChild(type);

  const breed = document.createElement('span');
  breed.innerHTML = ` - ${pet[i].breed}`;
  type.appendChild(breed);

  const description = document.createElement('h3');
  description.innerHTML = pet[i].description;
  titleBox.appendChild(description);

  const info = document.createElement('ul');
  info.classList.add('boxes-info');
  info.innerHTML = `
      <li class="boxes-info-bold"><strong>Age:</strong> ${pet[i].age}</li>
      <li class="boxes-info-bold"><strong>Inoculations:</strong> ${pet[i].inoculations}</li>
      <li class="boxes-info-bold"><strong>Diseases:</strong> ${pet[i].diseases}</li>
      <li class="boxes-info-bold"><strong>Parasites:</strong> ${pet[i].parasites}</li>`;
  titleBox.appendChild(info);

  setTimeout(() => {
      modal.classList.remove('hide');
      modals.classList.remove('hide');
  }, 200);

  const changeCloseBtnColor = (color) => {
      closeBtn.style.backgroundColor = color;
  };

  modals.addEventListener('mouseout', () => changeCloseBtnColor("#fff"));
  modals.addEventListener('mouseenter', () => changeCloseBtnColor("#f1cdb3"));
  closeBtn.addEventListener('mouseenter', () => changeCloseBtnColor("#f1cdb3"));

  const closeModal = () => {
      modal.classList.add('hide');
      modals.classList.add('hide');
      document.body.classList.remove('hidden');
      setTimeout(() => {
          boxes.remove();
      }, 1000);
  };

  document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
  });

  closeBtn.addEventListener('click', closeModal);

  modals.addEventListener('click', closeModal);
};

const moveCarousel = (direction) => {
  CAROUSEL.classList.add(`transition-${direction}`);

  if (direction === 'left') {
    prevBtn.removeEventListener('click', moveLeft);
    nextBtn.removeEventListener('click', moveRight);
  } else if (direction === 'right') {
    nextBtn.removeEventListener('click', moveRight);
    prevBtn.removeEventListener('click', moveLeft);
  }
};

const moveLeft = () => moveCarousel('left');
const moveRight = () => moveCarousel('right');

prevBtn.addEventListener('click', moveLeft);
nextBtn.addEventListener('click', moveRight);

// Carousel start
CAROUSEL.addEventListener('animationend', (animationEvent) => {
  const isMovingLeft = animationEvent.animationName === 'move-left';
  const activeItem = isMovingLeft ? itemLeft : itemRight;
  const oppositeItem = isMovingLeft ? itemRight : itemLeft;

  CAROUSEL.classList.remove(isMovingLeft ? 'transition-left' : 'transition-right');

  petBoxes.innerHTML = activeItem.innerHTML;

  petBoxes.querySelectorAll(".box").forEach((card) => {
    card.addEventListener("click", function () {
      const index = this.dataset.index;
      modalShow(index);
    });
  });

  oppositeItem.innerHTML = "";

  for (let j = 0; j < 3; j++) {
    const card = createCardTemplate(i);
    card.innerHTML = renderItems(i);
    oppositeItem.append(card);

    card.addEventListener("click", function () {
      const index = this.dataset.index;
      modalShow(index);
    });

    i++;
    if (i >= 8) {
      i = 0;
    }
  }

  prevBtn.addEventListener('click', moveLeft);
  nextBtn.addEventListener('click', moveRight);
});

menuBurger.addEventListener("click", function(e) {
  menuBurger.classList.toggle('open');
  menuHeader.classList.toggle('open');
  document.body.classList.toggle('hidden');
  logoBuger.classList.toggle('open');
});

menuHeader.addEventListener('click', function(e) {
  if (menuHeader.classList.contains('open')) {
      menuHeader.classList.remove('open');
      menuBurger.classList.remove('open');
      document.body.classList.remove('hidden');
      logoBuger.classList.remove('open');
  }
});

