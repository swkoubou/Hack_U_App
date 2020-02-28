function menu() {
    const button = document.querySelector('.drbutton');
    const menu = document.querySelector('.menu');

    button.addEventListener('click',function () {
        menu.classList.toggle('hide');
    });
}
menu();