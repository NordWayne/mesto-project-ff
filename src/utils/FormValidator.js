export default class FormValidator{
    constructor(config, form){
        this.config=config;
        this.form=form;
        this.submitButton = this.form.querySelector(this.config.submitButtonSelector);
        this._inputsList = this.form.querySelectorAll(this.config.inputSelector);
        this._nameRegex = /^[a-zA-Zа-яА-ЯёЁ\s-]+$/;
    }
    _showError(input) {
        const error = this.form.querySelector(`#${input.name}-error`);
        error.textContent = input.validationMessage;
        input.classList.add(this.config.inputInvalidClass);
    }

    _hideError(input) {
        const error = this.form.querySelector(`#${input.name}-error`);
        error.textContent = '';
        input.classList.remove(this.config.inputInvalidClass);
    }

    _checkInputValidity(input) {
        if (input.name === 'name' || input.name === 'description' || input.name === 'place-name') {
            if (!this._nameRegex.test(input.value)) {
                input.setCustomValidity('Поле может содержать только латинские и кириллические буквы, знаки дефиса и пробелы');
            } else {
                input.setCustomValidity('');
            }
        }
        
        if (!input.validity.valid) {
            this._showError(input);
        } else {
            this._hideError(input);
        }
    }

    setButtonState(button, isActive, config) {
        if (isActive) {
            button.classList.remove(config.buttonInvalidClass);
            button.disabled = false;
        } else {
            button.classList.add(config.buttonInvalidClass);
            button.disabled = true;
        }
    }

    _setEventListeners() {

        this._inputsList.forEach((input) => {
            input.addEventListener('input', () => {
                this._checkInputValidity(input);                  
                this.setButtonState(this.submitButton, this.form.checkValidity(), this.config);
            });
        });
    }
     enableValidation() {
            this._setEventListeners();
            this.setButtonState(this.submitButton, this.form.checkValidity(), this.config);
    }
     resetValidation() {
         this._inputsList.forEach((inputElement) => {
             this._hideError(inputElement)
        });

         this.setButtonState(this.submitButton,false,this.config);
     }


}