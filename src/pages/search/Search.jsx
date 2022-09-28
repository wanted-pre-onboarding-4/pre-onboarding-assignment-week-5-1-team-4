import { useState, useEffect } from 'react';
import axios from 'axios';
import { BiSearchAlt2 } from 'react-icons/bi';
import styled from 'styled-components';
import { debounce } from 'lodash';
import SearchResultList from './components/SearchResultList';

export default function Search() {
  const [isListVisible, setIsListVisible] = useState(false);
  const [searchWordBold, setSearchWordBold] = useState('');
  const [searchList, setSearchList] = useState([]);

  const getSearchList = async str => {
    const cachedData = JSON.parse(sessionStorage.getItem('searchCache' || '{}'));

    // 캐싱된 데이터인 경우 캐싱 데이터 사용
    if (cachedData !== null) {
      if (Object.keys(cachedData).includes(str)) return setSearchList(cachedData[str]);
    }

    const res = await axios.get(`http://localhost:4000/sick?q=${str}`);
    console.info('api calling');

    // SessionStorage에 response 결과 캐싱
    const newObj = { ...cachedData, [`${str}`]: res.data };
    sessionStorage.setItem('searchCache', JSON.stringify(newObj));

    if (res.data.length > 10) return setSearchList(res.data.slice(0, 10));
    setSearchList(res.data);
  };

  const onChangeKeyword = event => {
    const { value } = event.target;
    if (value) debounceOnChangeKeyword(value);
  };

  const debounceOnChangeKeyword = debounce(async value => {
    getSearchList(value);
    setSearchWordBold(value);
  }, 1000);

  useEffect(() => {
    const search = document.querySelector('input[type="search"]');
    search.addEventListener('focusin', _ => setIsListVisible(true));
    search.addEventListener('focusout', _ => {
      setIsListVisible(false);
      setSearchList([]);
    });
  }, []);

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
            <SearchResultList searchList={searchList} searchWordBold={searchWordBold} />
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
