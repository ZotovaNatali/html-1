class ItcTabs {
  constructor(target, config) {
    const defaultConfig = {};
    this._config = Object.assign(defaultConfig, config);
    this._elTabs = typeof target === 'string' ? document.querySelector(target) : target;
    this._elButtons = this._elTabs.querySelectorAll('[data-tabs-button]');
    this._elPanes = this._elTabs.querySelectorAll('[data-tabs-pane]');
    this._eventShow = new Event('tab.itc.change');
    this._init();
    this._events();
  }
  _init() {
    this._elTabs.setAttribute('role', 'tablist');
    this._elButtons.forEach((el, index) => {
      el.dataset.index = index;
      el.setAttribute('role', 'tab');
      this._elPanes[index].setAttribute('role', 'tabpanel');
    });
  }
  show(elLinkTarget) {
    const elPaneTarget = this._elPanes[elLinkTarget.dataset.index];
    const elLinkActive = this._elTabs.querySelector('.is-active');
    const elPaneShow = this._elTabs.querySelector('.is-show');
    if (elLinkTarget === elLinkActive) {
      return;
    }
    elLinkActive ? elLinkActive.classList.remove('is-active') : null;
    elPaneShow ? elPaneShow.classList.remove('is-show') : null;
    elLinkTarget.classList.add('is-active');
    elPaneTarget.classList.add('is-show');
    this._elTabs.dispatchEvent(this._eventShow);
    elLinkTarget.focus();
  }
  showByIndex(index) {
    const elLinkTarget = this._elButtons[index];
    elLinkTarget ? this.show(elLinkTarget) : null;
  };
  _events() {
    this._elTabs.addEventListener('click', (e) => {
      const target = e.target.closest('[data-tabs-button]');
      if (target) {
        e.preventDefault();
        this.show(target);
      }
    });
  }
}

export const initTabs = () => {
  new ItcTabs('[data-tabs]');
}
