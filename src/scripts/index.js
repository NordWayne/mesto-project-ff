import "./../pages/index.css";
import { createCard, deleteCard, handleLike } from "./components/card.js";
import {
  openModal,
  closeModal,
  handleOverlayClick,
} from "./components/modal.js";
import FormValidator from "../utils/FormValidator.js";
import Api from "../utils/Api.js";
const cardTemplate = document.querySelector("#card-template");
const placesList = document.querySelector(".places__list");

const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditPopup = document.querySelector(".popup_type_edit");
const profileCloseButton = profileEditPopup.querySelector(".popup__close");
const profileForm = profileEditPopup.querySelector(".popup__form");
const profileSaveButton = profileForm.querySelector(".popup__button");

const profileAddButton = document.querySelector(".profile__add-button");
const profileAddPopup = document.querySelector(".popup_type_new-card");
const profileAddCloseButton = profileAddPopup.querySelector(".popup__close");
const profileAddForm = profileAddPopup.querySelector(".popup__form");
const profileAddSaveButton = profileAddForm.querySelector(".popup__button");

const profileAvatarButton = document.querySelector(".profile__image");
const profileAvatarPopup = document.querySelector(".popup_type_avatar");
const profileAvatarCloseButton =
  profileAvatarPopup.querySelector(".popup__close");
const profileAvatarForm = profileAvatarPopup.querySelector(".popup__form");
const profileAvatarInput = profileAvatarForm.querySelector("#avatarLink");
const profileAvatarSaveButton =
  profileAvatarForm.querySelector(".popup__button");

const imagePopup = document.querySelector(".popup_type_image");
const imageCloseButton = imagePopup.querySelector(".popup__close");
const popupImage = imagePopup.querySelector(".popup__image");
const popupCaption = imagePopup.querySelector(".popup__caption");

const nameInput = profileForm.querySelector(".popup__input_type_name");
const descriptionInput = profileForm.querySelector(
  ".popup__input_type_description"
);
const cardNameInput = profileAddForm.querySelector(
  ".popup__input_type_card-name"
);

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const linkInput = document.querySelector(".popup__input_type_url");

let userId;

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inputInvalidClass: "popup__input_state_invalid",
  buttonInvalidClass: "popup__button_invalid",
};

const editFormValidator = new FormValidator(
  validationConfig,
  profileEditPopup.querySelector(".popup__form")
);
editFormValidator.enableValidation();
const addFormValidator = new FormValidator(
  validationConfig,
  profileAddPopup.querySelector(".popup__form")
);
addFormValidator.enableValidation();
const editAvatarFormValidator = new FormValidator(
  validationConfig,
  profileEditPopup.querySelector(".popup__form")
);
editAvatarFormValidator.enableValidation();
const avatarFormValidator = new FormValidator(
  validationConfig,
  profileAvatarPopup.querySelector(".popup__form")
);
avatarFormValidator.enableValidation();

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-mag-4",
  headers: {
    authorization: "76a4dd5f-64dc-4a0f-a5d3-565c2f5e1f91",
    "Content-Type": "application/json",
  },
});

function setProfileInfo(name, description, avatar) {
  profileTitle.textContent = name;
  profileDescription.textContent = description;
  if (avatar) {
    profileAvatarButton.style.backgroundImage = `url(${avatar})`;
  }
}

function getProfileInfo() {
  return {
    name: profileTitle.textContent,
    description: profileDescription.textContent,
  };
}

function handleProfileFormSubmit(evt, popup) {
  evt.preventDefault();
  profileSaveButton.textContent = "Сохранение...";
  api
    .editUserInfo(nameInput.value, descriptionInput.value)
    .then((userInfo) => {
      setProfileInfo(userInfo.name, userInfo.about);
    })
    .finally(() => {
      closeModal(popup);
      profileSaveButton.textContent = "Сохранить";
    });
}

function handleProfileAvatarFormSubmit(evt) {
  evt.preventDefault();
  profileAvatarSaveButton.textContent = "Сохранение...";
  avatarFormValidator.resetValidation();
  api
    .editUserAvatar(profileAvatarInput.value)
    .then((userInfo) => {
      setProfileInfo(userInfo.name, userInfo.about, userInfo.avatar);
    })
    .finally(() => {
      closeModal(profileAvatarPopup);
      profileAvatarSaveButton.textContent = "Сохранить";
    });
}

function handleAddCardFormSubmit(evt, popup, cardTemplate) {
  evt.preventDefault();
  const form = evt.target;

  const cardData = {
    name: cardNameInput.value,
    link: linkInput.value,
  };

  profileAddSaveButton.textContent = "Сохранение...";

  api
    .addCard(cardData.name, cardData.link)
    .then((cardData) => {
      const cardElement = createCard(
        cardData,
        deleteCard,
        cardTemplate,
        handleLike,
        onCardImageClick,
        userId
      );
      placesList.insertBefore(cardElement, placesList.firstChild);
    })
    .finally(() => {
      profileAddSaveButton.textContent = "Сохранить";
      form.reset();
      closeModal(popup);
    });
}

api.getInitialCards().then((cards) => {
  cards.forEach((cardData) => {
    const cardElement = createCard(
      cardData,
      deleteCard,
      cardTemplate,
      handleLike,
      onCardImageClick,
      userId
    );
    placesList.append(cardElement);
  });
});

api.getUserInfo().then((userInfo) => {
  setProfileInfo(userInfo.name, userInfo.about, userInfo.avatar);
  userId = userInfo._id;
});

profileEditButton.addEventListener("click", () => {
  const { name, description } = getProfileInfo();
  nameInput.value = name;
  descriptionInput.value = description;

  openModal(profileEditPopup);
  editFormValidator.resetValidation();
});

function onCardImageClick(cardData) {
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupCaption.textContent = cardData.name;
  openModal(imagePopup);
}

profileForm.addEventListener("submit", (evt) =>
  handleProfileFormSubmit(evt, profileEditPopup)
);
profileCloseButton.addEventListener("click", () =>
  closeModal(profileEditPopup)
);

profileAddButton.addEventListener("click", () => {
  openModal(profileAddPopup);
  addFormValidator.resetValidation();
});
profileAddCloseButton.addEventListener("click", () =>
  closeModal(profileAddPopup)
);
profileAddForm.addEventListener("submit", (evt) =>
  handleAddCardFormSubmit(evt, profileAddPopup, cardTemplate, imagePopup)
);

imageCloseButton.addEventListener("click", () => closeModal(imagePopup));

profileEditPopup.addEventListener("click", (evt) =>
  handleOverlayClick(evt, profileEditPopup)
);
profileAddPopup.addEventListener("click", (evt) =>
  handleOverlayClick(evt, profileAddPopup)
);
imagePopup.addEventListener("click", (evt) =>
  handleOverlayClick(evt, imagePopup)
);
profileAvatarPopup.addEventListener("click", (evt) =>
  handleOverlayClick(evt, profileAvatarPopup)
);

profileAvatarButton.addEventListener("click", () => {
  openModal(profileAvatarPopup);
  editAvatarFormValidator.resetValidation();
});
profileAvatarCloseButton.addEventListener("click", () =>
  closeModal(profileAvatarPopup)
);
profileAvatarForm.addEventListener("submit", (evt) =>
  handleProfileAvatarFormSubmit(evt, profileAvatarPopup)
);
