// блокируем доступ к кнопке
function disableButton(form, buttonSelector, buttonClassDisable){
    const button = form.querySelector(buttonSelector);
    button.classList.add(buttonClassDisable);
    button.disabled = true;
}

// включаем доступ к кнопке 
function inDisableButton(form, buttonSelector, buttonClassDisable){
    const button = form.querySelector(buttonSelector);
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
function isValid(form, input, errorClassVisible, inputErrorClass, buttonSelector, buttonClassDisable){
    if(input.validity.valid){
        hideError(form, input, errorClassVisible, inputErrorClass);
    }
    else{
        showError(form, input, errorClassVisible, inputErrorClass, buttonSelector, buttonClassDisable);
        disableButton(form, buttonSelector, buttonClassDisable);
    }
}


// Возвращаем true, если хоть какой-то элемент в форме не валиден, 
// иначе - false
function hasInvalidInput(inputList){
    return inputList.some(input => !input.validity.valid)
}

// проверяем все поля формы на валидность и блокируем или включаем доступ к кнопке типа "submit" 
export function isValidAllInputs(form, inputList, buttonSelector, buttonClassDisable){
    if(hasInvalidInput(inputList)){
        disableButton(form, buttonSelector, buttonClassDisable);
    }
    else{
        inDisableButton(form, buttonSelector, buttonClassDisable);
    }
}

// проверяем все поля форм на валидность
export function setUpValidation({formSelector, inputSelector, errorClassVisible, inputErrorClass, buttonSelector, buttonClassDisable}){
    Array.from(document.querySelectorAll(formSelector)).forEach(form=>{
        const inputList = Array.from(form.querySelectorAll(inputSelector));
        isValidAllInputs(form, inputList, buttonSelector, buttonClassDisable);
        inputList.forEach(input=>{
            input.addEventListener("input", function(){
                isValid(form, input, errorClassVisible, inputErrorClass, buttonSelector, buttonClassDisable);
                isValidAllInputs(form, inputList, buttonSelector, buttonClassDisable);
            })
        })
    })
}
