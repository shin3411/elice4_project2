import { User, Post, Like } from "../db";

class likeService {

  // 좋아요 추가
  static async addLike({ userId, postId }) {
    const user = await User.findById({ userId });

    if (!user) {
      return { errorMessage: "존재하지 않는 유저입니다." };
    }
    
    const post = await Post.findById({ postId });
    if (!post) {
      return { errorMessage: "존재하지 않는 게시글입니다." };
    }

    // 1. mongodb 옵션 없이 배열 자체 수정해서 업데이트
    // const likes = user.postLikes ?? [];
    // if (likes.includes(postId)) {
    //   return { errorMessage: "좋아요는 한 번만 가능합니다." };
    // }

    // likes.push(postId)
    // const toUpdate = { postLikes: likes }; 
    // const addNewLike = await User.update({ userId, toUpdate });
    
    /**
     * 2. like 중복 확인 후 업데이트 (다시 눌렀을때 에러를 전달하기 위해)
     * 만약 중복 확인 오류는 필요 없고 같은 것을 추가해도 중복만 안되게 한다면
     * addNewLike부터만 사용해도 됨
     * */ 
    const like = await Like.findByUserIdAndPostId({ userId, postId });
    if (like) {
      return { errorMessage: "좋아요는 한 번만 가능합니다." };
    }
    
    const toUpdate = { likeCount: post.likeCount + 1 }

    const [ newLike, updatedPost ] = await Promise.all(
      [
        Like.create({ userId, postId }),
        Post.update({ postId, toUpdate })
      ]);

    newLike.errorMessage = null;
    return newLike;
  }
  
  // 좋아요 삭제
  static async deleteLike({ userId, postId }) {
    const user = await User.findById({ userId });
    if (!user) {
      return { errorMessage: "존재하지 않는 유저입니다." };
    }
    
    const post = await Post.findById({ postId });
    if (!post) {
      return { errorMessage: "존재하지 않는 게시글입니다." };
    }

    // 1. 자체적인 처리 후 업데이트(배열 순회해서 해당 id 지우고 업데이트)
    // const likes = user.postLikes ?? [];
    // const newLikes = likes.reduce((arr, like) => {
    //   if (like == postId) return arr;
    //   arr.push(like);
    //   return arr;
    // }, []);

    // console.log("newLikes: ", newLikes);
    // console.log("likes: ", likes);
    // if (likes.length === newLikes.length) {
    //   return { errorMessage: "좋아요를 누르지 않은 게시글입니다." };
    // }
    
    // const toUpdate = { postLikes: newLikes };
    // const deletedLikes = await User.update({ userId, toUpdate });
    
    
    // 2. mongodb 옵션 사용
    const like = await Like.findByUserIdAndPostId({ userId, postId });
    if (!like) {
      return { errorMessage: "좋아요한 게시글만 취소 가능합니다." };
    }
    
    const toUpdate = { likeCount: post.likeCount - 1 }
    const [ deletedLike, updatedPost ] = await Promise.all([
      Like.delete({ userId, postId }),
      Post.update({ postId, toUpdate })
    ]); 
    
    deletedLike.errorMessage = null;
    return deletedLike;
  }

  // 글 삭제시 해당 글을 좋아하는 user의 postLikes에서 postId 삭제
  static async deleteLikesByPostId({ postId }) {
    await Like.deleteAllByPostId({ postId });
    return;
  }

  // 해당 글에 좋아요 한 user 반환
  static async getPostLikes({ postId }) {
    const post = await Post.findById({ postId });
    if(!post) {
        return { errorMessage: "해당 글이 존재하지 않습니다." };
    }
    
    const likedUsers = await Post.getLikedUsers({ postId });
    
    return likedUsers;
  }

  // 해당 유저의 좋아하는 글 목록 반환
  static async getLikedPostsByUserId({ userId, page, limit }) {
    const user = await User.findById({ userId });
    if (!user) {
      return { errorMessage: "User not Found" };
    }

    const postIds = user.postLikes;
    const query = { _id: { $in: postIds }};
    
    
    const posts = await Post.findAll(page, limit, query);
    posts.errorMessage = null;
    return posts;
  }

  static async deleteLikeCountByPostIds({ postIds }) {
    try {
      const result = await Like.decreaseLikeCountByPostIds({ postIds });

      return { errorMessage: null };
    } catch (err) {
      return { errorMessage: err.message };
    } 
  }
}

export { likeService };
