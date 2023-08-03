import axios from 'axios';

const API_BASE_URL = 'https://api.thecatapi.com/v1';
axios.defaults.headers.common["x-api-key"] = "live_dGFB8vXe1lWWkleqSljVv9382ZOq49HHl0IA29ubpZlz7iT5X8oa6eOblD13c4ph";

export function fetchBreeds() {
  return axios.get(`${API_BASE_URL}/breeds`)
    .then(response => response.data)
    .catch(error => {
      console.error('Ошибка при выполнении запроса:', error.message);
      throw error;
    });
}

export function fetchCatByBreed(breedId) {
  return axios.get(`${API_BASE_URL}/images/search`, {
    params: {
      breed_ids: breedId,
    }
  })
    .then(response => response.data)
    .catch(error => {
      console.error('Ошибка при выполнении запроса:', error.message);
      throw error;
    });
}