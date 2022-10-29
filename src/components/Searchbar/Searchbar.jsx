import { useState } from 'react';
import { HiSearch } from 'react-icons/hi';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import {
  SearchbarHeader,
  Form,
  FormButton,
  FormInput,
} from './Searchbar.styled';

export default function Searchbar({ onSubmit }) {
  const [searchImage, setSearchImage] = useState('');

  const onInputChange = evt => {
    setSearchImage(evt.currentTarget.value.toLowerCase());
  };

  const onInputSubmit = evt => {
    evt.preventDefault();
    if (searchImage.trim() === '') {
      toast.error('Please, enter your search query. ', {
        position: 'top-right',
      });
      setSearchImage('');
      return;
    }
    onSubmit(searchImage);
    setSearchImage('');
  };

  return (
    <SearchbarHeader>
      <Form onSubmit={onInputSubmit}>
        <FormButton type="submit">
          <HiSearch size={26} /> <span>Search</span>
        </FormButton>

        <FormInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchImage}
          onChange={onInputChange}
        />
      </Form>
    </SearchbarHeader>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
