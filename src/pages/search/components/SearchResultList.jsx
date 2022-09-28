import React from 'react';
import { BiSearchAlt2 } from 'react-icons/bi';
import styled from 'styled-components';
import { highlightIncludedText } from '../../../utils/func';

const SearchResultList = React.forwardRef(({ index, searchList, searchWord }, ref) => {
  return (
    <SearchListWrap>
      <List>
        {searchList.length === 0 ? (
          <ul ref={ref}>
            <li>
              <ListItem>
                <BiSearchAlt2 fill="#a7afb7" />
                <Item>검색어 없음</Item>
              </ListItem>
            </li>
          </ul>
        ) : (
          <ul ref={ref}>
            {searchList?.map((item, idx) => (
              <li key={item.sickCd}>
                <ListItem>
                  <BiSearchAlt2 fill="#a7afb7" />
                  <Item isFocus={index === idx}>
                    {highlightIncludedText(item.sickNm, searchWord)}
                  </Item>
                </ListItem>
              </li>
            ))}
          </ul>
        )}
      </List>
    </SearchListWrap>
  );
});

const SearchListWrap = styled.div`
  width: 100%;
  position: absolute;
  top: 70px;
  left: 0;
  right: 0;
  border-radius: 15px;
  border-color: #ffffff;
  background-color: #ffffff;
  box-shadow: 0 1px 6px 0 rgba(147, 150, 160, 0.28);
  overflow-y: auto;
  max-height: 300px;
`;

const List = styled.div`
  ul {
    list-style: none;
    padding: 15px 0;
    overflow: hidden;
  }
  li {
    padding: 10px 20px;
    :hover {
      background-color: #f8f9fa;
      cursor: pointer;
    }
  }
`;

const ListItem = styled.div`
  display: flex;
  align-items: center;
  & svg {
    width: 21px;
    height: 21px;
    fill: #a7afb7;
  }
`;

const Item = styled.div`
  margin-left: 8px;
  background-color: ${props => (props.isFocus ? '#caeaff' : '#fff')};
`;

export default SearchResultList;