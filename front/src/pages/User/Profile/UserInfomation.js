import { useParams, Link } from "react-router-dom";
import { useQueryClient } from "react-query";
import {
  CardContent,
  CardIntroduce,
  CardLikeCountBox,
  CardLikePost,
  CardMyInfo,
  ProfileHeading,
  ProfileIntroduce,
  ProfileNickName,
  ProfilePostCount,
  ProfileTitleBox,
} from "styles/User/ProfileStyle";
import { LABEL } from "utils/constants";
import { img } from "utils/imgImport";

/**
 * 프로필 정보 컴포넌트입니다.
 * @returns {JSX.Element}
 * @constructor
 */
function UserInfomation() {
  const params = useParams();
  const userId = params.userId;
  const queryClient = useQueryClient();

  const userProfile = queryClient.getQueryData(["user", userId]);
  const { nickname, level, introduce, posts, postLikes, curExp, maxExp } =
    userProfile;

  return (
    <CardContent>
      <CardIntroduce>
        <ProfileTitleBox>
          <img src={img.level[level]} alt="level" /> &nbsp;
          <ProfileNickName>{nickname}</ProfileNickName>
        </ProfileTitleBox>
        &nbsp;
        <ProfileIntroduce>{introduce}</ProfileIntroduce>
      </CardIntroduce>
      <CardMyInfo>
        <CardLikePost>
          <ProfileHeading>{LABEL.USER_EXP}</ProfileHeading>
          <CardLikeCountBox>
            <ProfilePostCount>
              {curExp} / {maxExp}
              <progress value={curExp} max={maxExp} />
            </ProfilePostCount>
          </CardLikeCountBox>
        </CardLikePost>
        <CardLikePost>
          <ProfileHeading>{LABEL.USER_POST}</ProfileHeading>
          <CardLikeCountBox>
            <Link to={window.location.pathname}>
              <ProfilePostCount>{posts}</ProfilePostCount>
            </Link>
          </CardLikeCountBox>
        </CardLikePost>
        <CardLikePost>
          <ProfileHeading>{LABEL.USER_LIKE_POST}</ProfileHeading>
          <CardLikeCountBox>
            <Link to={window.location.pathname + "?likes"}>
              <ProfilePostCount>{postLikes.length}</ProfilePostCount>
            </Link>
          </CardLikeCountBox>
        </CardLikePost>
      </CardMyInfo>
    </CardContent>
  );
}

export default UserInfomation;
