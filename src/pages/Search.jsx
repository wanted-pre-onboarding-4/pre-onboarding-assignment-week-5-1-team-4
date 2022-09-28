import React, { useState } from 'react';
import styled from 'styled-components';
import SearchList from './components/SearchList';
import { useRef } from 'react';
import SearchForm from './components/SearchForm';

const Search = () => {
  const [results, setResults] = useState([]);
  const scrollRef = useRef(null);
  const [searchText, setSearchText] = useState('');
  const [index, setIndex] = useState(-1);
  return (
    <Wrap>
      <TitleWrap>
        <Title>국내 모든 임상시험 검색하고</Title> <Title> 온라인으로 참여하기</Title>
      </TitleWrap>
      <SearchForm
        index={index}
        setIndex={setIndex}
        searchText={searchText}
        setSearchText={setSearchText}
        scrollRef={scrollRef}
        results={results}
        setResults={setResults}
      />
      {searchText.length !== 0 ? (
        <SearchResult>
          <SearchListTitle>추천 검색어</SearchListTitle>
          {results.length === 0 || searchText === '' ? (
            <NoResult>검색어 없음</NoResult>
          ) : (
            <SearchList
              ref={scrollRef}
              results={results}
              index={index}
              setResults={setResults}
              searchText={searchText}
            />
          )}
        </SearchResult>
      ) : null}
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #cae9ff;
  width: 100%;
  height: 100vh;
  row-gap: 1.5em;
  background-image: url('/img/character1.svg'), url('/img/character2.svg'),
    url('/img/character3.svg'), url('/img/character3.svg');
  background-size: 16%, 16%, 17%;
  background-repeat: no-repeat;
  background-position: 16% 60%, 48% 89%, 83% 65%;
`;

const TitleWrap = styled.div`
  margin: 0 auto;
  display: block;
  margin-top: 9em;
`;
const Title = styled.h1`
  text-align: center;
  font-weight: 700;
  line-height: 1.5em;
  font-size: 2em;
`;

const SearchResult = styled.div`
  margin: 0 auto;
  width: 480px;
  border-radius: 20px;
  padding: 30px;
  background-color: white;
  box-shadow: 7px 7px 9px #bcd9ed, -7px -7px 9px #d8f9ff;
  z-index: 2;
`;

const NoResult = styled.p`
  margin-top: 1.3em;
  font-size: 14px;
`;
const SearchListTitle = styled.h2`
  color: grey;
  font-size: 12px;
`;

export default Search;
