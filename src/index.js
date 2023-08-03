import 'notiflix/dist/notiflix-3.2.6.min.css';
import 'slim-select/dist/slimselect.css';

import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';

import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const select = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

// Функция для обработки ошибок
function handleError(error) {
  error.textContent = 'Произошла ошибка: ' + error.message;
  error.classList.remove('hidden');
    loader.classList.add('hidden');
    
    Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
}

// Функция для отображения информации о коте
function showCatInfo(catData) {
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
    loader.classList.add('hidden');

    Notiflix.Notify.success('Cat info loaded successfully!');
}

// Обработчик события change для селекта
select.addEventListener('change', () => {
  const selectedBreedId = select.value;
  if (!selectedBreedId) return; // Проверка на пустое значение (не выбрана порода)

  error.classList.add('hidden');
  catInfo.classList.add('hidden');
  loader.classList.remove('hidden');

  fetchCatByBreed(selectedBreedId)
    .then(showCatInfo)
    .catch(handleError);
});

// Загрузка списка пород при запуске страницы
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
      
      Notiflix.Notify.success('Breeds loaded successfully!');
  })
  .catch(handleError);

