import { useEffect, useState } from "react";
import {
  ErrorContainer,
  ErrorBox,
  ErrorHeader,
  ErrorCode,
  ErrorMessage,
} from "styles/Components/ComponentStyle";
import { useNavigate } from "react-router-dom";
import { LABEL, GUIDE_MESSAGE } from "utils/constants";

function ErrorPage() {
  const navigate = useNavigate();
  const [showTimeCount, setShowTimeCount] = useState(3);

  useEffect(() => {
    const countDown = setInterval(() => {
      setShowTimeCount((cur) => cur - 1);
    }, 1000);
    return () => clearInterval(countDown);
  }, []);

  useEffect(() => {
    if (showTimeCount < 0) navigate("/");
  }, [showTimeCount, navigate]);

  return (
    <ErrorContainer>
      <ErrorBox>
        <ErrorHeader>
          <ErrorCode>4</ErrorCode>
          <ErrorCode>0</ErrorCode>
          <ErrorCode>4</ErrorCode>
        </ErrorHeader>
        <ErrorMessage>{LABEL.ERROR_INTRODUCE}</ErrorMessage>
        <ErrorMessage>{showTimeCount + GUIDE_MESSAGE.ERROR}</ErrorMessage>
      </ErrorBox>
    </ErrorContainer>
  );
}
export default ErrorPage;
