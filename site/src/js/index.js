console.log('webpack');
import '../plugins/hystModal-0.4/dist/hystmodal.min';

const myModal = new HystModal({
    linkAttributeName: "data-hystmodal",


});

function sendData() {
    alert("hi");
}

function myFunction() {
    // Ваш код или функция, которую нужно выполнить при нажатии на кнопку
    alert("Функция myFunction() была вызвана!");
}