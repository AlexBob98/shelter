import data from '../../assets/json/pets.json' with { type: "json" };

const menuBurger = document.querySelector('.menu-burger');
const menuHeader = document.querySelector('.menu-links');
const header = document.querySelector('.menu-burger-position');
const logoBuger = document.querySelector('.logo-burger');

const currentPage = document.querySelector('.current-page');
const prevBtn = document.querySelector('.prev');
const startPage = document.querySelector('.prev-start');
const nextBtn = document.querySelector('.next');
const endPage = document.querySelector('.next-end');
const petBoxes = document.querySelector('.cards-block-pets');

let currentSlider = 0;
let totalPages;
let pages = 0;
let screen;
let curPage = 1;
let start = 0;
let end = pages;
const screenWidth = document.documentElement.clientWidth;

const createCards = () => {
  getCards(data);

}

function setItemWidth() {
  if (screenWidth > 1280) {
    screen = 8;
    pages = 6;
} else if (screenWidth <= 1279 && screenWidth >= 768) {
    screen = 6;
    pages = 8;
} else if (screenWidth < 560) {
    screen = 3;
    pages = 16;
}

totalPages = pages * 1;
}

const getCards = (data) => {
  setItemWidth()

let clonedArray = Array.from({ length: pages + 1 }, () => data);

clonedArray[curPage].forEach((item, index) => {  
          const box = document.createElement('div');
          box.classList.add('box');   
    
          let petImage = document.createElement("img");
          petImage.classList.add('image-box')
          petImage.src = item.img;
          petImage.alt = item.name;
          box.appendChild(petImage);
          
          let titleBox = document.createElement('div');
          titleBox.classList.add('title-box');
          box.appendChild(titleBox);
    
          let title = document.createElement('p');
          title.classList.add('p')
          title.innerHTML = item.name;
          titleBox.appendChild(title)

          let button = document.createElement('button');
          button.classList.add('btn-2');
          button.innerHTML = 'Learn more';
          titleBox.appendChild(button);
            box.addEventListener('click', () => {
              document.body.classList.add('hidden');
                currentSlider = index;
                modalShow(item)
                
            })
    petBoxes.append(box);
     })
    }
createCards()

const modalShow = (item) => {
    const modal = document.querySelector('.modal');
    const modals = document.querySelector('.modal-screen')
    const closeBtn = document.querySelector('.close');

    const boxes = document.createElement('div');
    boxes.classList.add('boxes');   
    modal.append(boxes)

    const petImage = document.createElement("img");
    petImage.classList.add('boxes-image')
    petImage.src = item.img;
    petImage.alt = item.name;
    boxes.appendChild(petImage);

    const titleBox = document.createElement('div');
    titleBox.classList.add('boxes-title');
    boxes.appendChild(titleBox);

    const title = document.createElement('p');
    title.innerHTML = item.name;
    titleBox.appendChild(title)
    
    const type = document.createElement('span');
    type.innerHTML = item.type;
    titleBox.appendChild(type);

    const breed = document.createElement('span')
    breed.innerHTML = ' - ' + item.breed
    type.appendChild(breed)

    const description = document.createElement('h3')
    description.innerHTML = item.description
    titleBox.appendChild(description)

    const info = document.createElement('ul');
    info.classList.add('boxes-info')
    info.innerHTML = `<ul>
    <li class="boxes-info-bold"><strong>Age:</strong> ${item.age}</li>
    <li class="boxes-info-bold"><strong>Inoculations:</strong> ${item.inoculations}</li>
    <li class="boxes-info-bold"><strong>Diseases:</strong> ${item.diseases}</li>
    <li class="boxes-info-bold"><strong>Parasites</b>:</strong> ${item.parasites}</li>
    </ul>`
    titleBox.appendChild(info)

    setTimeout(()=> {
      modal.classList.remove('hide');
      modals.classList.remove('hide');},200)

    modals.addEventListener('mouseout', () =>{
      closeBtn.style.backgroundColor = "#fff";
      next.style.opacity = "1";
      back.style.opacity = "1";
    })
    modals.addEventListener('mouseover', () =>{
      closeBtn.style.backgroundColor = "#f1cdb3";
      next.style.opacity = "0";
        back.style.opacity = "0";
    })
    closeBtn.addEventListener('mouseenter', () =>{
      closeBtn.style.backgroundColor = "#f1cdb3"
    })
    closeBtn.addEventListener('mouseenter', () =>{
      closeBtn.style.backgroundColor = "#f1cdb3"
    })
    
    document.addEventListener('keydown', function(e) {
      if(e.keyCode == 27){
        modal.classList.add('hide');
        modals.classList.add('hide');
        document.body.classList.remove('hidden');
        setTimeout(()=> {
          boxes.remove()},1000)
      }

   

  });
    closeBtn.addEventListener('click', () => {
        modal.classList.add('hide');
        modals.classList.add('hide');
        document.body.classList.remove('hidden');
        setTimeout(()=> {
          boxes.remove()},1000)
    })
    modals.addEventListener('click', () => {
        modal.classList.add('hide');
        modals.classList.add('hide');
        document.body.classList.remove('hidden');
        setTimeout(()=> {
          boxes.remove()},1000)
    })
}
const back = document.querySelector('.fa-arrow-left-long');
const next = document.querySelector('.fa-arrow-right-long');
back.addEventListener('click', () => {
    if (currentSlider > 0) {
        boxes.remove();
        currentSlider--;
        // back.classList.add('noactive');
        modalShow(data[currentSlider]);
    } 
    if (currentSlider <= 0) {
        back.classList.add('noactive');
    }
    if (currentSlider != data.length - 1) {
        next.classList.remove('noactive');
    }
})
next.addEventListener('click', () => {
      if (currentSlider < data.length - 1) {
          boxes.remove();
          currentSlider++;
  
          modalShow(data[currentSlider]);
      }if (currentSlider > 0) {
        back.classList.remove('noactive');
    } if (currentSlider === data.length - 1) {
        next.classList.add('noactive');
    }

  })
// end slider in popup

  function disabledBut() {
    prevBtn.disabled = true;
    prevBtn.classList.add('dis');
    startPage.classList.add('dis');
    startPage.disabled = true;
    endPage.classList.add('dis')
    endPage.disabled = true;
  }

disabledBut()

  nextBtn.addEventListener('click', () => {
    curPage++;
        currentPage.innerHTML = curPage
        petBoxes.innerHTML = ''
    if (curPage == pages) {
            nextBtn.disabled = true;
            nextBtn.classList.add('dis');
            // endPage.classList.add('dis')
           }
         
           prevBtn.disabled = false;
          //  startPage.disabled = false;
           prevBtn.classList.remove('dis');
          //  startPage.classList.remove('dis');
           start = (curPage - 1) * pages;
           end = curPage * pages;

        getCards(data.sort(() => Math.random() - 0.5));
  })

  prevBtn.addEventListener('click', () => {
    totalPages = Math.ceil(data.length / pages)
    nextBtn.disabled = false;
    nextBtn.classList.remove('dis');
    // endPage.classList.remove('dis')

      curPage--;
      if (curPage === 1 ) {
     prevBtn.disabled = true;
     prevBtn.classList.add('dis')
    //  startPage.classList.add('dis')
}
      currentPage.innerHTML = curPage
      petBoxes.innerHTML = ''
      start = (curPage - 1) * pages;
      end = curPage * pages;

      getCards(data.sort(() => Math.random() - 0.5));
})

menuBurger.addEventListener("click", function(e) {
     if (menuBurger) {
         menuBurger.classList.toggle('open');
         menuHeader.classList.toggle('open');
         header.classList.toggle('open');
         document.body.classList.toggle('hidden');
         logoBuger.classList.toggle('open');
        }
        else {
            menuBurger.classList.remove('open');
         menuHeader.classList.remove('open');
         header.classList.remove('open');
         document.body.classList.toggle('hidden');
         logoBuger.classList.remove('open');
        }
})
menuHeader.addEventListener('click', function(e) {
    if (menuHeader.classList.contains('open')) {
        menuHeader.classList.remove('open');
        menuBurger.classList.remove('open');
        document.body.classList.remove('hidden');
        logoBuger.classList.remove('open');

    }
})