import { Component } from 'react';
import { HiSearch } from 'react-icons/hi';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import {
  SearchbarHeader,
  Form,
  FormButton,
  FormInput,
} from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    searchImage: '',
  };

  onInputChange = evt => {
    this.setState({ searchImage: evt.currentTarget.value.toLowerCase() });
  };

  onSubmit = evt => {
    evt.preventDefault();
    if (this.state.searchImage.trim() === '') {
      toast.error('Please, enter your search query. ', {
        position: 'top-right',
      });
      this.setState({ searchImage: '' });
      return;
    }
    this.props.onSubmit(this.state.searchImage);
    this.setState({ searchImage: '' });
  };

  render() {
    return (
      <SearchbarHeader>
        <Form onSubmit={this.onSubmit}>
          <FormButton type="submit">
            <HiSearch size={26} /> <span>Search</span>
          </FormButton>

          <FormInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchImage}
            onChange={this.onInputChange}
          />
        </Form>
      </SearchbarHeader>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
