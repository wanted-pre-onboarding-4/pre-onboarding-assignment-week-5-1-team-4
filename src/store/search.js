import React, { createContext, useState } from 'react';

export const SearchContext = createContext({
  searches: {},
  setSearches: () => {},
});

const SearchProvider = ({ children }) => {
  const [searches, setSearches] = useState({});
  const value = { searches, setSearches };

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
};

export default SearchProvider;
