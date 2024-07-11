import dbConnect from "../../../database/dbConnect";
import Post from "../../../database/models/Post";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    try {
      if (req.body.action === "createPost") {
        const { name, email, post } = req.body;
        const newPost = await Post.create({
          name,
          email,
          post,
        });
        return res.status(201).json({ message: "Post created", post: newPost });
      }

      if (req.body.action === "updateLikes") {
        const { id } = req.body;
        const post = await Post.findById(id);

        if (!post) {
          return res.status(404).json({ message: "Post not found" });
        }

        post.likes = (post.likes || 0) + 1;

        await post.save();

        return res
          .status(200)
          .json({ message: "Likes updated", likes: post.likes });
      }

      return res.status(400).json({ message: "Invalid action" });
    } catch (error) {
      return res.status(500).json({ message: "An error occurred" });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
