import { Subject } from '../db';

class subjectService {
  static async addSubject({ subject, level, category, point }) {
    const newSubject = {
      subject,
      level,
      category,
      point
    }

    const createdNewSubject = await Subject.create({ newSubject });
    return createdNewSubject;
  }

  static async getSubject({ subjectId }) {
    const subject = await Subject.findById({ subjectId });
    if (!subject) return { errorMessage: "Error: 해당 주제가 없습니다."};

    subject.errorMessage = null;
    return subject;
  }

  static async getSubjectsByLevel({ level }) {
    const subjects = await Subject.findByLevel({ level });
    
    return subjects;
  }

  static async setSubject({ subjectId, toUpdate }) {
    const subject = await Subject.findById({ subjectId });
    if (!subject) return { errorMessage: "Error: 해당 주제가 없습니다."};

    const toUpdateField = Object.keys(toUpdate);
    toUpdateField.forEach((key) => {
      if (!toUpdate[key]) delete toUpdate[key];
    });

    const updatedSubject = await Subject.update({ subjectId, toUpdate });
    updatedSubject.errorMessage = null;
    return updatedSubject;

  }

  static async deleteSubject({ subjectId }) {
    const result = await Subject.delete({ subjectId });

    if (result.deletedCount !== 1) return { errorMessage: "Error: 정상적으로 삭제되지 않았습니다." };

    return { errorMessage: null };
  }
}


export { subjectService };

