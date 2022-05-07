import styled from "styled-components";
import {
  Button,
  FlexBox,
  FlexBoxCenter,
  HeadingTwo,
  InputBox,
} from "styles/Components/CommonStyle";

export const MyPageContainer = styled(FlexBox)`
  flex-direction: column;
  max-width: 1000px;
  margin: 30px auto;
`;

export const MyPostContainer = styled(FlexBox)`
  margin: 25px 0;
`;

export const CardContainer = styled(FlexBoxCenter)`
  flex-direction: column;
  height: 250px;
  padding-bottom: 15px;
  border-bottom: solid 1px rgba(0, 0, 0, 0.2);
`;

export const CardBox = styled(FlexBox)`
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const CardHeader = styled(FlexBoxCenter)`
  flex-direction: column;
  width: 30%;
  height: 100%;
`;

export const CardContent = styled.div`
  width: 70%;
  height: 100%;
`;

export const CardIntroduce = styled.div`
  word-break: break-all;
  width: 100%;
  height: 60%;
`;

export const CardMyInfo = styled(FlexBox)`
  display: flex;
  word-break: break-all;
  width: 100%;
  height: calc(40% - 20px);
`;

export const CardLikePost = styled(FlexBox)`
  flex-direction: column;
  align-items: center;
  width: 50%;
  height: 100%;
`;

export const CardLikeCountBox = styled(FlexBoxCenter)`
  height: 80%;
`;

export const ProfilePostCount = styled(HeadingTwo)`
  font-size: 1.3rem;
  margin-top: 6px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const ProfileNickName = styled(HeadingTwo)`
  color: black;
  font-size: 1.8rem;
`;

export const ProfileIntroduce = styled.p`
  font-size: 1.3rem;
`;

export const ProfileHeading = styled(HeadingTwo)`
  font-size: 1.4rem;
`;

export const ProfileImgBox = styled(FlexBoxCenter)`
  width: 80%;
  height: 80%;
`;

export const ProfileImg = styled.img`
  width: 80%;
  height: 100%;
  border-radius: 75%;
  box-shadow: 5px 5px 10px grey;
`;

export const ProfileChangeBox = styled(FlexBoxCenter)`
  width: 100%;
  height: 20%;
`;

export const ChangeButton = styled(Button)`
  margin: 10px auto;
`;

export const EditContainer = styled(CardContent)`
  display: flex;
  height: 100%;
`;

export const EditBox = styled.div`
  width: 50%;
  height: 100%;
`;

export const EditIntroduceBox = styled.div`
  width: 50%;
`;

export const EditInputBox = styled.div`
  margin-bottom: ${(props) => (props.types || props.kakao ? 0 : "16px")};

  &:first-child {
    margin-top: 1.1rem;
  }
`;

export const EditInput = styled(InputBox)`
  width: 90%;
  height: 20px;
  margin: 0 auto;
`;

export const EditIntroduceInput = styled.textarea`
  width: 90%;
  height: 85%;
  padding: 10px;
  margin: 1.1rem 0 0 0;
  border: solid 2px #c99c6e;
  border-radius: 8px;
  font-size: 1.3rem;
`;

export const ConfirmButtonBox = styled(FlexBox)`
  justify-content: center;
  margin-top: ${(props) => (props.types || props.kakao ? "5px" : "21px")};
`;

export const ConfirmButton = styled(Button)`
  margin: 10px 7px;
  width: 20%;
`;

export const NotFoundPostImg = styled.img`
  width: 47%;
  margin: 0 auto;
`;

export const ProfileTitleBox = styled(FlexBox)`
  align-items: center;
  margin-top: 20px;
`;
