import {openPopup} from "./utils.js";
import {cards, mestoCardTemplate, newPicture, pictureTitle, popupPicture, userId} from "./index.js";
import {addLike, removeLike, deleteCard} from "./api.js";

// ставим лайк
function activeLike(likeButton){
    likeButton.classList.add("elements__like-button_active");
}

// убираем лайк
function inactiveLike(likeButton){
    likeButton.classList.remove("elements__like-button_active");
}

// делаем кнопку лайка активной, если уже раньше лайкали эту карточку
function isMylike(likes, likeButton){
    likes.forEach(like=>{
        if(like._id === userId){
            activeLike(likeButton);
        }
    })
}

// если карточка не принадлжеит пользователю, то запрещаем ее удалять
function isMyCard(idOwner, trash){
    if(idOwner !== userId){
        trash.classList.add("elements__trash_hidden");
    }
}

// изменяем количество лайков
function changeLikeCount(countLike, likes){
    countLike.textContent = likes.length;
}

//ставим и убираем лайки карточкам
function addLikeEvent(cardId, countLike, likeButton){
    likeButton.addEventListener("click", function () {
        if(!likeButton.classList.contains("elements__like-button_active")){
            addLike(cardId)
            .then((data) => {
                changeLikeCount(countLike, data.likes);
                activeLike(likeButton);
            })
            .catch((err) => {
                console.log(err); 
            })
        }
        else{
            removeLike(cardId)
            .then((data) => {
                changeLikeCount(countLike, data.likes);
                inactiveLike(likeButton);
            })
            .catch((err) => {
                console.log(err);
            })
        }
    })
}

//удаляем карточки
function addDeleteEvent(trash, cardId){
    trash.addEventListener("click", function () {
        deleteCard(cardId)
        .then(() => {
            trash.parentElement.remove();
        })
        .catch((err) => {
            console.log(err);
        })
       
    })
}

//Функция создания карточек
function createCard(title, link, likes, cardId, idOwner){
    const newPlace = mestoCardTemplate.querySelector(".elements__element").cloneNode(true);
    const initialPicture =  newPlace.querySelector(".elements__picture");
    const titleCard = newPlace.querySelector(".elements__title")
    const countLike = newPlace.querySelector(".elements__count-like");
    const likeButton = newPlace.querySelector(".elements__like-button");
    const trash = newPlace.querySelector(".elements__trash");

    titleCard.textContent = title;
    initialPicture.src = link;
    initialPicture.alt = title;

    changeLikeCount(countLike, likes);
    isMylike(likes, likeButton);
    isMyCard(idOwner, trash);
    addLikeEvent(cardId, countLike, likeButton);
    addDeleteEvent(trash, cardId);
    addPopupPictureEvent(initialPicture, title, link);

    return newPlace;
}

//Функция добавления карточек
function addCard(cards, item){
    cards.prepend(item);
}

//нажатием на фотографию карточки появляется popup picture
function addPopupPictureEvent(picture, title, link){
    picture.addEventListener("click", function () {
        newPicture.src = link;
        newPicture.alt = title;
        pictureTitle.textContent = title;
        openPopup(popupPicture);
    })
}

//Функция взаимодействия с карточками
export function addPlace(title, link, likes, cardId, idOwner) {
    const newCard = createCard(title, link, likes, cardId, idOwner);
    addCard(cards, newCard);
}




