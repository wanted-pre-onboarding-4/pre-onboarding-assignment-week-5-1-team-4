import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import SearchList from '../components/SearchList';
import { BiSearch } from 'react-icons/bi';
import { SearchContext } from '../store/search';
import searchApi from '../services/api';
import useDebounce from '../hooks/useDebounce';
const Search = () => {
  const { searches, setSearches } = useContext(SearchContext);
  const [searchText, setSearchText] = useState('');
  const [results, setResults] = useState([]);
  const onSearchSubmit = e => {
    e.preventDefault();
    setSearchText('');
  };

  const onSearchChange = e => {
    const text = e.target.value;
    setSearchText(text);
  };
  const debouncedSearchText = useDebounce(searchText, 200);

  useEffect(() => {
    if (debouncedSearchText === '') return;
    if (searches[debouncedSearchText]) {
      setResults(searches[debouncedSearchText]);
      return;
    }

    const getApi = async () => {
      const results = await searchApi(debouncedSearchText);
      setSearches(prev => ({ ...prev, [debouncedSearchText]: results.data }));
      setResults(results.data);
    };
    getApi();
  }, [debouncedSearchText]);

  return (
    <Wrap>
      <Title>국내 모든 임상시험 검색하고 온라인으로 참여하기</Title>
      <SearchSection onSubmit={onSearchSubmit}>
        <SearchInput
          onChange={onSearchChange}
          value={searchText}
          placeholder="🔍 검색어를 입력해주세요"
        ></SearchInput>
        <Button>
          <BiSearch />
        </Button>
      </SearchSection>
      <SearchResult>
        <SearchListTitle>추천 검색어</SearchListTitle>
        {results.length === 0 || searchText === '' ? (
          <div>검색어 없음</div>
        ) : (
          <SearchList results={results} searchText={searchText} />
        )}
      </SearchResult>
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #cae9ff;
  width: 100%;
  height: 100vh;
  row-gap: 1.5em;
`;

const Title = styled.h1`
  margin: 0 auto;
  display: block;
  font-weight: 700;
  font-size: 1.5em;
  margin-top: 90px;
`;
const SearchSection = styled.form`
  display: flex;
  align-items: center;
  background-color: white;
  padding: 14px 10px;
  border-radius: 40px;
  width: 480px;
  margin: 0 auto;
  column-gap: 3em;
`;

const SearchInput = styled.input`
  display: flex;
  flex: 1;
  border: none;
  outline: none;
`;

const Button = styled.button`
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
`;

const SearchResult = styled.div`
  margin: 0 auto;
  width: 480px;
  background-color: white;
  border-radius: 20px;
  padding: 20px;
`;

const SearchListTitle = styled.h2`
  color: grey;
  font-size: 12px;
`;

export default Search;
