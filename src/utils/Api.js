export default class Api{
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }
    getUserInfo(){
        return fetch(`${this._baseUrl}/users/me `,{headers: this._headers})
            .then(res=> this._checkResponse(res));
    }
    editUserInfo(name,about){
        return fetch (`${this._baseUrl}/users/me`,{
            method: 'PATCH',
            headers:this._headers,
            body:JSON.stringify({
                name: name,
                about: about
            })
        })
            .then(response => this._checkResponse(response))
    }
    editUserAvatar(avatar){
        return fetch (`${this._baseUrl}/users/me/avatar`,{
            method: 'PATCH',
            headers:this._headers,
            body:JSON.stringify({
                avatar: avatar
            })
        })
            .then(response => this._checkResponse(response))
    }
    getInitialCards(){
        return fetch(`${this._baseUrl}/cards`,{headers: this._headers})
            .then(res=> this._checkResponse(res));
    }
    addCard(name,link){
        return fetch(`${this._baseUrl}/cards`,{
            method: "POST",
            headers: this._headers,
            body:JSON.stringify({
                name:name,
                link:link
            })
        })
            .then(res=> this._checkResponse(res));
    }
    deleteCard(cardId){
        return fetch(`${this._baseUrl}/cards/${cardId}`,{
            method: "DELETE",
            headers: this._headers})
            .then(res=> this._checkResponse(res));
    }
    likeCard(cardId){
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`,{
            method:"PUT",
            headers: this._headers})
            .then(res=> this._checkResponse(res));
    }
    unlikeCard(cardId){
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`,{
            method:"DELETE",
            headers: this._headers})
            .then(res=> this._checkResponse(res));
    }
    _checkResponse(response){
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(`Возникла ошибка: ${response.status}`);
    }






}