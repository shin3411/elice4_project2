import { Test, Quiz, Subject } from "../db";
import { testService } from "../services/testService";
import { tests } from "./data/test";
import { quizzes } from "./data/quiz";
import { subjects } from "./data/subject";

export default async () => {
    const insertOneTest = async (v) => {
        try {
            const testExist = await Test.findByQuestion({ question: v.question });
            if (testExist) {
              // test가 이미 있다. => 생성하면 안되고 넘어간다.
              return false;
            }
            
            const { num, question, questionType, content, choices, answer } = v;

            await testService.addTest({
              num,
              question,
              questionType,
              content,
              choices,
              answer,
            });
        
            return false

        } catch(error) {
            const question = v.question;
            console.log(question)
            console.error("\x1b[35m%s\x1b[0m", error);
            return true;
        }
    }

    const insertOneQuiz = async (v) => {
      try{
        const word = v.word;
        
        const quizExist = await Quiz.findByWord({ word });
        if (quizExist) {
          // quiz가 이미 있다. => 생성하면 안되고 넘어간다.
          return false;
        }

        const newQuiz = v;
        await Quiz.create({ newQuiz });
        
        return false;
      } catch(error) {
        const word = v.word;
        console.log(word);
        console.error("\x1b[35m%s\x1b[0m", error);
        return true;
      }
    } 
    
    const insertOneSubject = async (v) => {
      try{

        const subjectExist = await Subject.findByThree({ subject: v.subject, level: v.level, category: v.category });
        if(subjectExist) {
          // quiz가 이미 있다 => 생성하면 안되고 넘어간다.
          return false;
        }

        await Subject.create({ newSubject: v });
        
        return false;
      } catch(error) {
        console.log(v.subject, v.level, v.category);
        console.error("\x1b[35m%s\x1b[0m", error);
        return true;
      }
    }

    // 반복문 돌면서 객체 하나씩 DB에 있는지 확인하고, 없으면 저장
    let isError = false;
    for (let v of tests) {
      isError = await insertOneTest(v);
      if (isError) break;
    }

    for (let v of quizzes) {
      isError = await insertOneQuiz(v);
      if (isError) break;
    }

    for(let v of subjects) {
      isError = await insertOneSubject(v);
      if (isError) break;
    }

    return isError;
}