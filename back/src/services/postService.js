import { User, Post, Subject, Like } from '../db'
import { typeName } from "../utils/validation/typeName";
import { isEmptyArray } from "../utils/validation/isEmptyType";
import { commentService } from "./commentService";
import { addPoint, getPoint } from "../utils/levelSystem/Point";

class postService {
  static async addPost({
    author,
    title,
    content,
    tags,
    subjectId,
    userId,
    category,
  }) {
    // subjectId 에 대한 검증(없는 경우 자유 글쓰기 주제이므로 Id 지정)
    if (!subjectId) {
      const subjectDefault = "626f9108187d6e5687442e3b"
      subjectId = subjectDefault;
    }
    const subject = await Subject.findById({ subjectId });
    if (!subject) {
      return { errorMessage: "Error: Invalid subjectId" };
    }

    // userId 에 대한 검증
    const user = await User.findById({ userId });
    if (!user) {
      return { errorMessage: "Error: Invalid userId " };
    }

    const newPost = {
      author,
      title,
      content,
      tags,
      subjectId,
      userId,
      category,
    };

    const createdNewPost = await Post.create({ newPost });
    createdNewPost.errorMessage = null;

    const addPointResult = await addPoint({ subject, user });
    if(addPointResult.errorMessage){
      return { errorMessage: addPointResult.errorMessage };
    }

    return createdNewPost;
  }

  static async getPost({ postId }) {
    const post = await Post.findById({ postId });
    if (!post) return { errorMessage: "해당 글이 존재하지 않습니다." };
    return post;
  }

  static async setPost({ postId, toUpdate }) {
    const post = await Post.findById({ postId });

    if (!post) return { errorMessage: "해당 글이 존재하지 않습니다." };
    if (!toUpdate.imageUrl) {
      const userId = toUpdate.userId;
      let subjectId = toUpdate.subjectId;

      // subjectId 에 대한 검증(없는 경우 자유 글쓰기 주제이므로 Id 지정)
      if (!subjectId) {
        subjectId = "626f9108187d6e5687442e3b";
        toUpdate.subjectId = subjectId;
      }

      const user = await User.findById({ userId });
      const subject = await Subject.findById({ subjectId });

      if (!user) return { errorMessage: "해당 유저가 존재하지 않습니다." };
      if (!subject) return { errorMessage: "해당 주제가 존재하지 않습니다." };

      const toUpdateField = Object.keys(toUpdate);
      toUpdateField.forEach((key) => {
        if (!toUpdate[key]) delete toUpdate[key];
      });
    };
    const updatedPost = await Post.update({ postId, toUpdate });
    updatedPost.errorMessage = null;
    return updatedPost;
  }

  //pagination 지원
  static async getPostsByUserId({ sort, page, limit, userId }) {
    // userId 에 대한 검증
    
    const user = await User.findById({ userId });
    if (!user) {
      return { errorMessage: "Error: Invalid userId " };
    }

    const query = { userId };
    const field = sort?.field ?? null;
    const type = sort?.type ?? null;
    let extraQueryList;

    const populateOption = ["subject", { _id: 0, subject: 1 }];
    extraQueryList = [{ populate: populateOption }];

    if (field !== null && type !== null) {
      const sortOption = new Object();
      sortOption[field] = type;
      extraQueryList.push({ sort: sortOption });
    }

    const posts = await Post.findAll(page, limit, query, extraQueryList);
    
    return posts;
  }

  static async getAllPostsByQuery(page, limit, query) {
    const posts = await Post.findAll(page, limit, query);
    return posts;
  }

  static async getTaggedPosts({sort, page, limit, tags}) {
    const andList = [];
    tags.forEach((tag) => {
      const cond = { tags: { $regex: decodeURI(tag), $options: "iu" } };

      andList.push(cond);
    });

    const query = { $and: andList };

    const field = sort?.field ?? null;
    const type = sort?.type ?? null;
    let extraQueryList;

    const populateOption = ["subject", { _id: 0, subject: 1 }];
    extraQueryList = [{ populate: populateOption }];

    if (field !== null && type !== null) {
      const sortOption = new Object();
      sortOption[field] = type;
      extraQueryList.push({ sort: sortOption });
    }

    const posts = await Post.findAll(page, limit, query, extraQueryList);
    return posts;
  }

  static async getSearchPosts({ category, content, sort, page, limit }) {
    const orList = [];

    const pushRegexQuery = (fieldName, value) => {
      if (!value) return;
      if (typeName(value) === "Array") {
        value.forEach((tag) => {
          let queryObj = new Object();
          queryObj[`${fieldName}`] = { $regex: decodeURI(tag), $options: "iu" };
          orList.push(queryObj);
        });
      } else {
        const queryObj = new Object();
        queryObj[`${fieldName}`] = { $regex: decodeURI(value), $options: "iu" };
        orList.push(queryObj);
      }
    };

    pushRegexQuery("title", content);
    pushRegexQuery("tags", content);
    pushRegexQuery("content", content);
    pushRegexQuery("author", content);

    let query;
    if (isEmptyArray(orList) && !category) {
      query = {};
    } else {
      const andList = [];

      if (category) andList.push({ category: category });
      if (!isEmptyArray(orList)) andList.push({ $or: orList });
      query = { $and: andList };
    }
    
    const field = sort?.field ?? null;
    const type = sort?.type ?? null;
    let extraQueryList;

    const populateOption = ["subject", { _id: 0, subject: 1 }];
    extraQueryList = [({ populate: populateOption })];

    if (field !== null && type !== null) {
      const sortOption = new Object();
      sortOption[field] = type;
      extraQueryList.push({ sort: sortOption });
    }
    
    const posts = await Post.findAll(page, limit, query, extraQueryList);
    return posts;
  }

  static async deletePost({ postId, userId }) {
    const posts = await Post.findByUserId({ userId });
    
    if(!(posts.find(obj => obj._id == postId))){
      return { errorMessage: "자신이 쓴 글만 삭제할 수 있습니다."};
    }

    const deletedComment = await commentService.deleteCommentsByPostId({ postId });
    if(deletedComment.errorMessage){
      return { errorMessage: deletedComment.errorMessage };
    }

    const result = await Post.delete({ postId });

    if (result.deletedCount !== 1) {
      return { errorMessage: "Error: 정상적으로 삭제되지 않았습니다." };
    }

    const updated = await Like.deleteAllByPostId({ postId });

    // .acknowledged : Boolean indicating everything went smoothly. 
    //[출처] : https://mongoosejs.com/docs/api.html#model_Model.updateMany
    if(!updated.acknowledged){
      return { errorMessage: "Error: User의 postLikes필드의 삭제가 제대로 진행되지 않았습니다." };
    }

    return { errorMessage: null };
  }

  static async deletePostsByUserId({ userId }) {
    // userId 에 대한 검증
    const user = await User.findById({ userId });
    if (!user) {
      return { errorMessage: "Error: Invalid userId " };
    }

    const posts = await Post.findByUserId({ userId });

    // 정상적으로 지워졌는지 검증 필요
    const result = await Post.deleteByUserId({ userId });
    if (result.deletedCount === 0) {
      return { errorMessage: "Error: 정상적으로 삭제되지 않았습니다." };
    }

    posts.forEach( async (post) => {
      const postId = post["_id"];
      
      const updated = await Like.deleteAllByPostId({ postId });

      if(!updated.acknowledged){
        return {
          errorMessage:
            "Error: User의 postLikes필드의 삭제가 제대로 진행되지 않았습니다.",
        };
      }
      
      const deletedComment = await commentService.deleteCommentsByPostId({ postId });
      if(deletedComment.errorMessage){
        return { errorMessage: deletedComment.errorMessage };
      }
    });

    return { errorMessage: null };
  }
}


export { postService };