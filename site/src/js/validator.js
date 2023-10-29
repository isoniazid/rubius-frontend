var validate = require("validate.js");

function validateForm(formData) {
    const constraints = {
        name: {
            presence: true,
            type: 'string',
            length: {
                minimum: 2,
                maximum: 50,
                message: 'Имя должно содержать от 2 до 50 символов',
            },
        },
        phone: {
            presence: true,
            format: {
                pattern: /^\+?\d{1,3}[-.\s]?\(?\d{1,3}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
                message: 'Некорректный номер телефона',
            },
        }
    };

    const currentName = formData.get('name');
    const currentPhone = formData.get('phone');

    const validationErrors = validate({ name: currentName, phone: currentPhone }, constraints);

    if (validationErrors) {
        const errorMessages = Object.values(validationErrors).map(error => error[0]);
        return errorMessages;
    }

    return null;
}

export default validateForm;