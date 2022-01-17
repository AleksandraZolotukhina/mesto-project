import './../index.css';

import moscowImage from "./../../images/Moscow.jpg";
import kazanImage from "./../../images/Kazan.jpg";
import nizhnyNovgorodImage from "./../../images/Nizhny_Novgorod.jpg";
import saintPetersburgImage from "./../../images/Saint-Petersburg.jpg";
import baikalImage from "./../../images/Baikal.jpg";
import petropavlovskKamchatskyImage from "./../../images/Petropavlovsk-Kamchatsky.jpg";

import {addPlace} from "./card.js";
import {clickButtonClose} from "./modal.js"
import {togglePopup} from "./utils.js"

import {setUpValidation} from "./validate.js";
import {inDisableButton} from "./validate.js";

const content = document.querySelector(".page__content");

export const buttonEdit = content.querySelector(".profile__button-edit");
export const buttonAdd = content.querySelector(".profile__button-add");

export const popupProfile = content.querySelector(".popup_el_profile");
export const popupPlace = content.querySelector(".popup_el_place");
export const popupPicture = content.querySelector(".popup_el_picture");

export const inputUserName = popupProfile.querySelector("#username");
export const inputDescribUser = popupProfile.querySelector("#occupation");

export const userName = content.querySelector(".profile__username");
export const describUser = content.querySelector(".profile__description");

export const cards = content.querySelector(".elements");
export const newPicture = popupPicture.querySelector(".picture__element");
export const pictureTitle = popupPicture.querySelector(".picture__title");
export const mestoCardTemplate = content.querySelector(".elements__mesto").content;
export const newPlaceTitle = popupPlace.querySelector("#place-title");
export const newLinkImage = popupPlace.querySelector("#link-image");

export const initialCards = [
   {
      name: 'Москва',
      link: moscowImage
   },
   {
      name: 'Казань',
      link: kazanImage
   },
   {
      name: 'Нижний Новгород',
      link: nizhnyNovgorodImage
   },
   {
      name: 'Санкт-Петербург',
      link: saintPetersburgImage
   },
   {
      name: 'Байкал',
      link: baikalImage
   },
   {
      name: 'Петропавловск-Камчатский',
      link: petropavlovskKamchatskyImage
   }
];

const enableValidation= ({
   formSelector: ".form",
   inputSelector: ".form__input",
   errorClassVisible: "form__error_visible",
   inputErrorClass: "form__input_error",
   buttonSelector: ".button",
   buttonClassDisable: "button_disable"
});  

setUpValidation(enableValidation);

//при нажатии на кнопку "изменение" показываем popup
buttonEdit.addEventListener("click", function () {
   togglePopup(popupProfile);
   // в input записываем имя пользователя и описание о себе
   inputUserName.value = userName.textContent;
   inputDescribUser.value = describUser.textContent;
   inDisableButton(popupProfile, enableValidation.buttonSelector, enableValidation.buttonClassDisable);
});

//изменяем информацию о пользователе
popupProfile.addEventListener("submit", function (event) {
   event.preventDefault();
   const newUserName = inputUserName.value;
   const newDescribUser = inputDescribUser.value;
   userName.textContent = newUserName;
   describUser.textContent = newDescribUser;
   togglePopup(popupProfile);

})

//открываем popup place
buttonAdd.addEventListener("click", function () {
   togglePopup(popupPlace);
});

//добавляем новую карточку 
popupPlace.addEventListener("submit", function (event) {
   event.preventDefault();
   togglePopup(popupPlace);
   addPlace(newPlaceTitle.value, newLinkImage.value);
   newPlaceTitle.value = "";
   newLinkImage.value = "";
});

//Добавляем карточки из массива
initialCards.forEach((item) => {
   addPlace(item["name"], item["link"]);
});
clickButtonClose(popupProfile);
clickButtonClose(popupPlace);
clickButtonClose(popupPicture);
