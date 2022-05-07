import React from "react";
import { CustomSnackbar, setAlertData } from "components/CustomSnackbar";
import { useState } from "react";
import { FAIL_MESSAGE, ALERT_TYPE, LABEL } from "utils/constants";
import { validation } from "utils/validation";
import { useUserLoginHandler } from "queries/userQuery";
import { useNavigate } from "react-router-dom";
import {
  HeadingTwo,
  InputBox,
  Button,
  LinkButton,
  FlexBoxCenter,
} from "styles/Components/CommonStyle";
import {
  AuthContainer,
  CharacterImage,
  LogoButton,
  LogoImage,
  LoginForm,
  KakaoIcon,
  LoginImgContentBox,
  LoginContentForm,
} from "styles/User/AuthStyle";

/**
 * 유저의 로그인을 담당하는 컴포넌트 입니다.
 * @returns {JSX.Element}
 * @constructor
 */
function Login() {
  const navigate = useNavigate();
  const kakaoAuthUrl = process.env.REACT_APP_KAKAO_AUTH_URL;
  const initialInfo = {
    email: "",
    password: "",
  };
  const [loginInfo, setLoginInfo] = useState(initialInfo);
  const [showAlert, setShowAlert] = useState(false);
  const mutation = useUserLoginHandler(setShowAlert);

  const loginFailData = setAlertData(
    showAlert,
    setShowAlert,
    FAIL_MESSAGE.LOGIN,
    ALERT_TYPE.ERROR
  );

  const isActive = validation("login", loginInfo);

  const handleOnChange = (e) => {
    setLoginInfo((cur) => ({ ...cur, [e.target.name]: e.target.value }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    mutation.mutate(loginInfo);
  };

  return (
    <AuthContainer>
      <LogoButton onClick={() => navigate("/")}>
        <LogoImage />
      </LogoButton>
      <LoginForm>
        <LoginContentForm onSubmit={handleOnSubmit}>
          <HeadingTwo>{LABEL.LOGIN}</HeadingTwo>
          <InputBox
            type="email"
            placeholder="Email*"
            name="email"
            onChange={handleOnChange}
            required
          />
          <InputBox
            type="password"
            placeholder="Password*"
            name="password"
            onChange={handleOnChange}
            required
          />
          <Button type="submit" disabled={!isActive}>
            {LABEL.LOGIN}
          </Button>
          <Button
            type="button"
            onClick={() => (window.location.href = kakaoAuthUrl)}
          >
            <FlexBoxCenter>
              <KakaoIcon /> &nbsp; {LABEL.KAKAO_LOGIN}
            </FlexBoxCenter>
          </Button>
          <div>
            <LinkButton
              type="button"
              onClick={() => navigate("/user/register")}
            >
              {LABEL.NOT_MEMBER}
            </LinkButton>
          </div>
        </LoginContentForm>
        <LoginImgContentBox>
          <CharacterImage />
        </LoginImgContentBox>
      </LoginForm>
      <CustomSnackbar {...loginFailData} />
    </AuthContainer>
  );
}

export default Login;
