import {
  RankImg,
  RankingBox,
  RankingContainer,
  RankNickName,
  RankPoint,
} from "../../styles/Main/MainStyle";
import { img } from "../../utils/imgImport";
import { useGetUserRank } from "../../queries/userQuery";
import Loading from "../../components/Loading";
import { LABEL } from "../../utils/constants";
import { Link } from "react-router-dom";

function Ranking() {
  const { data, isFetching } = useGetUserRank();

  if (isFetching) return <Loading />;

  return (
    <RankingContainer>
      {data.posts.map((user, index) => (
        <RankingBox key={user._id}>
          <RankImg src={img.rank[index]} alt="rankImage" />
          <RankImg src={img.level[user.level]} />
          <Link to={`/user/${user._id}`}>
            <RankNickName>{user.nickname}</RankNickName>
          </Link>
          <RankPoint>
            {user.point} {LABEL.DOT}
          </RankPoint>
        </RankingBox>
      ))}
    </RankingContainer>
  );
}

export default Ranking;
