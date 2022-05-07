import { Result } from "../db";

class resultService {
  static async addResult({ userId, result }) {
    
    if ( userId === undefined || result === undefined ) {
      const errorMessage = "userId필드와 result필드를 모두 채워주세요.";
      return { errorMessage };
    }

    const newResult = { userId, result };

    const userResult = await Result.findByUserId({ userId });

    if (!userResult) {
      const createdNewResult = await Result.create({ newResult });
      return createdNewResult;
    }

    const toUpdate = { result };
    const updatedUserResult = await Result.updateByUserId({ userId, toUpdate });
    
    return updatedUserResult;
  }

  static async getResultByUserId({ userId }) {
    const results = await Result.findByUserId({ userId });
    if (results.length === 0) {
      const errorMessage = "해당 유저의 결과가 존재하지 않습니다.";
      return { errorMessage };
    }

    return results;
  }

  static async deleteResultByUserId({ userId }) {
    const deleteResult = await Result.deleteByUserId({ userId });
    if (deleteResult.deletedCount == 0) {
      return { errorMessage: "정상적으로 삭제되지 않았습니다." };
    }
    return deleteResult;
  }

  static async getAllResults() {
    const results = Result.findAll();
    return results;
  }

  static async getResult({ resultId }) {
    const result = await Result.findById({ resultId });
    if (!result) {
      const errorMessage = "해당 결과가 존재하지 않습니다.";
      return { errorMessage };
    }

    return result;
  }

  static async deleteResult({ resultId }) {
    const deleteResult = Result.delete({ resultId });
    if (deleteResult.deletedCount !== 1) {
      return { errorMessage: "정상적으로 삭제되지 않았습니다."};
    }
    return deleteResult;
  }
}

export { resultService };
