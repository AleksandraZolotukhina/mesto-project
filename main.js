(()=>{"use strict";var e={d:(t,n)=>{for(var o in n)e.o(n,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:n[o]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};function t(e,t){e.classList.add(t),e.disabled=!0}function n(e,t,n,o){e.querySelector(".".concat(t.id,"-error")).classList.remove(n),t.classList.remove(o)}function o(e,n,o){!function(e){return e.some((function(e){return!e.validity.valid}))}(n)?function(e,t){e.classList.remove(t),e.disabled=!1}(e,o):t(e,o)}function r(e){"Escape"===e.key&&a(document.querySelector(".popup_opened"))}function c(e){e.classList.add("popup_opened"),document.addEventListener("keydown",r)}function a(e){e.classList.remove("popup_opened"),document.removeEventListener("keydown",r)}e.d({},{_u:()=>A,Q0:()=>w,NT:()=>D,e$:()=>U,S:()=>S,xS:()=>d});var u={baseUrl:"https://nomoreparties.co/v1/plus-cohort-6",headers:{authorization:"ecba0679-f434-4ccc-abfd-edac6e5eb036","Content-Type":"application/json"}};function s(e){e.classList.add("elements__like-button_active")}function i(e,t){e.textContent=t.length}function l(e,t,n,o,r){var a=w.querySelector(".elements__element").cloneNode(!0),l=a.querySelector(".elements__picture"),f=a.querySelector(".elements__title"),_=a.querySelector(".elements__count-like"),m=a.querySelector(".elements__like-button"),p=a.querySelector(".elements__trash");return f.textContent=e,l.src=t,l.alt=e,i(_,n),function(e,t){e.forEach((function(e){e._id===d&&s(t)}))}(n,m),function(e,t){e!==d&&t.classList.add("elements__trash_hidden")}(r,p),function(e,t,n){n.addEventListener("click",(function(){var o;n.classList.contains("elements__like-button_active")?function(e){return fetch("".concat(u.baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:u.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}(e).then((function(e){i(t,e.likes),function(e){e.classList.remove("elements__like-button_active")}(n)})).catch((function(e){console.log(e)})):(o=e,fetch("".concat(u.baseUrl,"/cards/likes/").concat(o),{method:"PUT",headers:u.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(e){i(t,e.likes),s(n)})).catch((function(e){console.log(e)}))}))}(o,_,m),function(e,t){e.addEventListener("click",(function(){(function(e){return fetch("".concat(u.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:u.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))})(t).then((function(){e.parentElement.remove()})).catch((function(e){console.log(e)}))}))}(p,o),function(e,t,n){e.addEventListener("click",(function(){D.src=n,D.alt=t,U.textContent=t,c(S)}))}(l,e,t),a}function f(e,t,n,o,r){var c=l(e,t,n,o,r);!function(e,t){e.prepend(t)}(A,c)}var d,_=document.querySelector(".page__content"),m=_.querySelector(".profile__button-edit"),p=_.querySelector(".profile__button-add"),h=_.querySelector(".profile__avatar-container"),y=document.querySelectorAll(".popup"),v=_.querySelector(".popup_el_profile"),b=_.querySelector(".popup_el_place"),S=_.querySelector(".popup_el_picture"),q=_.querySelector(".popup_el_avatar"),k=v.querySelector("#username"),C=v.querySelector("#occupation"),E=b.querySelector("#place-title"),L=b.querySelector("#link-image"),j=q.querySelector("#link-avatar"),x=_.querySelector(".profile__username"),g=_.querySelector(".profile__description"),P=_.querySelector(".profile__avatar"),A=_.querySelector(".elements"),D=S.querySelector(".picture__element"),U=S.querySelector(".picture__title"),w=_.querySelector(".elements__mesto").content,T=q.querySelector(".form__button"),O=v.querySelector(".form__button"),N=b.querySelector(".form__button");function J(e,t,n){x.textContent=e,g.textContent=t,P.src=n,P.alt=e}Promise.all([fetch("".concat(u.baseUrl,"/users/me"),{headers:u.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})),fetch("".concat(u.baseUrl,"/cards"),{headers:u.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))]).then((function(e){d=e[0]._id,J(e[0].name,e[0].about,e[0].avatar),e[1].reverse(),e[1].forEach((function(e){f(e.name,e.link,e.likes,e._id,e.owner._id)}))})).catch((function(e){console.log(e)}));var V,H,z,M,Q,$,B,F={formSelector:".form",inputSelector:".form__input",errorClassVisible:"form__error_visible",inputErrorClass:"form__input_error",buttonSelector:".button",buttonClassDisable:"button_disable"};H=(V=F).formSelector,z=V.inputSelector,M=V.errorClassVisible,Q=V.inputErrorClass,$=V.buttonSelector,B=V.buttonClassDisable,Array.from(document.querySelectorAll(H)).forEach((function(e){var r=Array.from(e.querySelectorAll(z)),c=e.querySelector($);o(c,r,B),r.forEach((function(a){a.addEventListener("input",(function(){!function(e,o,r,c,a,u,s){o.validity.valid?n(e,o,c,a):(function(e,t,n,o){var r=e.querySelector(".".concat(t.id,"-error"));r.classList.add(n),r.textContent=t.validationMessage,t.classList.add(o)}(e,o,c,a),t(r,u))}(e,a,c,M,Q,$),o(c,r,B)}))}))})),y.forEach((function(e){e.addEventListener("mousedown",(function(t){(t.target.classList.contains("popup")||t.target.matches(".popup__button_el_close"))&&a(e)}))})),m.addEventListener("click",(function(){c(v),k.value=x.textContent,C.value=g.textContent;var e=Array.from(v.querySelectorAll(".form__input"));o(v.querySelector(F.buttonSelector),e,F.buttonClassDisable),function(e,t,o,r){t.forEach((function(t){n(e,t,o,r)}))}(v,e,F.errorClassVisible,F.inputErrorClass)})),h.addEventListener("click",(function(){c(q),o(q.querySelector(F.buttonSelector),Array.from(q.querySelectorAll(".form__input")),F.buttonClassDisable)})),q.addEventListener("submit",(function(e){e.preventDefault();var t={avatar:j.value},n=T.textContent;T.textContent="Сохранение...",function(e){return fetch("".concat(u.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:u.headers,body:JSON.stringify(e)}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}(t).then((function(e){P.src=e.avatar})).catch((function(e){console.log(e)})).finally((function(){a(q),document.forms.newAvatar.reset(),T.textContent=n}))})),v.addEventListener("submit",(function(e){e.preventDefault();var t,n={name:k.value,about:C.value},o=O.textContent;O.textContent="Сохранение...",(t=n,fetch("".concat(u.baseUrl,"/users/me"),{method:"PATCH",headers:u.headers,body:JSON.stringify(t)}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(e){J(e.name,e.about)})).catch((function(e){console.log(e)})).finally((function(){a(v),O.textContent=o}))})),p.addEventListener("click",(function(){c(b)})),b.addEventListener("submit",(function(e){e.preventDefault();var t={name:E.value,link:L.value},n=N.textContent;N.textContent="Сохранение...",function(e){return fetch("".concat(u.baseUrl,"/cards"),{method:"POST",headers:u.headers,body:JSON.stringify(e)}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}(t).then((function(e){f(e.name,e.link,e.likes,e._id,e.owner._id)})).catch((function(e){console.log(e)})).finally((function(){a(b),document.forms.newPlace.reset(),N.textContent=n,o(b.querySelector(F.buttonSelector),Array.from(b.querySelectorAll(".form__input")),F.buttonClassDisable)}))}))})();