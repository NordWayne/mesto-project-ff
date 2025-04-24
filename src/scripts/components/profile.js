export function setProfileInfo(name, description) {
  const profileTitle = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');
  
  profileTitle.textContent = name;
  profileDescription.textContent = description;
}

export function getProfileInfo() {
  const profileTitle = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');
  
  return {
    name: profileTitle.textContent,
    description: profileDescription.textContent
  };
}

export function handleProfileFormSubmit(evt, popup) {
  evt.preventDefault();
  
  const form = evt.target;
  const nameInput = form.querySelector('.popup__input_type_name');
  const descriptionInput = form.querySelector('.popup__input_type_description');
  
  setProfileInfo(nameInput.value, descriptionInput.value);
  popup.classList.remove('popup_is-opened');
} 