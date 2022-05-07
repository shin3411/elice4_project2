import { User } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config";
import { commentService } from "./commentService";
import { postService } from "./postService";
import { resultService } from "./resultService";
import { userWordService } from "./userWordService";
import { likeService } from "./likeService";
import { typeName } from "../utils/validation/typeName";
import { getPoint } from "../utils/levelSystem/Point";

class userAuthService {
  // 유저 추가(회원 가입)
  static async addUser({ email, password, nickname }) {
    // 이메일 중복 확인
    const user = await User.findByEmail({ email });
    if (user) {
      const errorMessage =
        "이 이메일은 현재 사용중입니다. 다른 이메일을 입력해 주세요.";
      return { errorMessage };
    }

    // 비밀번호 해쉬화
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = { email, password: hashedPassword, nickname };

    // db에 저장
    const createdNewUser = await User.create({ newUser });
    createdNewUser.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

    try {
      delete createdNewUser._doc["password"];
    } finally {
      return createdNewUser;
    }
  }

  // 로그인
  static async getUser({ email, password }) {
    // 이메일 db에 존재 여부 확인
    let user = await User.findByEmail({ email });
    if (!user) {
      const errorMessage =
        "해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }
    user = await User.findById({ userId: user._id });
    // 비밀번호 일치 여부 확인
    const correctPasswordHash = user.password;
    const isPasswordCorrect = await bcrypt.compare(
      password,
      correctPasswordHash
    );
    if (!isPasswordCorrect) {
      const errorMessage =
        "비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    const secretKey = config.jwtKey || "jwt-secret-key";

    const token = jwt.sign({ userId: user._id }, secretKey);

    const loginUser = {
      ...user,
      token,
      errorMessage: null,
    };

    try {
      delete loginUser["password"];
    } finally {
      return loginUser;
    }
  }

  // 카카오 로그인
  static async getKakaoUser({ kakaoId }) {
    // 이메일 db에 존재 여부 확인
    let user = await User.findByKakaoId({ kakaoId });
    if (!user) {
      const errorMessage = "카카오 계정이 등록되지 않았습니다.";
      return { errorMessage };
    }

    const secretKey = config.jwtKey || "jwt-secret-key";
    const token = jwt.sign({ userId: user._id }, secretKey);

    const loginUser = {
      ...user,
      token,
      errorMessage: null,
    };

    try {
      delete loginUser["password"];
    } finally {
      return loginUser;
    }
  }

  // userId로 유저 조회
  static async getUserInfo({ userId }) {
    const user = await User.findById({ userId });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!user) {
      const errorMessage =
        "해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    try {
      delete user["password"];
    } finally {
      const userWithExp = getPoint({ user });
      return userWithExp;
    }
  }

  // kakaoId로 유저 조회
  static async getUserByKakaoId({ kakaoId }) {
    const user = await User.findByKakaoId({ kakaoId });

    try {
      delete user["password"];
    } finally {
      const userWithExp = getPoint({ user });
      return userWithExp;
    }
    
  }

  // 전체 유저 조회
  static async getUsers({ sort, page, limit }) {
    const query = {};
    const field = sort?.field ?? null;
    const type = sort?.type ?? null;
    let extraQueryList;

    const selectOption = new Object({ password: 0, __v: 0 });
    extraQueryList = [{ select: selectOption }];

    if (field !== null && type !== null) {
      const sortOption = new Object();
      sortOption[field] = type;
      extraQueryList.push({ sort: sortOption });
    }
    
    const users = await User.findAll(page, limit, query, extraQueryList);

    return users;
  }

  // 유저 정보 수정
  static async setUser({ userId, toUpdate }) {
    // 우선 해당 id 의 유저가 db에 존재하는지 여부 확인
    let user = await User.findById({ userId });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!user) {
      const errorMessage = "가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    // 수정해야하는 필드에 맞는 값을 업데이트
    const toUpdateField = Object.keys(toUpdate);
    toUpdateField.forEach((key) => {
      if (!toUpdate[key]) delete toUpdate[key];
    });

    // 변경 사항에 password 있을 시 암호화 해서 저장
    if (toUpdate.password) {
      toUpdate["password"] = await bcrypt.hash(toUpdate.password, 10);
    }
    
    user = await User.update({ userId, toUpdate });
    try {
      delete user["password"];
    } finally {
      const userWithExp = getPoint({ user });
      return userWithExp;
    }
  }

  // 유저 삭제 (회원 탈퇴)
  static async deleteUser({ userId }) {
    // 해당 유저 삭제
    try {
      const user = await User.findById({ userId });
      const deletedResults =
        await Promise.all([
          commentService.deleteCommentsByUserId({ userId }),
          postService.deletePostsByUserId({ userId }),
          resultService.deleteResultByUserId({ userId }),
          userWordService.deleteUserWordByUserId({ userId }),
          likeService.deleteLikeCountByPostIds({ postIds: user.postLikes }),
        ]);
      
      if(typeName(deletedResults) !== "Array"){
        throw new Error(deletedResults);
      }
    } catch (error) {
      return { errorMessage: error.errorMessage };
    }
    const deletedUser = await User.delete({ userId });
    return deletedUser;
  }

  // 카카오 유저 추가(회원가입) 
  static async addUserByKakaoId({ kakaoId }) {
    const user = await User.findByKakaoId({ kakaoId });
    if (user) {
      const errorMessage =
        "이미 등록되어 있습니다.";
      return { errorMessage };
    }
    // kakaoUser용 임시 email
    let tempUser = true;
    let randomString = null;
    let email = null;
    do { 
      randomString = Math.random().toString(10).slice(2, 10);
      email = `kakaouser${randomString}@test.com`;

      tempUser = await User.findByEmail({ email });
    }
    while (tempUser);
   
    // kakaoUser용 임시 password
    const password = Math.random().toString(36).slice(2,11);
    // kakaoUser용 임시 nickname
    const nickname = `문하생${randomString}`
    // 비밀번호 해쉬화
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = { email, password: hashedPassword, nickname, kakaoId };

    // db에 저장
    const createdNewUser = await User.create({ newUser });
    createdNewUser.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

    try {
      delete createdNewUser._doc["password"];
      delete createdNewUser._doc["kakaoId"];
    } finally {
      return createdNewUser;
    }
  }
}

export { userAuthService };
