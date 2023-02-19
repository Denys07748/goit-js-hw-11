import { getRefs } from './get-refs';

const refs = getRefs();

export const renderCards = cards => {
  const markup = cards
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<a class="photo-card item" href="${largeImageURL}">
            <div class="image-wrapper">
                <img src="${webformatURL}" alt="${tags}" loading="lazy" />
                <div class="info">
                    <p class="info-item">
                    <b><span>Likes</span></br>${likes}</b>
                    </p>
                    <p class="info-item">
                    <b><span>Views</span></br>${views}</b>
                    </p>
                    <p class="info-item">
                    <b><span>Comments</span></br>${comments}</b>
                    </p>
                    <p class="info-item">
                    <b><span>Downloads</span></br>${downloads}</b>
                    </p>
                </div>
            </div>
        </a>`
    )
    .join('');

  refs.galleryContainer.insertAdjacentHTML('beforeend', markup);
};
