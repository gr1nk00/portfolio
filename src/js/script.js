const hamburger = document.querySelector('.promo__hamburger'),
    menu = document.querySelector('.menu'),
    close = document.querySelector('.menu__close'),
    menu__overlay = document.querySelector('.menu__overlay');

hamburger.addEventListener('click', () => {
    menu.classList.add('active');
})

close.addEventListener('click', () => {
    menu.classList.remove('active');
})

menu__overlay.addEventListener('click', () => {
    menu.classList.remove('active');
});

const counters = document.querySelectorAll('.progress__numb')
lines = document.querySelectorAll('.progress__line--2')

counters.forEach((item, i) => {
    lines[i].style.width = item.innerHTML
});