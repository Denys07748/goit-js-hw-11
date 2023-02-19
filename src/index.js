import { getRefs } from './js/get-refs';
import PixabayApiService from './js/pixabay-service';
import { renderCards } from './js/render-cards';

const refs = getRefs();
const pixabayApiService = new PixabayApiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();

  pixabayApiService.query = e.currentTarget.elements.searchQuery.value;
  pixabayApiService.resetPage();
  pixabayApiService.fetchCards().then(hits => {
    clearCardsContainer();
    renderCards(hits);
  });
}

function onLoadMore() {
  pixabayApiService.fetchCards().then(renderCards);
}

function clearCardsContainer() {
  refs.galleryContainer.innerHTML = '';
}
