import React from 'react';
import styled from 'styled-components';
import SearchItem from './SearchItem';

const SearchList = React.forwardRef(({ results, index, searchText }, ref) => {
  return (
    <Container>
      {results.map((result, idx) => (
        <SearchItem
          ref={ref}
          isFocus={index === idx ? true : false}
          key={result.sickCd}
          result={result}
          searchText={searchText}
        />
      ))}
    </Container>
  );
});

const Container = styled.div`
  margin-top: 14px;
  overflow-y: auto;
  max-height: 280px;
`;
export default SearchList;
