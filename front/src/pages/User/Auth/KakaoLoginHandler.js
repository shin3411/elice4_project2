import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "react-query";
import { get } from "utils/api";
import { FAIL_MESSAGE } from "utils/constants";

/**
 * 카카오 로그인 진행 시 redirectURL로 컴포넌트가 마운트됩니다.
 * @returns {null}
 * @constructor
 */
function KakaoLoginHandler() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const kakaoCode = new URL(document.location.toString()).searchParams.get(
    "code"
  );

  useEffect(() => {
    const getKakaoToken = async () => {
      try {
        const res = await get("oauth/kakao?code=" + kakaoCode);
        const jwtToken = res.data.token;
        localStorage.setItem("userToken", jwtToken);

        queryClient.invalidateQueries("userState");
        navigate("/main");
      } catch (err) {
        alert(FAIL_MESSAGE.LOGIN);
        navigate("/user/login");
      }
    };

    getKakaoToken();
  }, [kakaoCode, navigate, queryClient]);

  return null;
}

export default KakaoLoginHandler;
