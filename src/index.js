import 'notiflix/dist/notiflix-3.2.6.min.css';
import 'slim-select/dist/slimselect.css';

import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';

import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const select = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

function showLoader() {
  Notiflix.Loading.circle();
}

function hideLoader() {
  Notiflix.Loading.remove();
}

function showError() {
  Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
}

function updateCatInfo() {
  catInfo.innerHTML = '';
}

function showCatInfo(catData) {

  updateCatInfo();

  const catImage = catData[0].url;
  const catName = catData[0].breeds[0].name;
  const catDescription = catData[0].breeds[0].description;
  const catTemperament = catData[0].breeds[0].temperament;

  catInfo.innerHTML = `
    <img src="${catImage}" alt="${catName}" width="400">
    <h2>${catName}</h2>
    <p><strong>Description:</strong> ${catDescription}</p>
    <p><strong>Temperament:</strong> ${catTemperament}</p>
  `;

    catInfo.classList.remove('hidden');
    hideLoader();
    
    Notiflix.Notify.success('Cat info loaded successfully!');
}

function init() {
  showLoader(); 

  fetchBreeds()
    .then(breeds => {
      breeds.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed.id;
        option.textContent = breed.name;
        select.appendChild(option);
      });

      new SlimSelect({
        select: '.breed-select',
        placeholder: 'Select a breed...',
      });

    //   Notiflix.Notify.success('Breeds loaded successfully!');
      hideLoader(); 
    })
    .catch(() => showError())
    .finally(hideLoader);
}

select.addEventListener('change', () => {
  const selectedBreedId = select.value;
  if (!selectedBreedId) return;

  error.classList.add('hidden');
  catInfo.classList.add('hidden');
  showLoader(); 

  fetchCatByBreed(selectedBreedId)
    .then(showCatInfo)
    .catch(() => {
      showError();
      updateCatInfo();
    })
    .finally(() => {
      hideLoader();
    });
});

init();

