import {
  FilterButton,
  PostFilterContainer,
} from "../../styles/Posts/PostFilterStyle";
import { useNavigate } from "react-router-dom";
import { URI } from "../../utils/constants";

function PostFilter() {
  const navigate = useNavigate();

  return (
    <PostFilterContainer>
      <FilterButton onClick={() => navigate("/posts")}>최신순</FilterButton>
      <FilterButton onClick={() => navigate(`/posts?${URI.SORT_LIKE}`)}>
        인기순
      </FilterButton>
      <FilterButton onClick={() => navigate(`/posts?${URI.SORT_TITLE}`)}>
        제목순
      </FilterButton>
      <FilterButton onClick={() => navigate(`/posts?${URI.SORT_AUTHOR}`)}>
        작성자순
      </FilterButton>
    </PostFilterContainer>
  );
}

export default PostFilter;
