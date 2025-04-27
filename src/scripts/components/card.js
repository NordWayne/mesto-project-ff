import { api } from "../../utils/Api.js";

export function createCard(cardData, deleteCallback, cardTemplate, likeCallback, onCardImageClick, userId) {
  const cardElement = cardTemplate.content.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCounter = cardElement.querySelector('.card__like-counter');

  likeCounter.textContent = cardData.likes.length;  

  if (cardData.owner._id !== userId) {
    deleteButton.remove();
  }

  const isUserLiked = cardData.likes.some((item) => {
    return item._id === userId
  })
  if(isUserLiked) {
    likeButton.classList.add("card__like-button_is-active")
  }
  
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  
  deleteButton.addEventListener('click', () => deleteCallback(cardElement, cardData._id));
  likeButton.addEventListener('click', (event) => {
    likeCallback(likeButton, cardData, likeCounter, event);
  });
  cardImage.addEventListener('click', () => {
    onCardImageClick(cardData);
  });
  
  return cardElement;
}

export function deleteCard(cardElement, cardId) {
  api.deleteCard(cardId).then(() => {
    cardElement.remove();
  }).catch((err) => {
    console.log(err);
  })
}

export function handleLike(likeButton, cardData, likeCounter, event) {
  if (event.target.classList.contains("card__like-button_is-active")) {
    api.unlikeCard(cardData._id).then((res) => {
      likeButton.classList.remove("card__like-button_is-active");
      likeCounter.textContent = res.likes.length;
    }).catch((err) => {
      console.log(err);
    })
  } else {
    api.likeCard(cardData._id).then((res) => {
      likeButton.classList.add("card__like-button_is-active");
      likeCounter.textContent = res.likes.length;
    }).catch((err) => {
      console.log(err);
    })
  }
} 