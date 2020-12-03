import images from './images.js';

const refs = 
 {
 gallery: document.querySelector('.js-gallery'),
 largeImage: document.querySelector('.lightbox__image'),
 modal: document.querySelector('.js-lightbox'),
 button: document.querySelector('button[data-action="close-lightbox"]'),
 overlay : document.querySelector('.lightbox__overlay')
}

const createMarkUp = images => {
return images.reduce((acc, image) => {
  return acc += `<li class="gallery__item">
  <a
    class="gallery__link" href = ${image.original} >
    <img
      class="gallery__image"
      src=${image.preview}
      data-source=${image.original}
      data-index=${image.index}
      alt='${image.description}'
    />
  </a>
</li>`
}, '')}  
refs.gallery.innerHTML = createMarkUp(images);


const openLargeImg =  (event) => {
  window.addEventListener('keydown', onPressEsc);
  event.preventDefault();
  if (event.target.nodeName === 'IMG')
  {
    refs.modal.classList.add('is-open');
    refs.largeImage.src = event.target.dataset.source;
  } 
}

refs.gallery.addEventListener('click', openLargeImg);

const closeLargeImg = function (event) {
  window.removeEventListener('keydown', onPressEsc);
  refs.modal.classList.remove('is-open');
  refs.largeImage.src = '';
  refs.largeImage.alt = '';
}

refs.button.addEventListener('click', closeLargeImg);

refs.overlay.addEventListener('click', event => {
  if (event.target === event.currentTarget) {
    closeLargeImg();
  }
})

const onPressEsc = function (event) {
if (event.code === 'Escape')
{
    closeLargeImg();
}
if (event.code === 'ArrowRight') 
{
  sliderRight()
}
if (event.code === 'ArrowLeft') 
 {
    sliderLeft()
  }
}

//=================Slider======================================

let activeIndex=0;

refs.gallery.addEventListener ('click', event => {
  activeIndex = Number(event.target.dataset.index);
console.log(activeIndex);

})
  
const sliderRight = function () {
  if (activeIndex >= 0 && activeIndex < images.length-1)
    {
      activeIndex +=1;
      console.log(activeIndex);
      return refs.largeImage.src = images[activeIndex].original;
    }
  else 
    {
      activeIndex = 0;
      return refs.largeImage.src = images[activeIndex].original;
    }
}

const sliderLeft = function () {
  if (activeIndex > 0 && activeIndex <= images.length-1)
    {
      activeIndex -=1;
      console.log(activeIndex);
      return refs.largeImage.src = images[activeIndex].original;
  }
  else {
    activeIndex = images.length - 1;
    return refs.largeImage.src = images[activeIndex].original;  
 }
   }

  
  