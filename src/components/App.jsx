import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { fetchImages } from '../api';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { LoadMoreBtn } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    searchImage: '',
    images: [],
    page: 1,
    status: 'idle',
    showModal: false,
    largeImageModal: null,
  };

  async componentDidUpdate(_, prevState) {
    const prevSearch = prevState.searchImage;
    const newSearch = this.state.searchImage;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevSearch !== newSearch || prevPage !== nextPage) {
      this.setState({ status: 'pending' });
      if (prevSearch !== newSearch) {
        this.setState({ page: 1 });
      }

      try {
        const imageList = await fetchImages(newSearch, nextPage);
        this.setState(prevState => ({
          images: [...prevState.images, ...imageList],
          status: 'resolved',
        }));
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
        this.setState({ status: 'rejected' });
      }
    }
  }

  onFormSubmit = searchImage => {
    this.setState({ searchImage, images: [], page: 1 });
  };

  onClickLoadBtn = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  onToggleModal = largeImageURL => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
    this.setState({ largeImageModal: largeImageURL });
  };

  render() {
    const { images, status, showModal, largeImageModal } = this.state;

    return (
      <>
        <Searchbar onSubmit={this.onFormSubmit} />
        {images.length > 0 && (
          <ImageGallery pictures={images} onClick={this.onToggleModal} />
        )}
        {status === 'pending' && <Loader />}
        {(images.length === 12 || images.length > 12) && (
          <LoadMoreBtn onClick={this.onClickLoadBtn} />
        )}
        {showModal && (
          <Modal onClose={this.onToggleModal}>
            <img src={largeImageModal} alt="" />
          </Modal>
        )}
        <ToastContainer autoClose={3000} />
      </>
    );
  }
}
