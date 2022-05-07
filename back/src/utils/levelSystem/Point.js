import { User } from "../../db";
import { RequiredExp, AccRequiredExp } from "./RequiredExp";

const addPoint = async ({ subject, user }) => {
  try{
    // 작성한 user의 포인트 적립 (기존 포인트 + 작성한 글 포인트)
    // points는 유저의 누적 EXP 라고 볼 수 있다.
    let points = user.point + subject.point;

    // 포인트를 준 후 유저의 레벨
    let level = 0;
    while (points >= AccRequiredExp[level]) {
      level++;
    }

    if(level === 5){
      level = 4;
    }

    await User.update({
      userId: user._id,
      toUpdate: {
        point: points,
        level,
      },
    });

    return { message: "success" };
  } catch(error) {
    return { errorMessage: error };
  }
};


const getPoint = ({ user }) => {

  if (!user) { return null; }
  // 현재 유저 포인트(= 누적 EXP)
  const points = user.point;
  
  // 현재 유저 레벨
  let level = 0;
  while (points >= AccRequiredExp[level]) {
    level++;
  }

  if(level < 5){
    user.level = level;
    user.curExp = points - AccRequiredExp[level-1];
    user.maxExp = RequiredExp[level];
  } else {
    user.level = 4;
    user.curExp = RequiredExp[4];
    user.maxExp = RequiredExp[4];
  }
  

  return user;
}



export { addPoint, getPoint };