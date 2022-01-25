
const config = {
    baseUrl: "https://nomoreparties.co/v1/plus-cohort-6",
    headers: {
        authorization: "ecba0679-f434-4ccc-abfd-edac6e5eb036",
        "Content-Type": "application/json"
    }
}

export const userInformation = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
    .then(res => {
        if(res.ok){
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
}

export const initialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
    .then(res => {
        if(res.ok){
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
}

export const addLike = (id) => {
    return fetch(`${config.baseUrl}/cards/likes/${id}`, {
        method: "PUT",
        headers: config.headers
    })
    .then(res=>{
        if(res.ok){
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
}

export const removeLike = (id) => {
    return fetch(`${config.baseUrl}/cards/likes/${id}`,{
        method: "DELETE",
        headers: config.headers
    })
    .then(res => {
        if(res.ok){
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
}

export const changeUserInfomation = (dataUser) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: "PATCH",
        headers: config.headers,
        body: JSON.stringify(dataUser)
    })
    .then(res => {
        if(res.ok){
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
}

export const addNewCard = (dataCard) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: "POST",
        headers: config.headers,
        body: JSON.stringify(dataCard)
    })
    .then(res => {
        if(res.ok){
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
}

export const deleteCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: "DELETE",
        headers: config.headers
    })
    .then((res) => {
        if(res.ok){
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
}

export const changeUserAvatar = (newAvatar) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: config.headers,
        body: JSON.stringify(newAvatar)
    })
    .then((res) => {
        if(res.ok){
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
}


