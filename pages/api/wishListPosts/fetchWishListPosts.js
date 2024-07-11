import dbConnect from "../../../database/dbConnect";
import Post from "../../../database/models/Post";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    try {
      const posts = await Post.find();
      return response.status(200).json({ posts });
    } catch (error) {
      console.error("Error fetching posts:", error);
      return response
        .status(500)
        .json({ message: "Server error", error: error.message });
    }
  } else {
    return response.status(405).json({ message: "Method not allowed" });
  }
}
