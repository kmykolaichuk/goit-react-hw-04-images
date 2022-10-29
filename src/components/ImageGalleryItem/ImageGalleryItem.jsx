import PropTypes from 'prop-types';

import { Item, Image } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({
  webformatURL,
  largeImageURL,
  onClickImage,
}) => {
  return (
    <Item onClick={() => onClickImage(largeImageURL)}>
      <Image src={webformatURL} alt="" />
    </Item>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onClickImage: PropTypes.func.isRequired,
};
