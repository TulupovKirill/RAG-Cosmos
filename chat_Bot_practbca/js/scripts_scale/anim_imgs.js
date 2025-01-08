//Анимация третьего блока 8-ми картинок

const imgs = document.querySelectorAll('.img_anim');
const texts = document.querySelectorAll('.text_anim');

let index = -1;
let indexPrev = -1;

var intervalID = null;

//осуществление анимации 8-ми картинок
function activeImg(n, np)
{
  for(img of imgs)
  {
    img.classList.remove('active');
    img.classList.remove('noactive');
  }
  imgs[n].classList.add('active');

  if (np != imgs.length - 1)
    imgs[np].classList.add('noactive');
  else
  {
    for(text of texts)
      text.classList.remove('active');
  }
  texts[n].classList.add('active');
}

//Запуск основной функции анимации
function nextImg()
{
  if(index == imgs.length - 1)
    index = 0;
  else
    index++;

  indexPrev = index-1;
  if(indexPrev == -1)
    indexPrev = imgs.length - 1;

  activeImg(index, indexPrev);
}

//Начало анимации картинок блока при скролле
function startTimer()
{
  const rect = imgs[0].getBoundingClientRect();
  if (rect.top > window.innerHeight / 2)
  {
    clearInterval(intervalID);
    intervalID = null;
    index = -1;
    indexPrev = -1;

    for(img of imgs)
    {
      img.classList.remove('active');
      img.classList.remove('noactive');
    }

    for(text of texts)
      text.classList.remove('active');
  }
  else {
    if (intervalID == null)
      intervalID = setInterval(nextImg, 1500);
  }
}

window.addEventListener('scroll', startTimer);
