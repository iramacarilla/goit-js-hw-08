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
      alt=${image.description}
    />
  </a>
</li>`
}, '')}  
refs.gallery.innerHTML = createMarkUp(images);

//==========================================
refs.gallery.addEventListener('click', openLargeImg);
refs.button.addEventListener('click', closeLargeImg);

function openLargeImg (event) {
  window.addEventListener('keydown', onPressEsc);
  event.preventDefault();
  if (event.target.nodeName !== 'IMG')
  {
    return; 
  }
  else
  {
  refs.modal.classList.add('is-open');
  refs.largeImage.src = event.target.dataset.source;
  
}}

function closeLargeImg (event) {
  window.removeEventListener('keydown', onPressEsc);
  refs.modal.classList.remove('is-open');
  refs.largeImage.src = '';
  refs.largeImage.alt = '';
}
refs.overlay.addEventListener('click', event => {
  if (event.target === event.currentTarget) {
    closeLargeImg();
  }
})

function onPressEsc (event) {
  if (event.code === 'Escape')
  {
    closeLargeImg();
}}

