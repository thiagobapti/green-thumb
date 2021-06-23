import {CUSTOM_EVENTS} from './constants';

const className = '.dropdown';
const textClassName = '.dropdown__text';
const optionClassName = '.dropdown__item';
const closedClassName = 'dropdown--closed';
const selectedOptionClassName = 'dropdown__item--selected';
const dropdownElements = document.querySelectorAll(className);
const options = {};

const setup = () => {
  window.addEventListener('click', handleWindowClick);
  dropdownElements.forEach((dropdown) => {
    dropdown.addEventListener('click', handleDropdownClick)}
  );
};

const handleWindowClick = (e) => {
  const dropdown = e.target.closest(className);

  if(!dropdown)
    closeDropDowns();
}

const handleDropdownClick = (e) => {
  const dropdown = e.target.closest(className);
  const option = e.target.closest(optionClassName);

  if (dropdown.classList.contains(closedClassName))
    dropdown.classList.remove(closedClassName);
  else
    dropdown.classList.add(closedClassName);

  if(option)
    setOption(dropdown, option);

  closeDropDowns(dropdown);
}

const closeDropDowns = (doNotTouchDropdown) => {
  dropdownElements.forEach((dropdown) => {
    if(dropdown !== doNotTouchDropdown)
      dropdown.classList.add(closedClassName);
  });
};

const setOption = (dropdown, option) => {
  const dropDownOptions = dropdown.querySelectorAll(optionClassName);

  dropDownOptions.forEach((option) => {
    option.classList.remove(selectedOptionClassName);
  });

  option.classList.add(selectedOptionClassName);
  options[dropdown.id] = option.dataset.value;
  dropdown.querySelector(textClassName).innerText = option.innerText;

  if (options.sun && options.water && options.pets) {
    const loadDataEvent = new CustomEvent(CUSTOM_EVENTS.loadData, { detail: options});
    window.dispatchEvent(loadDataEvent);
  }
}

export {setup, options};