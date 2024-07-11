import mongoose, { Schema, models } from "mongoose";

const PostSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    post: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    isDone: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Post = models.Post || mongoose.model("Post", PostSchema);

export default Post;
