import styled from "styled-components";
import { img } from "utils/imgImport";
import { FlexBoxCenter, InputBox } from "styles/Components/CommonStyle";

// 회원가입 ============================================================
export const AuthContainer = styled(FlexBoxCenter)`
  max-width: 1000px;
  margin: 30px auto;
  flex-direction: column;
`;

export const AuthContentForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const AuthInputBox = styled(FlexBoxCenter)`
  width: 100%;
  flex-direction: column;
  margin-bottom: ${(props) => (props.types ? 0 : "16px")};
`;

export const AuthInputTopBox = styled(AuthInputBox)`
  margin-top: 1.7rem;
`;

export const AuthInput = styled(InputBox)`
  margin-top: 0;
`;

export const LogoButton = styled.button`
  appearance: none;
  background-color: transparent;
  border: none;
  border-radius: 8px;
  box-shadow: none;
  transition-duration: 0.3s;

  &:active {
    box-shadow: 3px 3px 3px 3px gray;
  }
`;

export const LogoImage = styled.img.attrs({
  src: img.logoLogin,
  alt: "logo",
})`
  width: 355px;
  height: 204px;
`;

export const CharacterImage = styled.img.attrs({
  src: img.woman,
  alt: "charactor",
})`
  width: 100%;
  height: 100%;
`;

// 로그인 ============================================================
export const LoginForm = styled(FlexBoxCenter)`
  max-width: 1000px;
`;

export const KakaoIcon = styled.img.attrs({
  src: img.kakaoIcon,
  alt: "kakaoIcon",
})`
  width: 25px;
  height: 25px;
`;

export const LoginImgContentBox = styled.div`
  width: 40%;
  height: 15%;
`;

export const LoginContentForm = styled.form`
  width: 60%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
