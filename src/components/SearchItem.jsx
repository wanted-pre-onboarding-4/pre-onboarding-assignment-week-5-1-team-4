import React from 'react';
import styled from 'styled-components';
import { highlightIncludedText } from '../utils/func';
const SearchItem = React.forwardRef(({ result, searchText, isFocus }, ref) => {
  return isFocus ? (
    <Item ref={ref} isFocus={isFocus}>
      {highlightIncludedText(result.sickNm, searchText)}
    </Item>
  ) : (
    <Item isFocus={isFocus}>{highlightIncludedText(result.sickNm, searchText)}</Item>
  );
});

export default SearchItem;

const Item = styled.div`
  background-color: ${({ isFocus }) => (isFocus ? 'skyblue' : 'white')};
`;
