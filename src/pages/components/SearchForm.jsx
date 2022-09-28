import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import useDebounce from '../../hooks/useDebounce';
import searchApi from '../../services/api';
import { SearchContext } from '../../store/search';
import { BiSearch } from 'react-icons/bi';

const ArrowDown = 'ArrowDown';
const ArrowUp = 'ArrowUp';
const Escape = 'Escape';

const SearchForm = ({
  index,
  setIndex,
  searchText,
  setSearchText,
  scrollRef,
  results,
  setResults,
}) => {
  const { searches, setSearches } = useContext(SearchContext);
  const [isComposing, setIsComposing] = useState(false);
  const debouncedSearchText = useDebounce(searchText, 200);

  const onSearchSubmit = e => {
    e.preventDefault();
    setSearchText('');
  };

  const onSearchChange = e => {
    const text = e.target.value;
    setSearchText(text);
    setIndex(-1);
  };

  const handleKeyArrow = e => {
    if (isComposing) return;

    if (results.length <= 0) return;
    switch (e.key) {
      case ArrowDown:
        index === results.length - 1 ? setIndex(0) : setIndex(pre => pre + 1);
        scrollRef.current?.scrollIntoView({ bebehavior: 'smooth', block: 'center' });
        break;
      case ArrowUp:
        index === 0 ? setIndex(results.length - 1) : setIndex(pre => pre - 1);
        scrollRef.current?.scrollIntoView({ bebehavior: 'smooth', block: 'center' });
        break;
      case Escape: // esc key를 눌렀을때,
        setSearchText('');
        setResults([]);
        setIndex(-1);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (debouncedSearchText === '') return;
    if (searches[debouncedSearchText]) {
      setResults(searches[debouncedSearchText]);
      return;
    }

    const getApi = async () => {
      console.log('api 출력');
      try {
        let results = await searchApi(debouncedSearchText);
        const filteredData = results.data.filter(
          result => !result.sickCd.includes(debouncedSearchText.toUpperCase())
        );
        setSearches(prev => ({ ...prev, [debouncedSearchText]: filteredData }));
        setResults(filteredData);
      } catch (e) {
        alert(e.message);
      }
    };
    getApi();
  }, [debouncedSearchText]);

  return (
    <SearchSection onSubmit={onSearchSubmit}>
      <SearchInput
        onChange={onSearchChange}
        value={searchText}
        placeholder="🔍 검색어를 입력해주세요"
        onKeyDown={handleKeyArrow}
        onCompositionStart={() => setIsComposing(true)}
        onCompositionEnd={() => setIsComposing(false)}
        autoFocus
      ></SearchInput>
      <Button>
        <BiSearch />
      </Button>
    </SearchSection>
  );
};

const SearchSection = styled.form`
  display: flex;
  position: relative;
  align-items: center;
  background-color: white;
  padding: 20px 34px;
  border-radius: 40px;
  width: 480px;
  margin: 0 auto;
  column-gap: 3em;
  font-size: 1.7em;
  box-shadow: 7px 7px 9px #bcd9ed, -7px -7px 9px #d8f9ff;
`;

const SearchInput = styled.input`
  display: flex;
  flex: 1;
  border: none;
  outline: none;
`;

const Button = styled.button`
  position: absolute;
  right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  background-color: #017be8;
  color: white;
  font-size: 20px;
  border: none;
  cursor: pointer;
`;

export default SearchForm;
