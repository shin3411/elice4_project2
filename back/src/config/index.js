// env 변수 설정 파일(dotenv의 남용 방지)
import dotenv from "dotenv";
dotenv.config();

const config = {
  mode: process.env.NODE_ENV || "development",
  port: process.env.SERVER_PORT,
  mongodbUrl: process.env.MONGODB_URL,
  jwtKey: process.env.JWT_SECRET_KEY,
  kakao: {
    oauthUrl: process.env.KAKAO_OAUTH_TOKEN_API_URL,
    clientId: process.env.KAKAO_CLIENT_ID,
    redirectUrl: process.env.KAKAO_REDIRECT_URL,
    userUrl: process.env.KAKAO_OAUTH_USER_API_URL,
    unlinkUrl: process.env.KAKAO_UNLINK,
    adminKey: process.env.KAKAO_ADMIN_KEY,
  },
  ncp: {
    accessKey: process.env.NCP_ACCESS_KEY,
    secretKey: process.env.NCP_SECRET_KEY,
  }
};

export default config;
