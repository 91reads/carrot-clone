import SearchIcon from '@mui/icons-material/Search';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

const SearchFormContainer = styled.form`
  cursor: pointer;

  input {
    border-radius: var(--br-12);
    padding: 0.4rem;
    border: 1px solid var(--gray-2);
  }
  input:hover {
  }
`;

const SearchFormInner = styled.div`
  display: flex;
  align-items: center;
  div {
    padding-left: 0.8rem;
    svg {
      position: relative;
      top: 0.2rem;
      font-size: 2rem;
    }
  }
`;

const SearchForm = ({ search, set_search, set_watch_search }: any) => {
  const { register, watch, resetField } = useForm();

  const watchSearch = watch('search', false);

  useEffect(() => {
    if (set_watch_search) {
      set_watch_search(watchSearch);
    }
  }, [watchSearch]);

  const onSearch = () => {
    set_search(!search);
    resetField('search');
  }
  return (
    <SearchFormContainer>
      <SearchFormInner>
        {search && <input {...register('search')} type="text" />}
        <div onClick={onSearch}>
          <SearchIcon />
        </div>
      </SearchFormInner>
    </SearchFormContainer>
  );
};

export default SearchForm;
