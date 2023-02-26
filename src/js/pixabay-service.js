import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api';
const KEY = '29295423-17b569e792d85c50ff51a3d1b';

export default class PixabayApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.perPage = 40;
    this.totalHits = 0;
  }

  async fetchCards() {
    const axios = require('axios');
    const response = await axios.get(`${BASE_URL}`, {
      params: {
        key: KEY,
        q: this.searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: this.page,
        per_page: this.perPage,
      },
    });

    this.incrementPage();
    this.totalHits = response.data.totalHits;

    return response.data.hits;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
