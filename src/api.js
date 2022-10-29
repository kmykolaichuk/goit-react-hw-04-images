import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';

export const fetchImages = async (search, page) => {
  const response = await axios.get(
    `/?q=${search}&page=${page}&key=29822518-04e2ef9290d818246b595cdf4&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response.data.hits.map(({ id, webformatURL, largeImageURL }) => {
    return { id, webformatURL, largeImageURL };
  });
};
