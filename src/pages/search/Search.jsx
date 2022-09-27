import { useState, useEffect } from 'react';
import axios from 'axios';
import { BiSearchAlt2 } from 'react-icons/bi';
import styled from 'styled-components';
import { debounce } from 'lodash';

export default function Search() {
  const [isListVisible, setIsListVisible] = useState(false);
  //   const [searchMode, setSearchMode] = useState(false);

  useEffect(() => {
    const search = document.querySelector('input[type="search"]');
    search.addEventListener('focusin', _ => setIsListVisible(true));
    search.addEventListener('focusout', _ => {
      setIsListVisible(false);
      setSearchList([]);
    });
  }, []);
  const [searchList, setSearchList] = useState([]);

  const getSearchList = async str => {
    const res = await axios.get(`http://localhost:4000/sick?q=${str}`);
    console.info('calling api');
    console.log(res.data);
    if (res.data.length > 10) return setSearchList(res.data.slice(0, 10));
    setSearchList(res.data);
    //  setSearchMode(true);
  };

  const onChangeKeyword = event => {
    debounceOnChangeKeyword(event.target.value);
  };

  const debounceOnChangeKeyword = debounce(async str => {
    if (str.length === 0) return;
    //   setSearchMode(false);
    getSearchList(str);
  }, 1000);

  return (
    <Wrap>
      <InnerWrap>
        <TitleWrap>
          국내 모든 임상시험 검색하고
          <br />
          온라인으로 참여하기
        </TitleWrap>
        <SearchWrap>
          <Border>
            <InputWrap>
              <Input
                type="search"
                placeholder="🔍 질환명을 입력해 주세요."
                onChange={onChangeKeyword}
              />
            </InputWrap>
            <Button>
              <BiSearchAlt2 fill="#ffffff" />
            </Button>
          </Border>
          {isListVisible && (
            <SearchListWrap>
              <List>
                {searchList.length === 0 ? (
                  <ul>
                    <li>
                      <ListItem>
                        <BiSearchAlt2 fill="#a7afb7" />
                        <Item>검색어 없음</Item>
                      </ListItem>
                    </li>
                  </ul>
                ) : (
                  <ul>
                    {searchList?.map(item => (
                      <li key={item.sickCd}>
                        <ListItem>
                          <BiSearchAlt2 fill="#a7afb7" />
                          <Item>{item.sickNm}</Item>
                        </ListItem>
                      </li>
                    ))}
                  </ul>
                )}
              </List>
            </SearchListWrap>
          )}
        </SearchWrap>
      </InnerWrap>
    </Wrap>
  );
}

const Wrap = styled.div`
  width: 100%;
  margin: 0 auto;
  height: 100vh;
  display: flex;
  justify-content: center;
  background-color: #caeaff;
`;

const InnerWrap = styled.div`
  width: 100%;
  max-width: 1040px;
  padding-top: 160px;
  display: flex;
  flex-direction: column;
`;

const TitleWrap = styled.h2`
  text-align: center;
  font-size: 2.125rem;
  font-weight: 600;
  line-height: 1.6;
  margin-bottom: 40px;
`;

const SearchWrap = styled.div`
  max-width: 490px;
  width: 100%;
  margin: 0 auto;
  position: relative;
`;

const Border = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  width: 100%;
  padding-right: 8px;
  border-radius: 40px;
  border: 2px solid white;
  background-color: white;
  :focus-within {
    border: 2px solid blue;
  }
`;

const InputWrap = styled.div`
  flex: 1;
  padding: 20px 10px 20px 24px;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
  border-radius: 100%;
  border: none;
  cursor: pointer;
  background-color: #007be9;
  & svg {
    width: 24px;
    height: 24px;
  }
`;

const Input = styled.input`
  border: none;
  width: 100%;
  font-size: 1rem;
  line-height: 1.15;
  :focus {
    outline: none;
  }
  ::placeholder {
    color: #a7afb7;
  }
  ::-webkit-search-decoration,
  ::-webkit-search-cancel-button,
  ::-webkit-search-results-button,
  ::-webkit-search-results-decoration {
    -webkit-appearance: none;
    width: 20px;
    height: 20px;
    background: url('searchClear.svg') no-repeat center;
    cursor: pointer;
  }
`;

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
`;
