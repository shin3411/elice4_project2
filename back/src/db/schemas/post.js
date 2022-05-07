import { Schema, model } from "mongoose";

const PostSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    tags: [{ type: String, required: false }],
    subjectId: { type: Schema.Types.ObjectId, required: true, ref: "Subject" },
    author: { type: String, required: true},
    userId: { type: Schema.Types.ObjectId, required: true, ref: "User"},
    likeCount: { type: Number, required: false, default: 0 },
    imageUrl: { type: String, required: false, default: "https://team2.cdn.ntruss.com/posts/default.png" },
    category: { 
      type: String, 
      required: false, 
      default: "etc", 
      enum: {
        values: ['소설', '시', '산문', "etc"],
        message: '{VALUE} is not supported'
      }
    }
  },
  {
    timestamps: true,
    selectPopulatedPaths: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

PostSchema.virtual('user', {
  ref: 'User',
  localField: 'userId',
  foreignField: '_id',
  justOne: true,
});

PostSchema.virtual('subject', {
  ref: 'Subject',
  localField: 'subjectId',
  foreignField: '_id',
  justOne: true,
});


// 참고: .populate("virtual 속성값") 의 결과는 디폴트로 array
// PostModel.findOne({ _id: "5b8fd9eef72e14315b52985f"}).populate("userLikes") 한 결과 예시
// [
//   { _id: _id값(예: 5b8fd9eef72e14315b52985f),
//     title: ~,
//     tages: ~,
//     ... ,
//     userLikes: [ userId1값(예 : 6262e83919e6e1394bca128b), userId2값, userId3값 ... ],
//     ...
//   }
// ]
PostSchema.virtual("userLikes", {
  ref: "User",
  localField: "_id",
  foreignField: "postLikes"
});

const PostModel = model("Post", PostSchema);

export { PostModel };
