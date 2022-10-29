import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { fetchImages } from '../api';
import Searchbar from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { LoadMoreBtn } from './Button/Button';
import { Loader } from './Loader/Loader';
import Modal from './Modal/Modal';

export default function App() {
  const [searchImage, setSearchImage] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');
  const [showModal, setShowModal] = useState(false);
  const [largeImageModal, setLargeImageModal] = useState(null);

  useEffect(() => {
    if (searchImage === '') {
      return;
    }

    async function renderImages() {
      setStatus('pending');

      try {
        const imageList = await fetchImages(searchImage, page);
        setImages(images => [...images, ...imageList]);
        setStatus('resolved');

        if (imageList.length === 0) {
          toast.error(
            'Sorry, there are no images matching your search query. Please, try again.',
            {
              position: 'top-right',
            }
          );
        }
      } catch (error) {
        toast.error('Something went wrong. Please, reload the page.', {
          position: 'top-right',
        });
        setStatus('rejected');
      }
    }

    renderImages();
  }, [searchImage, page]);

  const onFormSubmit = searchQuery => {
    setSearchImage(searchQuery);
    setImages([]);
    setPage(1);
  };

  const onClickLoadBtn = () => {
    setPage(page => page + 1);
  };

  const onToggleModal = largeImageURL => {
    setShowModal(showModal => !showModal);
    setLargeImageModal(largeImageURL);
  };

  return (
    <>
      <Searchbar onSubmit={onFormSubmit} />
      {images.length > 0 && (
        <ImageGallery pictures={images} onClick={onToggleModal} />
      )}
      {status === 'pending' && <Loader />}
      {(images.length === 12 || images.length > 12) && (
        <LoadMoreBtn onClick={onClickLoadBtn} />
      )}
      {showModal && (
        <Modal onClose={onToggleModal}>
          <img src={largeImageModal} alt="" />
        </Modal>
      )}
      <ToastContainer autoClose={3000} />
    </>
  );
}
