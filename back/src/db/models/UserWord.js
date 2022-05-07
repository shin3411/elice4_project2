import { UserWordModel } from "../schemas/userWord";

class UserWord{
    static async create({ newUserWord }) {
        const createdNewUserWord = await UserWordModel.create(newUserWord);
        return createdNewUserWord;
    }

    static async findByUserId({ userId }) {
        const userWord = await UserWordModel.findOne({ userId }, { __v: 0 }).lean();
        return userWord;
    }

    static async update({ userId, toUpdate }){
        const filter = { userId };
        const option = { 
            returnOriginal: false,
            projection: {
                __v: 0,
            }
        }

        const updatedUserWord = await UserWordModel.findOneAndUpdate(
          filter,
          toUpdate,
          option
        ).lean();
        
        return updatedUserWord;
    }

    static async deleteByUserId({ userId }){
        const deleted = await UserWordModel.deleteOne({ userId });
        return deleted;
    }
}

export { UserWord }