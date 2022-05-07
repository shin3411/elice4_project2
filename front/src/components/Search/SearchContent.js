import SearchBar from "components/Search/SearchBar";
import SearchCategory from "components/Search/SearchCategory";
import {
  SearchButton,
  SearchContainerBox,
} from "styles/Components/SearchStyle";
import { CATEGORY, LABEL } from "utils/constants";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * 검색 컴포넌트 입니다.
 * @returns {JSX.Element}
 * @constructor
 */
function SearchContent() {
  const navigate = useNavigate();
  const [category, setCategory] = useState(CATEGORY.ALL);
  const [searchTarget, setSearchTarget] = useState("");
  const [isHaveSearchContent, setIsHaveSearchContent] = useState(false);

  const createEndpointURI = () => {
    const contentParam = `content=${searchTarget}`;
    if (category === CATEGORY.ALL) return `${contentParam}`;
    return `category=${category}&${contentParam}`;
  };

  const handleSearchOnSubmit = (e) => {
    e.preventDefault();
    const endpoint = createEndpointURI();
    navigate(`/posts?${endpoint}`);
    setIsHaveSearchContent(false);
  };

  const searchBarStore = {
    searchTarget,
    setSearchTarget,
    isHaveSearchContent,
    setIsHaveSearchContent,
  };

  return (
    <SearchContainerBox onSubmit={handleSearchOnSubmit}>
      <SearchCategory setCategory={setCategory} />
      <SearchBar {...searchBarStore} />
      <SearchButton type="submit">{LABEL.SEARCH}</SearchButton>
    </SearchContainerBox>
  );
}

export default SearchContent;
