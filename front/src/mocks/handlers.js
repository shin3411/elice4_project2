import { rest } from "msw";

export const handlers = [
  rest.post("http://localhost:5001/user/register", (req, res, ctx) => {
    return res(ctx.json([{ result: "success" }]));
  }),

  rest.post("http://localhost:5001/user/login", (req, res, ctx) => {
    return res(
      ctx.json([
        {
          token: "userToken",
          _id: "6232e9c20cb9033a0d6d156a",
          email: "test@test.com",
          name: "로그인유저",
          badge: ["http://imagePath"],
          level: 0,
          points: 0,
          errorMessage: null,
        },
      ])
    );
  }),

  rest.get("http://localhost:5001/user/current", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        token: "userToken",
        _id: "6232e9c20cb9033a0d6d156a",
        email: "test@test.com",
        nickname: "테스트유저",
        badge: ["http://imagePath"],
        level: 0,
        points: 0,
        errorMessage: null,
      })
    );
  }),

  rest.get("http://localhost:5001/posts", (req, res, ctx) => {
    return res(
      ctx.json([
        {
          title: "작성글입니다.",
          content: "내용입니다.",
          tags: ["challenge"],
          author: "닉네임",
          userId: "6232e9c20cb9033a0d6d156a",
          subjectId: "6232e9c20cb9033a0d6d156a",
          subject: {
            subject: "자기소개",
          },
          category: "소설",
          _id: "6232e9c20cb9033a0d6d156a",
          createdAt: "2022-03-17T07:56:50.255Z",
          updatedAt: "2022-03-17T07:56:50.255Z",
          __v: 0,
        },
        {
          title: "작성글입니다2.",
          content: "내용입니다2.",
          author: "닉네임2",
          tags: ["challenge"],
          userId: "6232e9c20cb9033a0d6d156a2",
          subjectId: "6232e9c20cb9033a0d6d156a2",
          subject: {
            subject: "자기소개",
          },
          category: "시",
          _id: "6232e9c20cb9033a0d6d156a2",
          createdAt: "2022-03-17T07:56:50.255Z",
          updatedAt: "2022-03-17T07:56:50.255Z",
          __v: 0,
        },
      ])
    );
  }),
];
