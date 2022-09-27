import React from 'react';
import { highlightIncludedText } from '../utils/func';
const SearchItem = ({ result, searchText }) => {
  return <div>{highlightIncludedText(result.sickNm, searchText)}</div>;
};

export default SearchItem;
