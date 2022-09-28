export const cacheToSession = (searchData, cachedData, str) => {
  let newObj = {};
  if (searchData.length > 10) {
    const slicedData = searchData.slice(0, 8);
    newObj = { ...cachedData, [`${str}`]: slicedData };
    sessionStorage.setItem('searchCache', JSON.stringify(newObj));
    return slicedData;
  }
  newObj = { ...cachedData, [`${str}`]: searchData };
  sessionStorage.setItem('searchCache', JSON.stringify(newObj));
  return searchData;
};
