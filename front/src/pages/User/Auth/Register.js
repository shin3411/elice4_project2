import React from "react";
import {
  AuthContainer,
  LogoButton,
  LogoImage,
  AuthInputBox,
  AuthInput,
  AuthInputTopBox,
  AuthContentForm,
} from "styles/User/AuthStyle";
import { img } from "utils/imgImport";
import { HeadingTwo, Button, LinkButton } from "styles/Components/CommonStyle";
import { CustomSnackbar, setAlertData } from "components/CustomSnackbar";
import { useState } from "react";
import { validation } from "utils/validation";
import {
  FAIL_MESSAGE,
  ALERT_TYPE,
  LABEL,
  GUIDE_MESSAGE,
} from "utils/constants";
import { post } from "utils/api";
import { useNavigate } from "react-router-dom";

/**
 * 유저의 회원가입을 담당하는 컴포넌트 입니다.
 * @returns {JSX.Element}
 * @constructor
 */
function Register() {
  const navigate = useNavigate();
  const initialInfo = {
    email: "",
    password: "",
    confirmPassword: "",
    nickname: "",
  };
  const [registerInfo, setRegisterInfo] = useState(initialInfo);
  const [showAlert, setShowAlert] = useState(false);

  // Alert
  const registerFailData = setAlertData(
    showAlert,
    setShowAlert,
    FAIL_MESSAGE.REGISTER,
    ALERT_TYPE.ERROR
  );

  // 유효성 검사
  const { email, password, confirmPassword, nickname } = registerInfo;
  const { isCheckEmail, isCheckNickName, isPassRule, isSamePassword } =
    validation("register", registerInfo);
  const userInputGuide = {
    email: !isCheckEmail && email.length > 0,
    password: !isPassRule && password.length > 0,
    confirmPassword: !isSamePassword && confirmPassword.length > 0,
    nickname: !isCheckNickName && nickname.length > 0,
  };
  const isActive =
    isCheckEmail && isPassRule && isSamePassword && isCheckNickName;

  // 유저 입력 onChange 및 onSUbmit
  const handleOnChange = (e) => {
    setRegisterInfo((cur) => ({ ...cur, [e.target.name]: e.target.value }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
      await post("users/register", { email, password, nickname });
      setRegisterInfo(initialInfo);
      navigate("/user/login");
    } catch (err) {
      setShowAlert(true);
    }
  };

  return (
    <AuthContainer>
      <LogoButton onClick={() => navigate("/")}>
        <LogoImage src={img.logoLogin} alt="logo" />
      </LogoButton>
      <HeadingTwo>{LABEL.REGISTER}</HeadingTwo>
      <AuthContentForm>
        <AuthInputTopBox types={userInputGuide.email}>
          <AuthInput
            type="email"
            placeholder="Email*"
            name="email"
            onChange={handleOnChange}
            required
          />
          {userInputGuide.email && <p>{GUIDE_MESSAGE.EMAIL}</p>}
        </AuthInputTopBox>
        <AuthInputBox types={userInputGuide.password}>
          <AuthInput
            type="password"
            placeholder="Password*"
            name="password"
            onChange={handleOnChange}
            required
          />
          {userInputGuide.password && <p>{GUIDE_MESSAGE.PASSWORD}</p>}
        </AuthInputBox>
        <AuthInputBox types={userInputGuide.confirmPassword}>
          <AuthInput
            type="password"
            placeholder="Confirm Password*"
            name="confirmPassword"
            onChange={handleOnChange}
            required
          />
          {userInputGuide.confirmPassword && (
            <p>{GUIDE_MESSAGE.CONFIRM_PASSWORD}</p>
          )}
        </AuthInputBox>
        <AuthInputBox types={userInputGuide.nickname}>
          <AuthInput
            type="text"
            placeholder="Nickname*"
            name="nickname"
            onChange={handleOnChange}
            required
          />
          {userInputGuide.nickname && <p>{GUIDE_MESSAGE.NICKNAME}</p>}
        </AuthInputBox>
        <Button type="submit" onClick={handleOnSubmit} disabled={!isActive}>
          {LABEL.REGISTER}
        </Button>
        <LinkButton type="button" onClick={() => navigate("/user/login")}>
          {LABEL.ALREADY_MEMBER}
        </LinkButton>
      </AuthContentForm>
      <CustomSnackbar {...registerFailData} />
    </AuthContainer>
  );
}

export default Register;
