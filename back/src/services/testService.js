import { Test } from "../db";

class testService {
    static async addTest({ num, question, questionType, content, choices, answer }) {
        const test1 = await Test.findByQuestion({ question });
        if(test1){
            const errorMessage = 
              "해당 질문의 테스트가 존재합니다.";
            return { errorMessage };
        }
        
        const test2 = await Test.findByNum({ num });
        if(test2){
            const errorMessage = 
              "해당 번호의 테스트가 존재합니다.";
            return { errorMessage };          
        }


        const newTest = {
          num,
          question,
          questionType,
          content,
          choices: JSON.stringify(choices),
          answer,
        };

        const createdNewTest = await Test.create({ newTest });
        return createdNewTest;
    }

    static async getTotallCount(){
      const counts = await Test.countTotal();
      return counts;
    }

    static async getTest({ num }){
        const test = await Test.findByNum({ num });
        if(!test){
            const errorMessage = 
              "해당 번호의 테스트가 존재하지 않습니다.";
            return { errorMessage };
        }

        return test;
    }

    static async searchTest({ question }){
        let query = undefined;
        if (question) {
          query = {
            question: { $regex: decodeURIComponent(question), $options: "iu" },
          };
        } 

        const tests = await Test.findByQuery(query);
        return tests;
    }

    static async evaluateTest(submission){
        const tests = await Test.findByQuery();

        let score = 0;
        tests.forEach( (v,i) => {
            if(!(v.num === i+1)){
                const errorMessage =
                  "DB내에서 Test 관련 도큐먼트의 num 필드에 문제가 있습니다.(back-error)";
                return { errorMessage };
            }

            if(submission[v.num] == v.answer){
              

              score++;
            }
        })
        const total = await Test.countTotal() - 1;
        const scoreBy100 = Math.round((score / total) * 100 );
        const result = { result: scoreBy100 };
        
        return result;
    }


    static async setTest({ num, toUpdate }){
        const test1 = await Test.findByNum({ num });

        if (!test1) {
            const errorMessage = 
              "해당 번호의 테스트가 존재하지 않습니다.";
            return { errorMessage };
        }

        if(toUpdate?.question){
          const test2 = await Test.findByQuestion({ question: toUpdate.question });
          if(test2) {
            const errorMessage = 
              "해당 질문이 존재합니다.";
            return { errorMessage };
          }
        }

        // 수정해야하는 필드에 맞는 값을 업데이트
        const toUpdateFields = Object.keys(toUpdate);
        toUpdateFields.forEach((key) => {
          if (!toUpdate[key]) delete toUpdate[key];
        });

        if(toUpdate["choices"]){
            toUpdate["choices"] = JSON.stringify(toUpdate["choices"]);
        }

        const updatedTest = await Test.update({ num, toUpdate });
        return updatedTest;
    }

    static async deleteTest({ num }){
        const deleteResult = await Test.delete({ num });
        return deleteResult;
    }
}

export { testService };