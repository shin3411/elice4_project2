import {
  DropDownBox,
  DropDownItem,
  InputBox,
  SearchInput,
} from "styles/Components/SearchStyle";
import { GUIDE_MESSAGE } from "utils/constants";
import { useCallback, useState } from "react";
import { get } from "utils/api";

/**
 * 검색어 입력 컴포넌트입니다.
 * @param {string} searchTarget
 * @param {function} setSearchTarget
 * @param {boolean} isHaveSearchContent
 * @param {function} setIsHaveSearchContent
 * @returns {JSX.Element}
 * @constructor
 */
function SearchBar({
  searchTarget,
  setSearchTarget,
  isHaveSearchContent,
  setIsHaveSearchContent,
}) {
  const [dropDownList, setDropDownList] = useState([]);
  const [dropDownItemIndex, setDropDownItemIndex] = useState(0);
  const [isError, setIsError] = useState(false);
  const [timer, setTimer] = useState(null);

  // 입력한 단어가 글 제목에 포함되어 있는지 체크
  const includeSearchTarget = useCallback((searchList, searchTarget) => {
    const filterData = searchList.reduce((cur, post) => {
      const { title } = post;
      if (title.includes(searchTarget)) return [...cur, title];
      return [...cur];
    }, []);

    return checkOverlapData(filterData);
  }, []);

  // 중복 제거 및 길이 제한
  const checkOverlapData = (data) => {
    const deduplicationData = new Set(data);
    return deduplicationData.length > 10
      ? deduplicationData.slice(0, 10)
      : deduplicationData;
  };

  // 검색어의 길이 체크
  const checkShowSearchContent = (keyword) =>
    setIsHaveSearchContent(!!keyword.length);

  // 사용자 키워드 입력 검색 디바운스
  const handleInputOnChange = (e) => {
    setSearchTarget(e.target.value);
    const searchKeyword = e.target.value;
    if (timer) clearTimeout(timer);

    const debounce = setTimeout(async () => {
      try {
        const res = await get(`posts?content=${searchKeyword}`);
        const filteredSearchData = [
          ...includeSearchTarget(res.data.posts, searchKeyword),
        ];

        setDropDownList(filteredSearchData);
        checkShowSearchContent(searchKeyword);
      } catch (err) {
        setIsError(true);
      }
    }, 250);
    setTimer(debounce);
  };

  // 자동완성 단어를 클릭 했을 때
  const handleOnClickDropDownItem = (clickedItem) => {
    setSearchTarget(clickedItem);
    setIsHaveSearchContent(false);
  };

  // 사용자의 키 입력으로 자동완성 목록 이동
  const handleDropDownOnKey = (e) => {
    if (!isHaveSearchContent) return null;
    if (e.key === "ArrowDown" && dropDownList.length - 1 > dropDownItemIndex) {
      setSearchTarget(dropDownList[dropDownItemIndex + 1]);
      setDropDownItemIndex(dropDownItemIndex + 1);
    }

    if (e.key === "ArrowUp" && dropDownItemIndex > 0) {
      setSearchTarget(dropDownList[dropDownItemIndex - 1]);
      setDropDownItemIndex(dropDownItemIndex - 1);
    }

    if (e.key === "Enter") setIsHaveSearchContent(false);
  };

  // 자동완성 목록 가공
  const dropDownItem =
    isError || dropDownList.length === 0 ? (
      <DropDownItem>{GUIDE_MESSAGE.NOT_FOUND_AUTO_COMPLETE}</DropDownItem>
    ) : (
      dropDownList.map((item, index) => {
        return (
          <DropDownItem
            key={index}
            className={dropDownItemIndex === index ? "selected" : ""}
            onClick={() => handleOnClickDropDownItem(item)}
            onMouseOver={() => setDropDownItemIndex(index)}
          >
            {item}
          </DropDownItem>
        );
      })
    );

  return (
    <InputBox>
      <SearchInput
        type="text"
        value={searchTarget}
        placeholder={GUIDE_MESSAGE.SEARCH}
        onChange={handleInputOnChange}
        onKeyUp={handleDropDownOnKey}
      />
      {isHaveSearchContent && <DropDownBox>{dropDownItem}</DropDownBox>}
    </InputBox>
  );
}

export default SearchBar;
