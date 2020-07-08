const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  content: String,
  score: Number,
  userid: {
    type: Schema.Types.ObjectId, ref: "User"
  },
  postid: {
    type: Schema.Types.ObjectId, ref: "Post"
  },

  //comments: Array,

},
  {
    timestamps: {
      createdAt: 'created_at'
    }
  });

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
