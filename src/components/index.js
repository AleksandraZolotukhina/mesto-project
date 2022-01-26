import './../index.css';

import {addPlace} from "./card.js";
import {closePopup, openPopup} from "./utils.js"
import {setUpValidation, isValidAllInputs} from "./validate.js";
import {clearErrorFields} from "./modal.js"
import {userInformation, initialCards, changeUserInfomation, addNewCard, changeUserAvatar} from "./api.js";

const content = document.querySelector(".page__content");

const buttonEdit = content.querySelector(".profile__button-edit");
const buttonAdd = content.querySelector(".profile__button-add");

const avatarEdit = content.querySelector(".profile__avatar-container");

const popups = document.querySelectorAll(".popup");
const popupProfile = content.querySelector(".popup_el_profile");
const popupPlace = content.querySelector(".popup_el_place");
export const popupPicture = content.querySelector(".popup_el_picture");
const popupAvatar = content.querySelector(".popup_el_avatar");

const newUserName = popupProfile.querySelector("#username");
const newDescribUser = popupProfile.querySelector("#occupation");
const newPlaceTitle = popupPlace.querySelector("#place-title");
const newLinkImage = popupPlace.querySelector("#link-image");
const newAvatar = popupAvatar.querySelector("#link-avatar");

const userName = content.querySelector(".profile__username");
const describUser = content.querySelector(".profile__description");
const userAvatar = content.querySelector(".profile__avatar");

export const cards = content.querySelector(".elements");
export const newPicture = popupPicture.querySelector(".picture__element");
export const pictureTitle = popupPicture.querySelector(".picture__title");
export const mestoCardTemplate = content.querySelector(".elements__mesto").content;

const buttonPopupAvatar = popupAvatar.querySelector(".form__button");
const buttonPopupProfile = popupProfile.querySelector(".form__button");
const buttonPopupPlace = popupPlace.querySelector(".form__button");

// добавляем информацию о пользователе
function addUserInformation(name, about){
   userName.textContent = name;
   describUser.textContent = about;
}

// добавляем фотографию пользователя
function addUserAvatar(name,avatar){
   userAvatar.src = avatar;
   userAvatar.alt = name;
}

export let userId;

Promise.all([userInformation(), initialCards()])
.then(([user, cards]) => {
   userId = user._id;
   addUserInformation(user.name, user.about);
   addUserAvatar(user.name,user.avatar)

   cards.reverse();
   cards.forEach(card=>{
      addPlace(card.name, card.link, card.likes, card._id, card.owner._id);
   })
})
.catch(err=>{
   console.log(err);
}) 

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
   newUserName.value = userName.textContent;
   newDescribUser.value = describUser.textContent;

   const inputList = Array.from(popupProfile.querySelectorAll(".form__input"));
   // делаем проверку на валидность, с помощью которой сохраняем доступ к кнопке
   isValidAllInputs(popupProfile.querySelector(enableValidation.buttonSelector), inputList, enableValidation.buttonClassDisable);

   // так как в input записали новые валидные значения, то ошибки удаляем
   clearErrorFields(popupProfile, inputList, enableValidation.errorClassVisible, enableValidation.inputErrorClass);
});

avatarEdit.addEventListener("click", function(){
   openPopup(popupAvatar);
   
   //делаем проверку на валидность, с помощью которой блокируем доступ к кнопке
   isValidAllInputs(popupAvatar.querySelector(enableValidation.buttonSelector), Array.from(popupAvatar.querySelectorAll(".form__input")), enableValidation.buttonClassDisable);
})

popupAvatar.addEventListener("submit", function(event){
   event.preventDefault();
   const dataAvatar = {
      avatar: newAvatar.value
   }
   const oldTextButton = buttonPopupAvatar.textContent;
   buttonPopupAvatar.textContent = "Сохранение...";
   changeUserAvatar(dataAvatar)
   .then((data) => {
      addUserAvatar(data.name, data.avatar);
      closePopup(popupAvatar);
      document.forms.newAvatar.reset();
   })
   .catch((err) => {
      console.log(err);
   })
   .finally(() => {
      buttonPopupAvatar.textContent = oldTextButton;
   })
})
//изменяем информацию о пользователе и закрываем popup
popupProfile.addEventListener("submit", function (event) {
   event.preventDefault();

   const newDataUser = {
      "name": newUserName.value,
      "about": newDescribUser.value
   }

   const oldTextButton = buttonPopupProfile.textContent;
   buttonPopupProfile.textContent = "Сохранение...";

   changeUserInfomation(newDataUser)
   .then((data)=>{
      addUserInformation(data.name, data.about);
      closePopup(popupProfile);
   })
   .catch((err) => {
      console.log(err);
   })
   .finally(()=>{
      buttonPopupProfile.textContent = oldTextButton;
   })
})

//открываем popup place
buttonAdd.addEventListener("click", function () {
   openPopup(popupPlace);
});

//добавляем новую карточку и очищаем поля формы
popupPlace.addEventListener("submit", function (event) {
   event.preventDefault();
   const dataCard = {
      "name": newPlaceTitle.value,
      "link": newLinkImage.value
   }
   const oldTextButton = buttonPopupPlace.textContent;
   buttonPopupPlace.textContent = "Сохранение...";

   addNewCard(dataCard)
   .then((data)=>{
      addPlace(data.name, data.link, data.likes, data._id, data.owner._id);
      closePopup(popupPlace);
      document.forms.newPlace.reset();
      // делаем проверку на валидность, с помощью которой блокируем доступ к кнопке
      isValidAllInputs(popupPlace.querySelector(enableValidation.buttonSelector), Array.from(popupPlace.querySelectorAll(".form__input")), enableValidation.buttonClassDisable);
   })
   .catch((err) => {
      console.log(err);
   })
   .finally(() => {
      buttonPopupPlace.textContent = oldTextButton;
   })
});

