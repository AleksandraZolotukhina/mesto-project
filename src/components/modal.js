import {togglePopup} from "./utils.js";

//нажатие на кнопку закрытия popup
export function clickButtonClose(popupElement) {
    popupElement.querySelector(".popup__button_el_close").addEventListener("click", function () {
        togglePopup(popupElement);
    })
}
