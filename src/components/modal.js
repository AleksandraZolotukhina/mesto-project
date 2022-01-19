
import {hideError} from "./validate.js"
import {closePopup} from "./utils.js";

// очищаем поля ошибок в popup-е
export function clearErrorFields(popup, inputList, errorClassVisible, inputErrorClass){
    inputList.forEach(input=>{
       hideError(popup, input, errorClassVisible, inputErrorClass)
    });
 }
 // закрываем popup при нажатии Escape
export function closeByEscape(event){
   if(event.key==="Escape"){
      const popup = document.querySelector(".popup_opened");
      closePopup(popup);
   }
}
