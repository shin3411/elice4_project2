import { typeName } from "./validation/typeName";

const addMatchedQuery = (baseQuery, queryPrototype, queryArg) => {
  
  switch(queryPrototype){
    case "sort":
      return baseQuery.sort(queryArg);

    case "lean":
      if(queryArg !== undefined){
        return baseQuery.lean(queryArg);
      }
      return baseQuery.lean();

    case "populate":
      if(typeName(queryArg) === "String" || typeName(queryArg) === "Object"){
        return baseQuery.populate(queryArg);
      } else if(typeName(queryArg) === "Array"){
        return baseQuery.populate(queryArg[0], queryArg[1]);
      }

    case "select":
      return baseQuery.select(queryArg);
  }
}
// model 과 { query, page, limit } 으로 페이지네이션

async function findByPagination2(model, options = {}, query = {}, extraQueryList = [{ sort: { createdAt: -1 } },]) {
  
  const page = options?.page ?? null;
  const limit = options?.limit ?? null;

  
  let posts = null,
    isLast = null,
    totalnum = null;

  const baseQuery = model
    .find(query)
    .lean()
    .select("-__v")
    

  // extraQueryList 예시
  // const extraQuery = [
  //     {lean: undefined},
  //     {populate: ["userId", { _id: 0, email: 1, level: 1, point: 1 }]}
  //     {sort: { title: 1 }}
  // ];

  //extraQueryList 요소로 { sort: ~ } 가 있는지 확인하고, 없으면 디폴트 지정
  let isSortExist = false;
  for(let i=0; i<extraQueryList.length; i++){
    const q = extraQueryList[i];
    if(Object.keys(q)[0] == 'sort'){
      isSortExist = true;
      break;
    }
  }

  // 이미 다른 쿼리들({select: "nickname -__v"} 등)로 채워진 extraQueryList
  // 그러나 { sort: ~ } 쿼리가 없다.
  if(!isSortExist){ 
    extraQueryList.push({ sort: { createdAt: -1 } });
  }
  
  const totalQuery = extraQueryList.reduce((acc, cur) => {
    // cur이 {sort: { userId.level: 1 }} 이면 => Object.keys(cur)[0] 은 'sort'
    return addMatchedQuery(acc, Object.keys(cur)[0], Object.values(cur)[0]);
  }, baseQuery);

  if (page && limit) {
    [posts, totalnum] = await Promise.all([
      totalQuery.skip((page - 1) * limit).limit(limit),
      model.find(query).lean().countDocuments(),
    ]);

    if (totalnum <= page * limit) {
      isLast = true;
    } else {
      isLast = false;
    }
  } else {
    posts = await totalQuery;
    isLast = true;
  }

  return {
    isLast,
    posts,
  };
}

// 결과 예시
// {
//   isLast: true,
//   posts: [
//     {
//       _id: new ObjectId("626c1f46c5537963f7a9c534"),
//       title: '속담공부📚',
//       content: '가는 말이 고와야 오는 말도 곱다',
//       tags: [Array],
//       subjectId: new ObjectId("6266d188932900c85ece9510"),
//       author: 'elice modified',
//       userId: new ObjectId("6262e83919e6e1394bca128b"),
//       imageUrls: [],
//       category: '소설',
//       createdAt: 2022-04-29T17:24:22.632Z,
//       updatedAt: 2022-04-29T17:24:22.632Z,
//       __v: 0,
//       subject: [Object]
//     }
//   ]
// }

export { findByPagination2 };

// ※ lean() 이란?
// lean 쿼리를 이용하면 쿼리 객체가 리턴되는 것이 아니라 순수 JSON object가 반환
// lean()을 쓰면 mongodb, mongoose에서 지원해주는 것들의 일부 사용 불가(아래) => 그러나, populate 랑 virtual populate 모두 가능!
// Change tracking
// Casting and validation
// Getters and setters
// Virtuals (including "id")
// save() function
// 출처 : https://velog.io/@moongq/MongoDBMongoose-%ED%8D%BC%ED%8F%AC%EB%A8%BC%EC%8A%A4-%ED%96%A5%EC%83%81%EC%8B%9C%ED%82%A4%EA%B8%B0



