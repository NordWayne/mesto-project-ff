import './../pages/index.css';
import { initialCards } from './cards';
import { createCard, deleteCard, handleLike } from './components/card.js';
import { openModal, closeModal, handleOverlayClick, handleEscapeKey } from './components/modal.js';

const cardTemplate = document.querySelector('#card-template');
const placesList = document.querySelector('.places__list');

const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditPopup = document.querySelector('.popup_type_edit');
const profileCloseButton = profileEditPopup.querySelector('.popup__close');
const profileForm = profileEditPopup.querySelector('.popup__form');

const profileAddButton = document.querySelector('.profile__add-button');
const profileAddPopup = document.querySelector('.popup_type_new-card');
const profileAddCloseButton = profileAddPopup.querySelector('.popup__close');
const profileAddForm = profileAddPopup.querySelector('.popup__form');

const imagePopup = document.querySelector('.popup_type_image');
const imageCloseButton = imagePopup.querySelector('.popup__close');
const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');

const nameInput = profileForm.querySelector('.popup__input_type_name');
const descriptionInput = profileForm.querySelector('.popup__input_type_description');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const linkInput = document.querySelector('.popup__input_type_url');

function setProfileInfo(name, description) {
  profileTitle.textContent = name;
  profileDescription.textContent = description;
}

function getProfileInfo() {
  return {
    name: profileTitle.textContent,
    description: profileDescription.textContent
  };
}

function handleProfileFormSubmit(evt, popup) {
  evt.preventDefault();
  
  setProfileInfo(nameInput.value, descriptionInput.value);
  closeModal(popup)
} 

initialCards.forEach(cardData => {
  const cardElement = createCard(cardData, deleteCard, cardTemplate, handleLike, onCardImageClick);
  placesList.append(cardElement);
});

profileEditButton.addEventListener('click', () => {
  const { name, description } = getProfileInfo();
  nameInput.value = name;
  descriptionInput.value = description;
  
  openModal(profileEditPopup);
});

function handleAddCardFormSubmit(evt, popup, cardTemplate) {
  evt.preventDefault();
  const form = evt.target;
  
  const cardData = {
    name: nameInput.value,
    link: linkInput.value
  };
  
  const cardElement = createCard(cardData, deleteCard, cardTemplate, handleLike, onCardImageClick);
  placesList.insertBefore(cardElement, placesList.firstChild);
  form.reset();
  closeModal(popup)
} 

function onCardImageClick(cardData) {
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupCaption.textContent = cardData.name;
  openModal(imagePopup);
}

profileForm.addEventListener('submit', (evt) => handleProfileFormSubmit(evt, profileEditPopup));
profileCloseButton.addEventListener('click', () => closeModal(profileEditPopup));

profileAddButton.addEventListener('click', () => openModal(profileAddPopup));
profileAddCloseButton.addEventListener('click', () => closeModal(profileAddPopup));
profileAddForm.addEventListener('submit', (evt) => handleAddCardFormSubmit(evt, profileAddPopup, cardTemplate, imagePopup));

imageCloseButton.addEventListener('click', () => closeModal(imagePopup));

profileEditPopup.addEventListener('click', (evt) => handleOverlayClick(evt, profileEditPopup));
profileAddPopup.addEventListener('click', (evt) => handleOverlayClick(evt, profileAddPopup));
imagePopup.addEventListener('click', (evt) => handleOverlayClick(evt, imagePopup));


