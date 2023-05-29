window.addEventListener('DOMContentLoaded', () => {
  const btnModal = document.querySelectorAll('.button-modal');
  const modal = document.querySelector('.modal-container');
  const modalClose = document.querySelector('.modal-close-button');

  if (btnModal && modal) {
    btnModal.forEach((item) => {
      item.addEventListener('click', (evt) => {
        evt.preventDefault();
        modal.classList.remove('modal-container-close');
      });
    });

    modalClose.addEventListener('click', (evt) => {
      evt.preventDefault();
      modal.classList.add('modal-container-close');
    });
  }
});
