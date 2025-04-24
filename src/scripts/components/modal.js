export function openModal(modalElement) {
  modalElement.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscapeKey);
}

export function closeModal(modalElement) {
  modalElement.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscapeKey);
}

export function handleOverlayClick(evt, modalElement) {
  if (evt.target === modalElement) {
    closeModal(modalElement);
  }
}

export function handleEscapeKey(evt) {
  if(evt.key === 'Escape') {
     closeModal(document.querySelector('.popup_is-opened'));
  }
}