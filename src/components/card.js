import {togglePopup} from "./utils.js";
import {cards, mestoCardTemplate, newPicture, pictureTitle, popupPicture} from "./index.js";

//ставим и убираем лайки карточкам
function addLikeEvent(card){
    card.querySelector(".elements__like-button").addEventListener("click", function (event) {
        const likeButton = event.target;
        likeButton.classList.toggle("elements__like-button_active");
    })
}
//удаляем карточки
function addDeleteEvent(card){
    card.querySelector(".elements__trash").addEventListener("click", function (event) {
        const deleteCards = event.target;
        deleteCards.parentElement.remove();
    })
}

//Функция создания карточек
function createCard(title,link){
    const newPlace = mestoCardTemplate.querySelector(".elements__element").cloneNode(true);
    const initialPicture =  newPlace.querySelector(".elements__picture");
    initialPicture.src = link;
    initialPicture.alt = title;
    newPlace.querySelector(".elements__title").textContent = title;
    
    return newPlace;
}

//Функция добавления карточек
function addCard(cards,item){
    cards.prepend(item);
}

//нажатием на фотографию карточки появляется popup picture
function addPopupPictureEvent(card,title,link){
    card.querySelector(".elements__picture").addEventListener("click", function () {
        newPicture.src = link;
        newPicture.alt = title;
        pictureTitle.textContent = title;
        togglePopup(popupPicture);
    })
}

//Функция взаимодействия с карточками
export function addPlace(title, link) {
    const newCard = createCard(title,link);
    addLikeEvent(newCard);
    addDeleteEvent(newCard);
    addPopupPictureEvent(newCard,title,link)
    addCard(cards,newCard);
}



