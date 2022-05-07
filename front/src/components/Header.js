import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "react-query";
import { CustomSnackbar, setAlertData } from "components/CustomSnackbar";
import { SUCCESS_MESSAGE, ALERT_TYPE, LABEL } from "utils/constants";
import { img } from "utils/imgImport";
import {
  HeaderContainer,
  HeaderWrap,
  LogoImg,
  Navigation,
  NavList,
  LogOutBtn,
} from "styles/Components/HeaderStyle";

function Header() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { userState, isLogin } = queryClient.getQueryData("userState");
  const [value, setValue] = useState("one");
  const [showAlert, setShowAlert] = useState(false);

  const userId = isLogin ? userState._id : null;

  const logoutSuccessData = setAlertData(
    showAlert,
    setShowAlert,
    SUCCESS_MESSAGE.LOGOUT,
    ALERT_TYPE.SUCCESS
  );

  const LoginRegisterTab =
    window.location.pathname === "/user/login" ? (
      <NavList onClick={() => navigate("/user/register")}>
        {LABEL.REGISTER}
      </NavList>
    ) : (
      <NavList onClick={() => navigate("/user/login")}>{LABEL.LOGIN}</NavList>
    );

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleUserLogout = () => {
    localStorage.removeItem("userToken");
    queryClient.invalidateQueries("userState");
    setShowAlert(true);
    navigate("/");
  };

  return (
    <HeaderContainer>
      <HeaderWrap>
        <LogoImg
          onClick={() => {
            isLogin ? navigate("/main") : navigate("/");
          }}
          src={img.logoHeader}
          alt="logo"
        ></LogoImg>

        <Navigation onChange={handleChange}>
          <NavList
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
            }}
          >
            {LABEL.SERVICE_INTRODUCE}
          </NavList>
          <NavList
            onClick={(e) => {
              e.preventDefault();
              navigate("/test");
            }}
          >
            {LABEL.TEST}
          </NavList>
          <NavList
            onClick={(e) => {
              e.preventDefault();
              navigate("/posts");
            }}
          >
            {LABEL.POST}
          </NavList>
          {isLogin ? (
            <>
              <NavList onClick={() => navigate("/post")}>
                {LABEL.POSTING}
              </NavList>
              <NavList onClick={() => navigate(`/user/${userId}`)}>
                {LABEL.PROFILE}
              </NavList>
            </>
          ) : (
            LoginRegisterTab
          )}
        </Navigation>
      </HeaderWrap>
      <CustomSnackbar {...logoutSuccessData} />
      {isLogin && (
        <LogOutBtn onClick={handleUserLogout}>{LABEL.LOGOUT}</LogOutBtn>
      )}
    </HeaderContainer>
  );
}

export default Header;
