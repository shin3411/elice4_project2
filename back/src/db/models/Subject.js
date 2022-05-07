import { SubjectModel } from '../schemas/subject';


class Subject {
  static async create({ newSubject }) {
    const createdNewSubject = await SubjectModel.create(newSubject);
    return createdNewSubject;
  }

  static async findById({ subjectId }) {
    const subject = await SubjectModel.findOne({ _id: subjectId });
    return subject;
  }

  static async findByThree({ subject, level, category }){
    const oneSubject = await SubjectModel.findOne({ subject, level, category },{ __v: 0 });
    return oneSubject;
  }

  static async findByLevel({ level }) {
    const subjects = await SubjectModel.find({ level });
    return subjects;
  }

  static async findAll() {
    const subjects = await SubjectModel.find({});
    return subjects;
  }

  static async update({ subjectId, toUpdate }) {
    const filter = { _id: subjectId };
    const option = { returnOriginal: false };

    const updatedSubject = await SubjectModel.findOneAndUpdate(
      filter,
      toUpdate,
      option
    );
    return updatedSubject;
  }

  static async delete({ subjectId }) {
    const deletedSubject = await SubjectModel.deleteOne({ _id: subjectId });
    return deletedSubject;
  }
}

export { Subject };