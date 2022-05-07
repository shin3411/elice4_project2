import { UserModel } from "../schemas/user";
import { findByPagination2 } from "../../utils/findByPagination";

class User {
  static async create({ newUser }) {
    const createdNewUser = await UserModel.create(newUser);
    return createdNewUser;
  }

  static async findById({ userId }) {
    const user = await UserModel.findOne({ _id: userId }, { __v: 0 })
      .lean()
      .populate("posts");
    return user;
  }

  static async findByKakaoId({ kakaoId }) {
    const user = await UserModel.findOne({ kakaoId }).lean();
    return user;
  }

  static async update({ userId, toUpdate }) {
    const filter = { _id: userId };
    const option = { returnOriginal: false };

    const updatedUser = await UserModel.findOneAndUpdate(
      filter,
      toUpdate,
      option
    ).lean();
    return updatedUser;
  }

  static async findByEmail({ email }) {
    const user = await UserModel.findOne(
      { email },
      { password: 0, __v: 0 }
    ).lean();
    return user;
  }
  
  static async findAll(page, limit, query, extraQueryList) {
    // pagination 필요
    const users = await findByPagination2(
      UserModel,
      { page: Number(page), limit: Number(limit) },
      query,
      extraQueryList
    );

    return users;
  }

  static async delete({ userId }) {
    const deletedUser = await UserModel.deleteOne({ _id: userId });
    return deletedUser;
  }
}

export { User };
