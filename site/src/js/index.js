console.log('webpack');
import '../plugins/hystModal-0.4/dist/hystmodal.min';
import validateForm from './validator';


const myModal = new HystModal({
    linkAttributeName: "data-hystmodal",

});

const form = document.getElementById("bigForm");
const button = document.getElementById("bigFormSubmit");
button.addEventListener("click", sendData);

const loader = document.getElementById("loader");

function showLoader() {
    loader.style.display = "block";
}

function hideLoader() {
    loader.style.display = "none";
}




async function sendData() {
    const formResult = document.getElementById("formResult");
    const formData = new FormData(form);

    const validationErrors = validateForm(formData);
    if (validationErrors) {
        formResult.innerText = "Что-то пошло не так: " + validationErrors;
        return;
    }

    const name = formData.get('name');
    const phone = formData.get('phone');
    const masterId = formData.get('masterId');
    const serviceId = formData.get('serviceId');
    const visitDate = formData.get('visitDate');
    const url = "http://localhost:3001/api/orders"

    const requestBody = JSON.stringify({ name: name, phone: phone, masterId: masterId, serviceId: serviceId, visitDate: visitDate });
    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: requestBody
    }).then(showLoader());

    if (response.status === 201) {
        hideLoader();
        formResult.innerText = "Готово! мы оформили вашу запись";
        setTimeout(() => myModal.close(), 3000);
        return;
    }

    hideLoader();
    var text = await response.json();
    formResult.innerText = "Что-то пошло не так: " + text.message;
}





