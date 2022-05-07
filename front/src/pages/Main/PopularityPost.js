import { useGetPostList } from "../../queries/postQuery";
import Loading from "../../components/Loading";
import PostCard from "../Post/PostCard";
import { useQueryClient } from "react-query";
import { PopularityPostContainer } from "../../styles/Main/MainStyle";
import { LABEL, URI } from "../../utils/constants";
import { Link } from "react-router-dom";

function PopularityPost() {
  const queryClient = useQueryClient();
  const { userState, isLogin } = queryClient.getQueryData("userState");

  const { data, isLoading } = useGetPostList(`posts?${URI.SORT_LIKE}`);

  if (isLoading) return <Loading />;

  return (
    <>
      <Link to={`/posts?${URI.SORT_LIKE}`}>{LABEL.GET_MORE}</Link> &nbsp;
      <PopularityPostContainer>
        {data.pages[0].posts.map((post) => (
          <PostCard
            key={post._id}
            userInfo={userState}
            isDisabled={isLogin}
            post={post}
          />
        ))}
      </PopularityPostContainer>
    </>
  );
}

export default PopularityPost;
