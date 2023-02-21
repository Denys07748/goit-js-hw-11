import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { getRefs } from './js/get-refs';
import PixabayApiService from './js/pixabay-service';
import { renderCards } from './js/render-cards';
import LoadMoreBtn from './js/load-more-btn';

const refs = getRefs();
const pixabayApiService = new PixabayApiService();
const loadMoreBtn = new LoadMoreBtn({
  selector: '.load-more',
  hidden: true,
});

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.btnEl.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();

  pixabayApiService.query = e.currentTarget.elements.searchQuery.value;

  if (pixabayApiService.query === '') {
    Notify.warning('The input field cannot be empty.');
    return;
  }

  loadMoreBtn.show();
  loadMoreBtn.disable();
  pixabayApiService.resetPage();

  pixabayApiService
    .fetchCards()
    .then(hits => {
      Notify.success(`Hooray! We found ${pixabayApiService.totalHits} images.`);
      clearCardsContainer();
      renderCards(hits);
      loadMoreBtn.enable();
    })
    .catch(error => Notify.failure(`${error}`));
}

function onLoadMore() {
  loadMoreBtn.disable();
  if (
    pixabayApiService.page * pixabayApiService.perPage >
    pixabayApiService.totalHits
  ) {
    Notify.info("We're sorry, but you've reached the end of search results.");
    loadMoreBtn.hide();
  }

  pixabayApiService.fetchCards().then(hits => {
    renderCards(hits);
    loadMoreBtn.enable();
  });
}

function clearCardsContainer() {
  refs.galleryContainer.innerHTML = '';
}
