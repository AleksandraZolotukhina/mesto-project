
import {hideError} from "./validate.js"

// очищаем поля ошибок в popup-е
export function clearErrorFields(popup, inputList, errorClassVisible, inputErrorClass){
    inputList.forEach(input=>{
       hideError(popup, input, errorClassVisible, inputErrorClass)
    });
 }