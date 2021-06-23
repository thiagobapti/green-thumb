import {CUSTOM_EVENTS} from './constants';

const apiDomain = 'https://front-br-challenges.web.app';
const apiPath = '/api/v2/green-thumb/';
const footerClassName = 'results__item-footer';
const itemClassName = 'results__item';
const emptyHiddenClassName = 'results__empty--hidden';
const resultsHiddenClassName = 'results__container--hidden';
const imageWrapperClassName = 'results__item-image-wrapper';
const imageClassName = 'results__item-image';
const nameClassName = 'results__item-name';
const specsClassName = 'results__item-specs';
const priceClassName = 'results__item-price';
const attributesClassName = 'results__item-attributes';
const attributeClassName = 'results__item-attribute';
const itemsElement = document.querySelector('.results__items');
const emptyElement = document.querySelector('.results__empty');
const resultsElement = document.querySelector('.results__container');

const setup = () => {
  window.addEventListener(CUSTOM_EVENTS.loadData, handleLoadData);
};

const handleLoadData = (e) => {
  const options = e.detail;
  const apiGetParameters = `?sun=${options.sun}&water=${options.water}&pets=${options.pets}`;
  const apiUrl = `${apiDomain}${apiPath}${apiGetParameters}`;

  window.dispatchEvent(new CustomEvent(CUSTOM_EVENTS.toggleLoading, {
    detail: true
  }));

  fetch(apiUrl)
  .then((response) => response.json())
  .then((jsonResponse) => {
    toggleResultEmptyState(jsonResponse);
    window.dispatchEvent(new CustomEvent(CUSTOM_EVENTS.toggleLoading, {
      detail: false
    }));
  });
}

const toggleResultEmptyState = (resultData) => {
  const validResult = Array.isArray(resultData);

  if (validResult) {
    emptyElement.classList.add(emptyHiddenClassName);
    resultsElement.classList.remove(resultsHiddenClassName);
    renderResult(resultData);
  } else {
    emptyElement.classList.remove(emptyHiddenClassName);
    resultsElement.classList.add(resultsHiddenClassName);
  }
}

const renderResult = (resultData) => {
  itemsElement.innerHTML = '';

  resultData.forEach((item) => {
    const itemElement = document.createElement('div');
    const imageWrapperElement = document.createElement('div');
    const imageElement = document.createElement('img');
    const footerElement = document.createElement('div');
    const nameElement = document.createElement('div');
    const specsElement = document.createElement('div');
    const priceElement = document.createElement('div');
    const attributesElement = document.createElement('div');
    const sunAttributeElement = document.createElement('div');
    const waterAttributeElement = document.createElement('div');
    const PetsAttributeElement = document.createElement('div');

    // Attributes
    attributesElement.className = attributesClassName;
    sunAttributeElement.className = `${attributeClassName} ${attributeClassName}--sun-${item.sun}`;
    waterAttributeElement.className = `${attributeClassName} ${attributeClassName}--water-${item.water}`;
    PetsAttributeElement.className = `${attributeClassName} ${attributeClassName}--pets-${item.toxicity}`;

    // Price
    priceElement.className = priceClassName;
    priceElement.innerText = `$${item.price}`;

    // Specs
    specsElement.className = specsClassName;

    // Name
    nameElement.className = nameClassName;
    nameElement.innerText = item.name;

    // Footer
    footerElement.className = footerClassName;

    // Image Wrapper
    imageWrapperElement.className = imageWrapperClassName;

    // Image
    imageElement.src = item.url;
    imageElement.className = imageClassName;
    imageElement.alt = item.name;

    // Item
    itemElement.className = itemClassName;
    itemElement.addEventListener('click', (e) => {
      window.open(`https://www.google.com/search?q=${item.name}`, '_blank');
    });

    attributesElement.appendChild(sunAttributeElement);
    attributesElement.appendChild(waterAttributeElement);
    attributesElement.appendChild(PetsAttributeElement);
    specsElement.appendChild(priceElement);
    specsElement.appendChild(attributesElement);
    footerElement.appendChild(nameElement);
    footerElement.appendChild(specsElement);
    imageWrapperElement.appendChild(imageElement);
    itemElement.appendChild(imageWrapperElement);
    itemElement.appendChild(footerElement);
    itemsElement.appendChild(itemElement);
  })
}

export {setup};