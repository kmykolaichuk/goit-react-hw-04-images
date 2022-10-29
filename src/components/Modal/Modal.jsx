import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Overlay, DivModal } from './Modal.styled';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown);
  }

  onKeyDown = evt => {
    if (evt.code === 'Escape') {
      this.props.onClose();
    }
  };

  onBackdropClick = evt => {
    if (evt.currentTarget === evt.target) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <Overlay onClick={this.onBackdropClick}>
        <DivModal>{this.props.children}</DivModal>
      </Overlay>,
      document.querySelector('#modal-root')
    );
  }
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
};
