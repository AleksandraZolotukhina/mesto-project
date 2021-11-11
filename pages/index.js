const content = document.querySelector(".page__content");

const buttonEdit = content.querySelector(".profile__button-edit");
const buttonAdd = content.querySelector(".profile__button-add");

const popupProfile = content.querySelector(".popup_el_profile");
const popupPlace = content.querySelector(".popup_el_place");
const popupPicture = content.querySelector(".popup_el_picture");

const inputUserName = popupProfile.querySelector("#username");
const inputDescribUser = popupProfile.querySelector("#description-user");

const userName = content.querySelector(".profile__username");
const describUser = content.querySelector(".profile__description");

const cards = content.querySelector(".elements");
const newPicture = popupPicture.querySelector(".picture__element");

const mestoCardTemplate = content.querySelector(".elements__mesto").content;
const newPlaceTitle = popupPlace.querySelector("#place-title");
const newLinkImage = popupPlace.querySelector("#link-image");
const initialCards = [
    {
        name: 'Москва',
        link: 'https://images.unsplash.com/photo-1561117937-45681fb935ad?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80'
    },
    {
        name: 'Казань',
        link: 'https://images.unsplash.com/photo-1600421539016-cc3f0866d2b0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=765&q=80'
    },
    {
        name: 'Нижний Новгород',
        link: 'https://images.unsplash.com/photo-1602702829656-f00794246ff5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=685&q=80'
    },
    {
        name: 'Санкт-Петербург',
        link: 'https://images.unsplash.com/photo-1555460285-763ba96917d2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80'
    },
    {
        name: 'Байкал',
        link: 'https://images.unsplash.com/photo-1551845041-63e8e76836ea?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=689&q=80'
    },
    {
        name: 'Петропавловск-Камчатский',
        link: 'https://images.unsplash.com/photo-1557270668-f0abca9e410f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80'
    }
];

//Фукция открытия и закрытия popup
function togglePopup(popup) {
    popup.classList.toggle("popup_opened");
}
//Функция добавления карточек
function addCard(cards,item){
    cards.prepend(item);
}
//Функция создания карточек
function addPlace(title, link) {
    const newPlace = mestoCardTemplate.querySelector(".elements__element").cloneNode(true);
    const initialPicture =  newPlace.querySelector(".elements__picture");
    initialPicture.src = link;
    initialPicture.alt = title;
    newPlace.querySelector(".elements__title").textContent = title;

    addCard(cards,newPlace);

    //ставим и убираем лайки карточкам
    newPlace.querySelector(".elements__like-button").addEventListener("click", function (event) {
        const likeButton = event.target;
        likeButton.classList.toggle("elements__like-button_active");
    })

    //удаляем карточки
    newPlace.querySelector(".elements__trash").addEventListener("click", function (event) {
        const deleteCards = event.target;
        deleteCards.parentElement.remove();
    })

    //нажатием на фотографию карточки появляется popup picture
    newPlace.querySelector(".elements__picture").addEventListener("click", function (event) {
        const pictureTitle = event.target.parentElement.querySelector(".elements__title");
        newPicture.src = event.target.src;
        newPicture.alt = pictureTitle.textContent;
        popupPicture.querySelector(".picture__title").textContent = pictureTitle.textContent;
        togglePopup(popupPicture);
    })

}

//Добавляем карточки из массива
initialCards.forEach((item) => {
    addPlace(item["name"], item["link"]);
});

//при нажатии на кнопку "изменение" показываем popup
buttonEdit.addEventListener("click", function () {
    togglePopup(popupProfile);
    // в input записываем имя пользователя и описание о себе
    inputUserName.value = userName.textContent;
    inputDescribUser.value = describUser.textContent;

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

//добавляем новую карточку 
popupPlace.addEventListener("submit", function (event) {
    event.preventDefault();
    togglePopup(popupPlace);
    addPlace(newPlaceTitle.value, newLinkImage.value);
    newPlaceTitle.value = "";
    newLinkImage.value = "";
});

//закрываем popup place
buttonAdd.addEventListener("click", function () {
    togglePopup(popupPlace);
});

//нажатие на кнопку закрытия popup
function clickButtonClose(popupElement) {
    popupElement.querySelector(".popup__button_el_close").addEventListener("click", function () {
        togglePopup(popupElement);
    })
}
clickButtonClose(popupProfile);
clickButtonClose(popupPlace);
clickButtonClose(popupPicture);
