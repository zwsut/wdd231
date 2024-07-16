export function toggleMenu() {
    var nav = document.querySelector('nav');
    nav.classList.toggle('active');

    var ul = nav.querySelector('ul');
    if (nav.classList.contains('active')) {
        ul.style.maxHeight = ul.scrollHeight + 'px';
    } else {
        ul.style.maxHeight = '0';
    }
}