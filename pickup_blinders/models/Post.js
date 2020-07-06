const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  content: String,
  score: Number,
  userid: {
    type: Schema.Types.ObjectId, ref: "User"
  },
  comments: Array,
  // date: Date,
  category: String
},
  {
    timestamps: {
      createdAt: 'created_at'
    }
  });

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
