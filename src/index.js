import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
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
const gallery = lightbox();

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.btnEl.addEventListener('click', onLoadMore);

async function onSearch(e) {
  e.preventDefault();

  pixabayApiService.query = e.currentTarget.elements.searchQuery.value.trim();

  if (pixabayApiService.query === '') {
    Notify.warning('The input field cannot be empty.');
    return;
  }

  loadMoreBtn.show();
  loadMoreBtn.disable();
  pixabayApiService.resetPage();

  try {
    const dataHits = await pixabayApiService.fetchCards();
    if (dataHits.length === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      loadMoreBtn.hide();
      clearCardsContainer();
      return;
    }

    Notify.success(`Hooray! We found ${pixabayApiService.totalHits} images.`);
    clearCardsContainer();
    renderCards(dataHits);
    loadMoreBtn.enable();
    gallery.refresh();
  } catch (error) {
    Notify.failure(`${error}`);
  }
}

async function onLoadMore(e) {
  e.preventDefault();

  loadMoreBtn.disable();
  if (
    pixabayApiService.page * pixabayApiService.perPage >
    pixabayApiService.totalHits
  ) {
    Notify.info("We're sorry, but you've reached the end of search results.");
    loadMoreBtn.hide();
  }

  try {
    const dataHits = await pixabayApiService.fetchCards();
    renderCards(dataHits);
    gallery.refresh();
    loadMoreBtn.enable();
  } catch (error) {
    Notify.failure(`${error}`);
  }
}

function lightbox() {
  const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  });

  return lightbox;
}

function clearCardsContainer() {
  refs.galleryContainer.innerHTML = '';
}
