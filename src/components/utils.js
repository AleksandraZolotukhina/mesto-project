import {closeByEscape} from "./modal.js";

//Фукция открытия popup
export function openPopup(popup){
    popup.classList.add("popup_opened");
    document.addEventListener("keydown", closeByEscape);
}

//Фукция закрытия popup
export function closePopup(popup){
    popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", closeByEscape);
}