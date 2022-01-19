// блокируем доступ к кнопке
function disableButton(button, buttonClassDisable){
    button.classList.add(buttonClassDisable);
    button.disabled = true;
}

// включаем доступ к кнопке 
function inDisableButton(button, buttonClassDisable){
    button.classList.remove(buttonClassDisable);
    button.disabled = false;
}

// скрываем ошибку
export function hideError(form, input, errorClassVisible, inputErrorClass){
    form.querySelector(`.${input.id}-error`).classList.remove(errorClassVisible);
    input.classList.remove(inputErrorClass);
}

// показываем ошибку и ее текст
function showError(form, input, errorClassVisible, inputErrorClass){
    const inputError = form.querySelector(`.${input.id}-error`);
    inputError.classList.add(errorClassVisible);
    inputError.textContent = input.validationMessage;
    input.classList.add(inputErrorClass);
}

// проверяем поле формы на валидность и показываем или скрываем поле ошибки
function isValid(form, input, button, errorClassVisible, inputErrorClass, buttonSelector, buttonClassDisable){
    if(input.validity.valid){
        hideError(form, input, errorClassVisible, inputErrorClass);
    }
    else{
        showError(form, input, errorClassVisible, inputErrorClass);
        disableButton(button, buttonSelector, buttonClassDisable);
    }
}


// Возвращаем true, если хоть какой-то элемент в форме не валиден, 
// иначе - false
function hasInvalidInput(inputList){
    return inputList.some(input => !input.validity.valid)
}

// проверяем все поля формы на валидность и блокируем или включаем доступ к кнопке типа "submit" 
export function isValidAllInputs(button, inputList, buttonClassDisable){
    if(hasInvalidInput(inputList)){
        disableButton(button, buttonClassDisable);
    }
    else{
        inDisableButton(button, buttonClassDisable);
    }
}

// проверяем все поля форм на валидность
export function setUpValidation({formSelector, inputSelector, errorClassVisible, inputErrorClass, buttonSelector, buttonClassDisable}){
    Array.from(document.querySelectorAll(formSelector)).forEach(form=>{
        const inputList = Array.from(form.querySelectorAll(inputSelector));
        const button = form.querySelector(buttonSelector);
        isValidAllInputs(button, inputList, buttonClassDisable);
        inputList.forEach(input=>{
            input.addEventListener("input", function(){
                isValid(form, input, button, errorClassVisible, inputErrorClass, buttonSelector, buttonClassDisable);
                isValidAllInputs(button, inputList, buttonClassDisable);
            })
        })
    })
}
