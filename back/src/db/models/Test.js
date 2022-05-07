import { TestModel } from '../schemas/test';


class Test {
  static async create({ newTest }) {
    const createdNewTest = await TestModel.create(newTest);
    delete createdNewTest._doc["__v"];
    //string화 되어있는 choices필드를 json화

    createdNewTest._doc["choices"] = JSON.parse(createdNewTest._doc["choices"]);
    return createdNewTest;
  }

  static async findByNum({ num }) {
    const test = await TestModel.findOne({ num }, { __v: 0 });
    //string화 되어있는 choices필드를 json화
    if (test?._doc["choices"]) {
      test._doc["choices"] = JSON.parse(test._doc["choices"]);
    }
    return test;
  }

  static async findByQuestion({ question }) {
    const test = await TestModel.findOne(
      { question },
      { content: 0, choices: 0, __v: 0 }
    );
    //string화 되어있는 choices필드를 json화

    if (test?._doc["choices"]) {
      test._doc["choices"] = JSON.parse(test._doc["choices"]);
    }
    return test;
  }

  static async findByQuery(query) {
    //query가 undefined면 TestModel.find(query)는 TestModel.find() 와 동일
    const tests = await TestModel.find(query, { __v: 0 }).sort({ num: 1 });

    //string화 되어있는 choices필드를 json화
    const modifiedTests = tests.map((test) => {
      if (test?._doc["choices"]) {
        test._doc["choices"] = JSON.parse(test._doc["choices"]);
      }
      return test;
    });
    return modifiedTests;
  }

  static async countTotal() {
    const counts = await TestModel.estimatedDocumentCount();
    return counts;
  }

  static async update({ num, toUpdate }) {
    const filter = { num };
    const option = { returnOriginal: false };

    const updatedTest = await TestModel.findOneAndUpdate(
      filter,
      toUpdate,
      option
    );

    //string화 되어있는 choices필드를 json화
    if (updatedTest?._doc["choices"]) {
      updatedTest._doc["choices"] = JSON.parse(updatedTest._doc["choices"]);
    }
    delete updatedTest._doc["__v"];

    return updatedTest;
  }

  static async delete({ num }) {
    const deletedTest = await TestModel.deleteOne({ num });
    return deletedTest;
  }
}

export { Test };