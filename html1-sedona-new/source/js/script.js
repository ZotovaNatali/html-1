window.addEventListener('DOMContentLoaded', () => {

  if (document.querySelector('no-js')) {
    document.querySelector('no-js').classList.remove('no-js');
  }


  const btnModal = document.querySelectorAll('.button-modal');
  const modal = document.querySelector('.modal');
  const modalClose = document.querySelector('.modal-close-button');

  if (btnModal && modal) {
    btnModal.forEach((item) => {
      item.addEventListener('click', (evt) => {
        evt.preventDefault();
        modal.classList.remove('modal-close');
      });
    });

    modalClose.addEventListener('click', (evt) => {
      evt.preventDefault();
      modal.classList.add('modal-close');
    });
  }
});
