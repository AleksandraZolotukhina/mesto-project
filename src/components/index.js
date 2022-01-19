import './../index.css';

import moscowImage from "./../images/Moscow.jpg";
import kazanImage from "./../images/Kazan.jpg";
import nizhnyNovgorodImage from "./../images/Nizhny_Novgorod.jpg";
import saintPetersburgImage from "./../images/Saint-Petersburg.jpg";
import baikalImage from "./../images/Baikal.jpg";
import petropavlovskKamchatskyImage from "./../images/Petropavlovsk-Kamchatsky.jpg";

import {addPlace} from "./card.js";
import {closePopup, openPopup} from "./utils.js"
import {setUpValidation, isValidAllInputs} from "./validate.js";
import {clearErrorFields} from "./modal.js"

const content = document.querySelector(".page__content");

const buttonEdit = content.querySelector(".profile__button-edit");
const buttonAdd = content.querySelector(".profile__button-add");

const popups = document.querySelectorAll(".popup");
const popupProfile = content.querySelector(".popup_el_profile");
const popupPlace = content.querySelector(".popup_el_place");
export const popupPicture = content.querySelector(".popup_el_picture");

const inputUserName = popupProfile.querySelector("#username");
const inputDescribUser = popupProfile.querySelector("#occupation");

const userName = content.querySelector(".profile__username");
const describUser = content.querySelector(".profile__description");

export const cards = content.querySelector(".elements");
export const newPicture = popupPicture.querySelector(".picture__element");
export const pictureTitle = popupPicture.querySelector(".picture__title");
export const mestoCardTemplate = content.querySelector(".elements__mesto").content;
const newPlaceTitle = popupPlace.querySelector("#place-title");
const newLinkImage = popupPlace.querySelector("#link-image");

const initialCards = [
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

// вызываем валидацию
setUpValidation(enableValidation);

//Добавляем карточки из массива
initialCards.forEach((item) => {
   addPlace(item["name"], item["link"]);
});

// закрываем popup при нажатии на крестик или оверлей
popups.forEach(popup => {
   popup.addEventListener("mousedown", function(event){
      if(event.target.classList.contains("popup") || event.target.matches(".popup__button_el_close")){
         closePopup(popup);
      }
   })
})

//при нажатии на кнопку "изменение" показываем popup
buttonEdit.addEventListener("click", function () {
   openPopup(popupProfile);
   // в input записываем имя пользователя и описание о себе
   inputUserName.value = userName.textContent;
   inputDescribUser.value = describUser.textContent;
   const inputList = Array.from(popupProfile.querySelectorAll(".form__input"));

   // делаем проверку на валидность, с помощью которой сохраняем доступ к кнопке
   isValidAllInputs(popupProfile.querySelector(enableValidation.buttonSelector), inputList, enableValidation.buttonClassDisable);

   // так как в input записали новые валидные значения, то ошибки удаляем
   clearErrorFields(popupProfile, inputList, enableValidation.errorClassVisible, enableValidation.inputErrorClass);
});

//изменяем информацию о пользователе и закрываем popup
popupProfile.addEventListener("submit", function (event) {
   event.preventDefault();
   const newUserName = inputUserName.value;
   const newDescribUser = inputDescribUser.value;
   userName.textContent = newUserName;
   describUser.textContent = newDescribUser;
   closePopup(popupProfile);

})

//открываем popup place
buttonAdd.addEventListener("click", function () {
   openPopup(popupPlace);
});

//добавляем новую карточку и очищаем поля формы
popupPlace.addEventListener("submit", function (event) {
   event.preventDefault();
   closePopup(popupPlace);
   addPlace(newPlaceTitle.value, newLinkImage.value);
   document.forms.newPlace.reset();

   const inputList = Array.from(popupPlace.querySelectorAll(".form__input"));

   // делаем проверку на валидность, с помощью которой блокируем доступ к кнопке
   isValidAllInputs(popupPlace.querySelector(enableValidation.buttonSelector), inputList, enableValidation.buttonClassDisable);
});
