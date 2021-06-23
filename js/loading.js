import {CUSTOM_EVENTS} from './constants';

const className = '.loading';
const visibleClassName = 'loading--visible';
const loadingElement = document.querySelector(className);

const setup = () => {
  window.addEventListener(CUSTOM_EVENTS.toggleLoading, handleToggleLoading);
};

const handleToggleLoading = (e) => {
  if (e.detail)
    loadingElement.classList.add(visibleClassName);
  else
    loadingElement.classList.remove(visibleClassName);
}

export {setup};