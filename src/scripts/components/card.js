export function createCard(cardData, deleteCallback, cardTemplate, imagePopup, likeCallback) {
  const cardElement = cardTemplate.content.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  
  deleteButton.addEventListener('click', () => deleteCallback(cardElement));
  
  likeButton.addEventListener('click', () => {
    likeCallback(likeButton);
  });
  
  cardImage.addEventListener('click', () => {
    const popupImage = imagePopup.querySelector('.popup__image');
    const popupCaption = imagePopup.querySelector('.popup__caption');
    popupImage.src = cardData.link;
    popupImage.alt = cardData.name;
    popupCaption.textContent = cardData.name;
    imagePopup.classList.add('popup_is-opened');
  });
  
  return cardElement;
}

export function deleteCard(cardElement) {
  cardElement.remove();
}

export function handleLike(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
} 