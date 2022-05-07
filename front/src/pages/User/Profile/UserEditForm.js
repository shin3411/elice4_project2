import { useState } from "react";
import {
  EditContainer,
  EditBox,
  EditIntroduceBox,
  EditInput,
  EditIntroduceInput,
  ConfirmButton,
  ConfirmButtonBox,
  EditInputBox,
} from "styles/User/ProfileStyle";
import {
  LABEL,
  GUIDE_MESSAGE,
  FAIL_MESSAGE,
  ALERT_TYPE,
} from "utils/constants";
import { validation } from "utils/validation";
import { useChangeProfileHandler } from "queries/userQuery";
import { CustomSnackbar, setAlertData } from "components/CustomSnackbar";
import { useQueryClient } from "react-query";
import { uploadFile } from "utils/api";

/**
 * 프로필 수정 컴포넌트입니다.
 * @param {object} editProfileImgStore 프로필이미지 state
 * @param {object} editStateStore 편집 상태와 편집상태를 수정하는 state
 * @returns {JSX.Element}
 * @constructor
 */
function UserEditForm({ editProfileImgStore, editStateStore }) {
  const queryClient = useQueryClient();
  const { userState } = queryClient.getQueryData("userState");
  const { setIsEdit } = editStateStore;
  const { editProfileImg } = editProfileImgStore;
  const [showAlert, setShowAlert] = useState(false);
  const mutation = useChangeProfileHandler(userState._id, setShowAlert);
  const [editInfo, setEditInfo] = useState({
    nickname: userState.nickname,
    password: "",
    confirmPassword: "",
    introduce: userState.introduce,
  });

  // Alert
  const changeFailUserProfile = setAlertData(
    showAlert,
    setShowAlert,
    FAIL_MESSAGE.CHANGE_PROFILE,
    ALERT_TYPE.ERROR
  );

  // 유효성 검사
  const isKakaoUser = userState.kakaoId !== 0;
  const { nickname, password, confirmPassword, introduce } = editInfo;
  const { isCheckNickName, isPassRule, isSamePassword } = validation(
    "editUser",
    editInfo
  );
  const userInputGuide = {
    nickname: !isCheckNickName && nickname.length > 0,
    password: !isPassRule && password.length > 0,
    confirmPassword: !isSamePassword && confirmPassword.length > 0,
  };
  const isActive = isKakaoUser
    ? isCheckNickName
    : isCheckNickName && isPassRule && isSamePassword;

  // 유저 입력 onChange 및 onSUbmit
  const handleOnSubmit = (e) => {
    e.preventDefault();
    const profileData = { nickname, password, introduce };

    Promise.all([
      mutation.mutate(profileData),
      uploadFile(`users/${userState._id}/uploadImage`, editProfileImg),
    ])
      .then(() => {
        queryClient.invalidateQueries("userState");
        queryClient.invalidateQueries(["user", userState._id]);
      })
      .catch(() => setShowAlert(true));
  };

  const handleOnChange = (e) => {
    setEditInfo((cur) => ({ ...cur, [e.target.name]: e.target.value }));
  };

  return (
    <EditContainer>
      <EditBox>
        <EditInputBox types={userInputGuide.nickname}>
          <EditInput
            name="nickname"
            type="text"
            placeholder="Nickname*"
            value={editInfo.nickname}
            onChange={handleOnChange}
          />
          {userInputGuide.nickname && <p>{GUIDE_MESSAGE.NICKNAME}</p>}
        </EditInputBox>
        <EditInputBox types={userInputGuide.password}>
          <EditInput
            name="password"
            type="password"
            placeholder="Password*"
            disabled={isKakaoUser}
            onChange={handleOnChange}
          />
          {userInputGuide.password && <p>{GUIDE_MESSAGE.PASSWORD}</p>}
        </EditInputBox>
        <EditInputBox
          types={userInputGuide.confirmPassword}
          kakao={isKakaoUser}
        >
          <EditInput
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password*"
            disabled={isKakaoUser}
            onChange={handleOnChange}
          />
          {userInputGuide.confirmPassword && (
            <p>{GUIDE_MESSAGE.CONFIRM_PASSWORD}</p>
          )}
          {isKakaoUser && <p>{GUIDE_MESSAGE.KAKAO_CHANGE_INFO}</p>}
        </EditInputBox>
        <ConfirmButtonBox
          types={userInputGuide.confirmPassword}
          kakao={isKakaoUser}
        >
          <ConfirmButton
            type="submit"
            onClick={handleOnSubmit}
            disabled={!isActive}
          >
            {LABEL.CONFIRM}
          </ConfirmButton>
          <ConfirmButton onClick={() => setIsEdit((cur) => !cur)}>
            {LABEL.CANCLE}
          </ConfirmButton>
        </ConfirmButtonBox>
      </EditBox>
      <EditIntroduceBox>
        <EditIntroduceInput
          name="introduce"
          placeholder="Introduce"
          value={editInfo.introduce}
          onChange={handleOnChange}
        />
      </EditIntroduceBox>
      <CustomSnackbar {...changeFailUserProfile} />
    </EditContainer>
  );
}

export default UserEditForm;
