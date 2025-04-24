export function openModal(modalElement) {
  modalElement.classList.add('popup_is-opened');
}

export function closeModal(modalElement) {
  modalElement.classList.remove('popup_is-opened');
}

export function handleOverlayClick(evt, modalElement) {
  if (evt.target === modalElement) {
    closeModal(modalElement);
  }
}

export function handleEscapeKey(evt, modalElements) {
  if (evt.key === 'Escape') {
    modalElements.forEach(modal => closeModal(modal));
  }
} 