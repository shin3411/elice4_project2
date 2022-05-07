import { Router } from 'express';
import { subjectService } from '../services/subjectService';

const subjectRouter = Router();

// create
subjectRouter.post('/subjects', async (req, res, next) => {
  try {
    const subject = req.body.subject ?? null;
    const level = req.body.level ?? null;
    const category = req.body.category ?? null;
    const point = req.body.point ?? null;

    const newSubject = await subjectService.addSubject({
      subject,
      level,
      category,
      point
    })

    if (newSubject.errorMessage) throw new Error(newSubject.errorMessage);
    delete newSubject['errorMessage'];
    res.status(201).json(newSubject);
  } catch (err) {
    next(err);
  }
});

// read
// 1. subjectId 를 통해 해당 주제 조회
subjectRouter.get('/subjects/:subjectId', async (req, res, next) => {
  try {
    const { subjectId } = req.params;
    const subject = await subjectService.getSubject({ subjectId });

    if (subject.errorMessage) throw new Error(subject.errorMessage);

    delete subject['errorMessage'];
    res.status(200).json(subject);
  } catch (err) {
    next(err);
  }
});

// 2. level을 통해 해당 레벨에 해당하는 주제들 조회
subjectRouter.get('/subjects', async (req, res, next) => {
  try {
    const { level } = req.query;
    // level의 유효성 검사 필요
    const subjects = await subjectService.getSubjectsByLevel({ level });

    res.status(200).json(subjects);
  } catch (err) {
    next(err);
  }
});

// update
subjectRouter.put('/subjects/:subjectId', async (req, res, next) => {
  try {
    const { subjectId } = req.params;

    const subject = req.body.subject ?? null;
    const category = req.body.category ?? null;
    const level = req.body.level ?? null;
    const point = req.body.point ?? null;

    const toUpdate = {
      subject,
      category,
      level,
      point,
    }

    const updatedSubject = await subjectService.setSubject({ subjectId, toUpdate });
    if (updatedSubject.errorMessage) throw new Error(updatedSubject.errorMessage);

    res.status(200).json(updatedSubject);
  } catch (err) {
    next(err);
  }
});

// delete
subjectRouter.delete('/subjects/:subjectId', async (req, res, next) => {
  try {
    const { subjectId } = req.params;

    const result = await subjectService.deleteSubject({ subjectId });

    if (result.errorMessage) throw new Error(result.errorMessage);

    res.status(200).json({ message: "success" });
  } catch (err) {
    next(err);
  }
});

export { subjectRouter };