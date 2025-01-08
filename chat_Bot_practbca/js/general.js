//Функция задержки
function sleep(ms)
{
  return new Promise(
    resolve => setTimeout(resolve, ms)
  );
}

//Начальная заставка
async function animHead()
{
  //Анимация точек в начате
  const circles = document.querySelectorAll('.circle');

  while (document.readyState != "complete")
  {
    circles[0].classList.add('active');
    circles[1].classList.remove('active');
    circles[2].classList.add('active');
    await sleep(300);
    circles[0].classList.remove('active');
    circles[1].classList.add('active');
    circles[2].classList.remove('active');
    await sleep(300);
  }

  //Появление основных объектов заголовка
  document.querySelectorAll('.circles')[0].classList.add("noactive");
  const head = document.querySelectorAll('header');
  head[0].classList.remove('active');
}

animHead();
