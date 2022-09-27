import React from 'react';
import styled from 'styled-components';
import SearchItem from './SearchItem';
const SearchList = ({ results, searchText }) => {
  console.log(results);
  return (
    <Container>
      {results.map(result => (
        <SearchItem key={result.sickCd} result={result} searchText={searchText} />
      ))}
    </Container>
  );
};
const Container = styled.div`
  padding: 14px 0;
  overflow-y: auto;
  max-height: 300px;
`;
export default SearchList;
