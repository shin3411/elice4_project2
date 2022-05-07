import config from "./src/config";
import { app } from "./src/app";
import mongoose from "mongoose";
import mongooseLoader from "./src/load/mongoose";

if (config.mode === "production") {
  console = {}
  console.log = () => {};
  console.error = () => {};
}

const PORT = config.port || 5000;

const DB_URL =
  config.mongodbUrl ||
  "MongoDB 서버 주소가 설정되지 않았습니다.\n./db/index.js 파일을 확인해 주세요.";

mongoose.connect(DB_URL);
const db = mongoose.connection;

db.on("connected", async () => {
  const isError = await mongooseLoader();
  if (isError) {
    console.error(
      "\x1b[35m%s\x1b[0m",
      "MongoDB 데이터 부팅에 실패하였습니다..."
    );
  }

  console.log(
    "\x1b[32m%s\x1b[0m",
    "정상적으로 MongoDB 서버에 연결되었습니다.  " + DB_URL
  )
});

db.on("error", (error) =>
  console.error(
    "\x1b[35m%s\x1b[0m",
    "MongoDB 연결에 실패하였습니다...\n" + DB_URL + "\n" + error
  )
);

app.listen(PORT, () => {
  "\x1b[32m%s\x1b[0m",
    console.log(`정상적으로 서버를 시작하였습니다.  http://localhost:${PORT}`);
});
