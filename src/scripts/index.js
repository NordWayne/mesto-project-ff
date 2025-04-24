import './../pages/index.css';
import { initialCards } from './cards';
import { createCard, deleteCard, handleLike } from './components/card.js';
import { openModal, closeModal, handleOverlayClick, handleEscapeKey } from './components/modal.js';
import { getProfileInfo, handleProfileFormSubmit } from './components/profile.js';

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

initialCards.forEach(cardData => {
  const cardElement = createCard(cardData, deleteCard, cardTemplate, imagePopup, handleLike);
  placesList.append(cardElement);
});

profileEditButton.addEventListener('click', () => {
  const { name, description } = getProfileInfo();
  const nameInput = profileForm.querySelector('.popup__input_type_name');
  const descriptionInput = profileForm.querySelector('.popup__input_type_description');
  
  nameInput.value = name;
  descriptionInput.value = description;
  
  openModal(profileEditPopup);
});

function handleAddCardFormSubmit(evt, popup, cardTemplate, imagePopup) {
  evt.preventDefault();
  
  const form = evt.target;
  const nameInput = form.querySelector('.popup__input_type_card-name');
  const linkInput = form.querySelector('.popup__input_type_url');
  
  const cardData = {
    name: nameInput.value,
    link: linkInput.value
  };
  
  const cardElement = createCard(cardData, deleteCard, cardTemplate, imagePopup, handleLike);
  const placesList = document.querySelector('.places__list');
  
  placesList.insertBefore(cardElement, placesList.firstChild);
  
  form.reset();
  popup.classList.remove('popup_is-opened');
} 



profileForm.addEventListener('submit', (evt) => handleProfileFormSubmit(evt, profileEditPopup));
profileCloseButton.addEventListener('click', () => closeModal(profileEditPopup));

profileAddButton.addEventListener('click', () => openModal(profileAddPopup));
profileAddCloseButton.addEventListener('click', () => closeModal(profileAddPopup));
profileAddForm.addEventListener('submit', (evt) => handleAddCardFormSubmit(evt, profileAddPopup, cardTemplate, imagePopup));

imageCloseButton.addEventListener('click', () => closeModal(imagePopup));

document.addEventListener('keydown', (evt) => handleEscapeKey(evt, [profileEditPopup, profileAddPopup, imagePopup]));

profileEditPopup.addEventListener('click', (evt) => handleOverlayClick(evt, profileEditPopup));
profileAddPopup.addEventListener('click', (evt) => handleOverlayClick(evt, profileAddPopup));
imagePopup.addEventListener('click', (evt) => handleOverlayClick(evt, imagePopup));


