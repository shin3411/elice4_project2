import cors from "cors";
import express from "express";

import { errorMiddleware } from "./middlewares/errorMiddleware";
import { morganMiddleware } from "./middlewares/morganMiddleware";
import { userAuthRouter } from "./routers/userRouter";
import { postRouter } from "./routers/postRouter";
import { commentRouter } from "./routers/commentRouter";
import { subjectRouter } from "./routers/subjectRouter";
import { testRouter } from "./routers/testRouter";
import { resultRouter } from "./routers/resultRouter";
import { likeRouter } from "./routers/likeRouter";
import { userWordRouter } from "./routers/userWordRouter";
import { quizRouter } from "./routers/quizRouter";
import { chartRouter } from "./routers/chartRouter";

import { logger } from "./config/winston";

import swaggerUi from 'swagger-ui-express'
import YAML from 'yamljs'

const app = express();

if (process.env.NODE_ENV === "production") global.logger = logger;

// CORS 에러 방지
app.use(cors());

// express 기본 제공 middleware
// express.json(): POST 등의 요청과 함께 오는 json형태의 데이터를 인식하고 핸들링할 수 있게 함.
// express.urlencoded: 주로 Form submit 에 의해 만들어지는 URL-Encoded 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const swaggerSpec = YAML.load(__dirname + "/../swagger/openapi.yaml")
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))


// logging middleware
app.use(morganMiddleware);

// 기본 페이지
app.get("/", (req, res) => {
  res.send("안녕하세요, 문해한 하루 API 입니다.");
});

// router, service 구현 (userAuthRouter는 맨 위에 있어야 함.)
app.use(userAuthRouter);
app.use(chartRouter);
app.use(postRouter);
app.use(commentRouter);
app.use(subjectRouter);
app.use(testRouter);
app.use(resultRouter);
app.use(likeRouter);
app.use(userWordRouter);
app.use(quizRouter);
// 순서 중요 (router 에서 next() 시 아래의 에러 핸들링  middleware로 전달됨)
app.use(errorMiddleware);

export { app };
