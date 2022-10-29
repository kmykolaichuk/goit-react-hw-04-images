import PropTypes from 'prop-types';
import { Button, DivButton } from './Button.styled';

export const LoadMoreBtn = ({ onClick }) => {
  return (
    <DivButton>
      <Button type="submit" onClick={onClick}>
        Load more
      </Button>
    </DivButton>
  );
};

LoadMoreBtn.propTypes = {
  onClick: PropTypes.func.isRequired,
};
