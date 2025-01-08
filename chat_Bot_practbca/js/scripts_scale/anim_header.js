const back = document.querySelectorAll('.back'),
  logo = document.querySelectorAll('.logo'),
  text_header = document.getElementById('text_header'),
  backIm = document.querySelectorAll('.back img');

let scale = -1, scalePrev = -1,
  trl = -1, trlPrev = -1, lop = 0;

//Анимация заголовка при скролле
function animEvent()
{
  const rect = back[0].getBoundingClientRect();

  scale = 1 + 100 / rect.bottom;
  trl = scale * 5;
  lop = 100 / rect.bottom;

  if (scale > 2 || rect.bottom < 0)
  {
    scale = scalePrev;
    trl = trlPrev;
    lop = 0;
  }

  if (window.pageYOffset == 0)
  {
    scale = 1;
    trl = 0;
    lop = 1;
  }

  backIm[0].style.transform = ("scale(" + scale + ")");
  logo[0].style.transform = ("translate(" + trl + "vw, " + trl + "vw" + ")");
  logo[0].style.opacity = text_header.style.opacity = lop;
  text_header.style.transform = ("translate(" + -trl + "vw, " + -trl + "vw" + ")");

  scalePrev = scale;
  trlPrev = trl;
}

window.addEventListener('scroll', animEvent);
